import _              from 'lodash'
import bodyParser     from 'body-parser'
import cheerio        from 'cheerio'
import express        from 'express'
import fs             from 'fs'
import path           from 'path'
import URL            from 'url'
import utils          from 'fs-utils'

import Article        from './article'
import Links          from './links'
import Tags           from './tags'

var search = module.exports = express();
search.use(bodyParser.json()); // Parses application/json
search.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

search.get('/tagged/:tag', function(request, response) {
  var tag  = _.trim(_.toLower(request.params.tag || '')),
      link = Links.get(tag),
      json = {
        html: link.exists ? Article.html(tag, URL.parse(request_url(request))) : '',
        links: Tags.articles_tagged(tag)
      };

  return response.status(200).send(json);
});

function request_url(request) {
  return URL.parse(request.protocol + '://' + request.get('host') + request.originalUrl);
}
