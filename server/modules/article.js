import { intersection, pick } from 'lodash'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'

import Article from '../services/Article'
import * as Storage from '../services/Storage'
import Links from '../services/Links'
import { slugify } from '../../utility/Slugs'
import Privileges from '../middleware/Privileges'
import Tags from '../services/Tags'

export default express()
  .use(bodyParser.json()) // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded
  .use(cookieParser())
.get('/:slug', (request, response) => {
  const slug = Links.resolve(slugify(request.params.slug))

  if (request.params.slug !== slug) { // Redirect to normalized slug link
    return response.redirect(slug)
  }

  const { html, meta } = Storage.getArticle(slug).rendered
  const children = Tags.for(slug)
  const sheet = Storage.getSheet(slug)

  return response.status(200).send({ ...meta, html, children, sheet })
})
.post('/:slug', Privileges(['edit']), (request, response) => {
  const slug = slugify(request.params.slug)

  const { html, title, aliases, data, tags, sheet } = request.body
  const article = new Article(slug, html, { title, aliases, data, tags })

  if (!Storage.saveArticle(slug, article)) {
    return response.status(500).send('Unable to save article.')
  }

  if (sheet && !Storage.saveSheet(slug, sheet)) {
    return response.status(500).send('Unable to save sheet.')
  } else if (sheet === false && !Storage.deleteSheet(slug)) {
    return response.status(500).send('Unable to remove sheet.')
  }

  return response.status(200).send({
    ...pick(article.rendered, ['html', 'title', 'aliases', 'data', 'tags']),
    sheet,
  })
})
.delete('/:slug', Privileges(['edit']), (request, response) => {
  const slug = request.params.slug // Do NOT normalize. DELETE must be exact.
  if (!Storage.deleteArticle(slug)) {
    return response.status(500).send(`Article ${slug} could not be deleted.`)
  }

  return response.status(410).send(`Article ${slug} has been removed.`)
})
