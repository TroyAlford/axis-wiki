var
  _          = require('lodash'),
  bodyParser = require('body-parser'),
  cheerio    = require('cheerio'),
  express    = require('express'),
  fs         = require('fs'),
  mkdirp     = require('mkdirp'),
  path       = require('path'),
  utils      = require('fs-utils'),

  config     = require('../config.json'),
  Tags       = require('./tags')
;

var paths = {
  config_folder: path.resolve(__dirname, '../../content/config')
};

var _this = module.exports = express();
_this.use(bodyParser.json()); // Parses application/json
_this.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

_this.get('/navigation', function(request, response) {
  var json_path = path.resolve(paths.config_folder, 'navigation.json');
  var json = utils.exists(json_path) ? utils.readJSONSync(json_path) : config.default_links;
  return response.status(200).send(json);
});

var _folders = null;
_this.folders = function() {
  if (!_folders) {
    var basePath = path.isAbsolute(config.storage.path) 
        ? config.storage.path
        : path.join(__dirname, '../', config.storage.path);
    _folders = {
      articles: path.join(basePath, './articles'),
      config:   path.join(basePath, './config'),
      media:    path.join(basePath, './media'),
      metadata: path.join(basePath, './metadata')
    }
  }
  return _folders;
}

_this.ensure_folders = function() {
  var folders = this.folders();
  // Ensure the required folders exist.
  Object.keys(folders).forEach(function(folder) {
    console.log(`Ensuring folder: ${folders[folder]}`)
    mkdirp(folders[folder], function(){});
  });
}
_this.ensure_folders(); // Automatically ensure the folders exist on startup.