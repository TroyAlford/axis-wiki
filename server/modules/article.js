import { intersection, pick } from 'lodash'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'

import Article from '../services/Article'
import * as Storage from '../services/Storage'
import Links from '../services/Links'
import { slugify } from '../../utility/Slugs'
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

  const article = Storage.getArticle(slug).rendered
  const { html, meta } = article
  const children = Tags.for(slug)
  const sheet = Storage.getSheet(slug)

  return response.status(200).send({ ...meta, html, children, sheet })
})
.post('/:slug', (request, response) => {
  if (!request.session.id) {
    return response.status(401).send('You must be logged in to edit articles.')
  } else if (intersection(request.session.privileges, ['admin', 'edit']).length === 0) {
    return response.status(401).send('You do not have sufficient privileges to edit articles.')
  }

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
.delete('/:slug', (request, response) => {
  if (!request.session.id) {
    return response.status(401).send('You must be logged in to delete articles.')
  } else if (intersection(request.session.privileges, ['admin', 'edit']).length === 0) {
    return response.status(401).send('You do not have sufficient privileges to delete articles.')
  }

  const slug = request.params.slug // Do NOT normalize. DELETE must be exact.
  if (!Storage.deleteArticle(slug)) {
    return response.status(500).send(`Article ${slug} could not be deleted.`)
  }

  return response.status(410).send(`Article ${slug} has been removed.`)
})
