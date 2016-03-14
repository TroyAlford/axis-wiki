import _                    from 'lodash'
import { html as beautify } from 'js-beautify'
import bodyParser           from 'body-parser'
import cheerio              from 'cheerio'
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
  .get('/:slug', function(request, response) {
    var slug = Links.resolve(Slug.normalize(request.params.slug));

    if (request.params.slug != slug) // Redirect to normalized slug link
      return response.redirect(slug);

    return response.status(200).send(Article.get_final(slug));
  })
  .post('/:slug', function(request, response) {
    let slug    = Slug.normalize(request.params.slug),
        posted  = request.body,
        saved   = Article.save(slug, posted);

    if (!saved)
      return response.status(500).send('Unable to save article.');

    response.status(200).send(Article.get_final(slug));
  })
;
