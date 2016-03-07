var
  _          = require('lodash'),
  bodyParser = require('body-parser'),
  cheerio    = require('cheerio'),
  express    = require('express'),
  fs         = require('fs'),
  mkdirp     = require('mkdirp'),
  path       = require('path'),
  utils      = require('fs-utils'),

  json       = require('../config.json')
;

var _this = module.exports = express();

var _folders = null;
_this.folders = function() {
  if (_folders) return _folders;

  var basePath = path.isAbsolute(json.storage.path) 
      ? json.storage.path
      : path.join(__dirname, '../', json.storage.path);

  _folders = {
    articles: path.join(basePath, './articles'),
    config:   path.join(basePath, './config'),
    media:    path.join(basePath, './media'),
    metadata: path.join(basePath, './metadata')
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

_this.use(bodyParser.json()); // Parses application/json
_this.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

_this.get('/navigation', function(request, response) {
  return response.status(200).send(
    utils.exists(files.navigation) 
      ? utils.readJSONSync(files.navigation) 
      : json.default_links
  );
});

// Run Once
_this.ensure_folders(); // Automatically ensure the folders exist on startup.

var files = {
  navigation: path.resolve(_this.folders().config, 'navigation.json')
};
