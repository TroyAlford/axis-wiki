var
  _          = require('lodash'),
  bodyParser = require('body-parser'),
  cheerio    = require('cheerio'),
  express    = require('express'),
  fs         = require('fs'),
  path       = require('path'),
  URL        = require('url'),
  utils      = require('fs-utils'),

  Links      = require('./links'),
  Slug       = require('./slug'),
  Tags       = require('./tags')
;


var search = module.exports = express();
search.use(bodyParser.json()); // Parses application/json
search.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

search.get('/tagged/:tag', function(request, response) {
  var tag = _.trim(_.toLower(request.params.tag || ''));
  return response.status(200).send(Tags.articles_tagged(tag));
});