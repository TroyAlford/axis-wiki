import _            from 'lodash'
import bodyParser   from 'body-parser'
import cheerio      from 'cheerio'
import express      from 'express'
import fs           from 'fs'
import mkdirp       from 'mkdirp'
import path         from 'path'
import utils        from 'fs-utils'

import Config       from '../services/Config'

let navigation = module.exports = express();

navigation.use(bodyParser.json()); // Parses application/json
navigation.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

var files = {
  navigation: path.resolve(Config.folders.config, 'navigation.json')
};

navigation.get('/navigation', function(request, response) {
  return response.status(200).send(
    utils.exists(files.navigation)
      ? utils.readJSONSync(files.navigation) 
      : Config.settings.navigation.default_links
  );
});