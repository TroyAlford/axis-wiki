import { intersection, pick } from 'lodash'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import NoAnonymous from '../middleware/NoAnonymous'
import { slugify } from '../../utility/Slugs'
import unique from '../../utility/unique'

import Article from '../db/schema/Article'
import User from '../db/schema/User'

/* {
  slug: 'main-slug',
  title: 'Article Title',
  html: '<h1>The HTML of the article!</h1>',
  aliases: ['alternative-title', 'redirected-from'],
  tags: ['categories', 'this', 'article', 'falls', 'within']
  data: {
    probably: ['a', 'complex', 'data', 'structure', 'here'],
    with: { a: 'number', of: 'different', layers: ['of', 'complexity'] }
  },
} */

function articleForUser(id, slug) {
  return Promise.all([
    User.findOne({ _id: id }),
    Article.findOne({ $or: [{ slug }, { aliases: slug }] }),
  ])
  .then(([user, article]) => {
    const canEdit = (!article || user) && Boolean(
      intersection(user.privileges, ['admin', 'edit']).length ||
      intersection(user.articles, [article.slug, ...article.aliases]).length ||
      intersection(user.tags, article.tags).length
    )
    const privileges = unique([...user.privileges, canEdit ? 'edit' : ''].filter(Boolean))
    const isFavorite = intersection(user.favorites, [article.slug, ...article.aliases]).length
    return [article, privileges, Boolean(isFavorite)]
  })
}
function renderForUser([article, privileges, isFavorite]) {
  return Article.render(article.slug).then(rendered =>
    Object.assign(rendered, { privileges, isFavorite })
  )
}

export default express()
  .use(bodyParser.json()) // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded
  .use(cookieParser())
.get('/:slug', (request, response) => {
  articleForUser(request.session.id, slugify(request.params.slug))
    .then(renderForUser)
    .then(article => response.status(200).send(article))
    .catch(error => response.status(500).send(error))
})
.post('/:slug', NoAnonymous, (request, response) => {
  articleForUser(request.session.id, slugify(request.params.slug))
  .then(([article, privileges, isFavorite]) => {
    const { aliases, data, html, tags, title } = request.body
    Object.assign(article, { aliases, data, html, tags, title })

    article.save()
      .then(updated => renderForUser([updated, privileges, isFavorite]))
      .then(updated => response.status(200).send(updated))
      .catch(() => response.status(500).send('Unable to save and reload article.'))
  })
})
.delete('/:slug', NoAnonymous, (request, response) => {
  const slug = request.params.slug
  articleForUser(request.session.id, slug)
  .then(([article, privileges]) => {
    if (article.slug !== slug) {
      return response.status(401).send(`${slug} redirects to ${article.slug}.`)
    }

    if (intersection(privileges, ['admin', 'edit']).length === 0) {
      return response.status(401).send(`You do not have permission to edit ${slug}`)
    }

    Article.deleteOne({ slug }).then(() =>
      response.status(410).send(`Article ${slug} has been deleted.`)
    )
  })
})
