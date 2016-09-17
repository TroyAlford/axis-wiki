import { includes, keys, sortBy, uniq, values } from 'lodash'

import $           from 'cheerio'
import express     from 'express'
import path        from 'path'
import utils       from 'fs-utils'

import grep        from '../helpers/grep'
import Config      from '../services/Config'
import Links       from '../services/Links'

const { folders } = Config

export default express()
.get('/:search_term', async (request, response) => {
  let search_term = encode(request.params.search_term).toLowerCase();

  const resultSets = [
    ...getTitleMatches(search_term),
    ...await getContentMatches(search_term),
  ]

  let indexed = {}
  resultSets.forEach(result => {
    const current = indexed[result.file] || {}
    indexed[result.file] = {
      ...current, ...result,
      aliases: uniq([...(current.aliases || []), result.alias]),
      type: uniq([...(current.type || []), result.type]),
    }
  })

  const results = values(indexed)
  .filter(result => !!result)
  .map(entry => {
    const $html = $(utils.readFileSync(entry.file))
    const link = Links.get(entry.slug)

    return {
      file:    entry.slug,
      image:   $html.find('img').first().attr('src'),
      aliases: entry.aliases.filter(alias => !!alias),
      results: entry.results,
      title:   link.title,
      type:    entry.type
    }
  })

  const sorted = sortBy(results, result => {
    let order = ''
    if (result.title.toLowerCase() === search_term
      || includes(result.aliases, search_term))
      order = 0
    else if (includes(result.type, 'article:title'))
      order = 1
    else
      order = 2

    return `${order}-${result.title}`
  })
  response.status(200).send(JSON.stringify(sorted))
})

function getTitleMatches(search_term) {
  const pattern = new RegExp(search_term, 'gi')
  return keys(Links.links)
    .filter(slug => {
      const title = Links.get(slug).title || ''
      return slug.match(pattern) // Slug directly matches
          || title.match(pattern)
    })
    .map(matched_slug => {
      const slug = Links.resolve(matched_slug)
      return {
        slug,
        alias: matched_slug,
        file: path.join(folders.articles, `${slug}.html`),
        type: 'article:title',
      }
    })
  ;
}

async function getContentMatches(search_term) {
  return grep(search_term, folders.articles, { ext: 'html' })
    .then(list =>
      list.map(hit => {
        const filename = hit.file.split('/').pop(),
              slug = filename.split('.').reverse().pop()

        return {
          slug,
          file: hit.file,
          results: hit.results.map(result => {
            const text = $(result.text).text();
            if (!text.match(new RegExp(search_term, 'gi')))
              return null;

            return { ...result, text }
          }).filter(result => !!result), // Only truthy results
          type: 'article:content',
        }
      }).filter(hit => hit.results.length)
    )
  ;
}

const html_codes = {
  '&': '&amp;',
  "'": '&apos;',
  '"': '&quot;',
  '<': '&lt;',
  '>': '&gt;'
}
function encode(input) {
  let output = input

  Object.keys(html_codes).forEach(key => {
    const regex = new RegExp(`[${key}]`, 'g')
    output = output.replace(regex, html_codes[key])
  })

  return output
}
