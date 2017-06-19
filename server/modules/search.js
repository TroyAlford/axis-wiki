import express from 'express'
import $ from 'cheerio'
import { startCase } from 'lodash'
import { flow } from '../../utility/flow'
import { slugify } from '../../utility/Slugs'
import Article from '../db/schema/Article'

function lemmatize(array) {
  // Placeholder for later
  return array
}

function reverseString(string) {
  return string.split('').reverse().join('')
}

function extractMatch(text, match) {
  const { 0: matchText, index } = match
  const length = matchText.length

  return flow([
    t => t.slice(index - 25, index + length + 25),
    t => t.slice(t.search(/(\w|\s)/)),
    reverseString,
    t => t.slice(t.search(/(\w|\s)/)),
    reverseString,
    t => t.replace(matchText, `<span class="highlight">${matchText}</span>`),
    t => `...${t}...`,
  ], text)
}

/* eslint-disable no-console */
export default express()
.get('/:searchTerm', async (request, response) => {
  const { searchTerm, skip: SKIP = 0, limit: LIMIT = 10 } = request.params

  const terms = lemmatize(searchTerm.split(/\s/).filter(Boolean))
  console.log(` ~> Searching for: ${searchTerm} [${terms.length} variant(s)]`)

  const slugs = slugify(terms)
  const regexes = terms.map(term => new RegExp(`\\b${term}\\b`, 'ig'))

  const query = {
    $or: [
      ...regexes.map(re => ({ title: { $regex: re } })),
      { slug: { $in: slugs } },
      { aliases: { $in: slugs } },
      { tags: { $in: slugs } },
      ...regexes.map(re => ({ html: { $regex: re } })),
    ],
  }
  return Article.find(query).then((articles) => {
    console.log(` ~~> ${articles.length} match(es) found`)

    return Promise.all(articles.map(article =>
      new Promise((resolve) => {
        // eslint-disable-next-line no-param-reassign
        if (!article.title) article.title = startCase(article.slug)

        const match = {
          byTitle: Boolean(regexes.map(re => re.test(article.title)).filter(Boolean).length),
          bySlug:  slugs.includes(article.slug),
          byAlias: Boolean(slugs.filter(slug => article.aliases.includes(slug)).length),
          byTag:   Boolean(slugs.filter(slug => article.tags.includes(slug)).length),
          byText:  regexes.map((re) => {
            const found = article.html.match(re)
            return found ? found.length : 0
          }).reduce((sum, m) => sum + m, 0),
        }

        const sortKey = [
          !(match.byTitle || match.bySlug || match.byAlias),
          match.byText,
          !match.byTag,
        ]
        console.log(article.slug, sortKey)

        resolve({ article, match, sortKey })
      })
    ))
  })
  .then(all => all.sort((a, b) => {
    if (a.sortKey < b.sortKey) return -1
    if (a.sortKey > b.sortKey) return 1
    return 0
  }))
  .then(all => all.slice(SKIP, LIMIT))
  .then(all => all.map(({ article }) => {
    const text = $(article.html).text()
    const hits = []
    regexes.forEach((re) => {
      let match = re.exec(text)

      while (match) {
        hits.push({ text: extractMatch(text, match) })
        match = re.exec(text)
      }
    })
    return { article, hits }
  }))
  .then(all => all.map(({ article, hits }) => ({
    file:    article.slug,
    image:   $(article.html).find('img').first().attr('src'),
    aliases: article.aliases,
    results: hits,
    title:   article.title,
  })))
  .then((results) => {
    response.status(200).send(JSON.stringify(results))
  })
  .catch(console.error)
})
