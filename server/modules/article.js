import _                    from 'lodash'
import { html as beautify } from 'js-beautify'
import bodyParser           from 'body-parser'
import cheerio              from 'cheerio'
import cookieParser         from 'cookie-parser'
import express              from 'express'
import fs                   from 'fs'
import path                 from 'path'
import URL                  from 'url'
import utils                from 'fs-utils'

import Article              from '../services/Article'
import Links                from '../services/Links'
import Slug                 from '../services/Slug'

var article = module.exports = express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded
  .use(cookieParser())
  .get('/:slug', (request, response) => {
    var slug = Links.resolve(Slug.normalize(request.params.slug));

    if (request.params.slug != slug) // Redirect to normalized slug link
      return response.redirect(slug);

    return response.status(200).send(Article.get_final(slug));
  })
  .post('/:slug', (request, response) => {
    if (!request.session.user_id)
      return response.status(401).send('You must be logged in to edit articles.')
    else if (_.intersection(request.session.privileges, ['admin', 'edit']).length == 0)
      return response.status(401).send('You do not have sufficient privileges to edit articles.')

    let slug    = Slug.normalize(request.params.slug),
        posted  = request.body,
        saved   = Article.save(slug, posted);

    if (!saved)
      return response.status(500).send('Unable to save article.');

    response.status(200).send(Article.get_final(slug));
  })
  .delete('/:slug', (request, response) => {
    let slug = request.params.slug; // Do NOT normalize. DELETE must be exact.
    if (Article.delete(slug))
      return response.status(410).send(`Article ${slug} has been removed.`);
    else
      return response.status(500).send(`Article ${slug} could not be deleted.`);
  })
  // .post('/rename/:from/to/:to', (request, response) => {

  // })
;
