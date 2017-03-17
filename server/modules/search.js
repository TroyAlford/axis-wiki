import { includes, keys, sortBy, uniq, values } from 'lodash'

import $ from 'cheerio'
import express from 'express'
import path from 'path'
import utils from 'fs-utils'

import { folders } from '../../config/server'
import grep from '../helpers/grep'
import Links from '../services/Links'

function getTitleMatches(searchTerm) {
  const pattern = new RegExp(searchTerm, 'gi')
  return keys(Links.links)
  .filter((slug) => {
    const title = Links.get(slug).title || ''
    return slug.match(pattern) // Slug directly matches
        || title.match(pattern)
  })
  .map((matchedSlug) => {
    const slug = Links.resolve(matchedSlug)
    return {
      slug,
      alias: matchedSlug,
      file:  path.join(folders.articles, `${slug}.html`),
      type:  'article:title',
    }
  })
}

async function getContentMatches(searchTerm) {
  return grep(searchTerm, folders.articles, { ext: 'html' })
  .then(list =>
    list.map((hit) => {
      const filename = hit.file.split('/').pop()
      const slug = filename.split('.').reverse().pop()

      return {
        slug,
        file:    hit.file,
        results: hit.results.map((result) => {
          const text = $(result.text).text()
          if (!text.match(new RegExp(searchTerm, 'gi'))) {
            return null
          }

          return { ...result, text }
        }).filter(result => !!result), // Only truthy results
        type: 'article:content',
      }
    }).filter(hit => hit.results.length)
  )
}

const HTML_CODES = {
  '&': '&amp;',
  "'": '&apos;',
  '"': '&quot;',
  '<': '&lt;',
  '>': '&gt;',
}
function encode(input) {
  let output = input

  Object.keys(HTML_CODES).forEach((key) => {
    const regex = new RegExp(`[${key}]`, 'g')
    output = output.replace(regex, HTML_CODES[key])
  })

  return output
}

export default express()
.get('/:searchTerm', async (request, response) => {
  const searchTerm = encode(request.params.searchTerm).toLowerCase()

  const resultSets = [
    ...getTitleMatches(searchTerm),
    ...await getContentMatches(searchTerm),
  ]

  const indexed = {}
  resultSets.forEach((result) => {
    const current = indexed[result.file] || {}
    indexed[result.file] = {
      ...current,
      ...result,
      aliases: uniq([...(current.aliases || []), result.alias]),
      type:    uniq([...(current.type || []), result.type]),
    }
  })

  const results = values(indexed)
  .filter(result => !!result)
  .map((entry) => {
    const $html = $(utils.readFileSync(entry.file))
    const link = Links.get(entry.slug)

    return {
      file:    entry.slug,
      image:   $html.find('img').first().attr('src'),
      aliases: entry.aliases.filter(alias => !!alias),
      results: entry.results,
      title:   link.title,
      type:    entry.type,
    }
  })

  const sorted = sortBy(results, (result) => {
    let order = ''
    if (result.title.toLowerCase() === searchTerm
      || includes(result.aliases, searchTerm)) {
      order = 0
    } else if (includes(result.type, 'article:title')) {
      order = 1
    } else {
      order = 2
    }

    return `${order}-${result.title}`
  })
  response.status(200).send(JSON.stringify(sorted))
})
