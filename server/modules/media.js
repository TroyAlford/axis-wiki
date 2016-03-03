var
  _          = require('lodash'),
  bodyParser = require('body-parser'),
  cheerio    = require('cheerio'),
  express    = require('express'),
  fs         = require('fs'),
  path       = require('path'),
  utils      = require('fs-utils'),

  Tags       = require('./tags')
;

var paths = {
  media: path.resolve(__dirname, '../../content/media')
};

var media = module.exports = express();
media.use(bodyParser.json()); // Parses application/json
media.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded
media.use(express.static(paths.media));