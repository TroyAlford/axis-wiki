var
  _          = require('lodash'),
  bodyParser = require('body-parser'),
  cheerio    = require('cheerio'),
  express    = require('express'),
  fs         = require('fs'),
  path       = require('path'),
  utils      = require('fs-utils'),

  config     = require('../config.json').navigation,
  Tags       = require('./tags')
;

var paths = {
  config_folder: path.resolve(__dirname, '../../content/config')
};

var search = module.exports = express();
search.use(bodyParser.json()); // Parses application/json
search.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

search.get('/navigation', function(request, response) {
  var json_path = path.resolve(paths.config_folder, 'navigation.json');
  var json = utils.exists(json_path) ? utils.readJSONSync(json_path) : config.default_links;
  return response.status(200).send(json);
});