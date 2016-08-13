import bodyParser   from 'body-parser'
import express      from 'express'
import path         from 'path'
import utils        from 'fs-utils'

import Config       from '../services/Config'

var files = {
  navigation: path.resolve(Config.folders.config, 'navigation.json')
};

export default express()
  .use(bodyParser.json()) // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded
.get('/navigation', function(request, response) {
  return response.status(200).send(
    utils.exists(files.navigation)
      ? utils.readJSONSync(files.navigation)
      : Config.settings.navigation.default_links
  );
})
