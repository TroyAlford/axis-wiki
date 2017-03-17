import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import utils from 'fs-utils'

import config from '../../config/server'

const files = {
  navigation: path.resolve(config.folders.config, 'navigation.json')
}

export function getNavigation() {
  return utils.exists(files.navigation)
    ? utils.readJSONSync(files.navigation)
    : []
}

export default express()
  .use(bodyParser.json()) // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded
.get('/navigation', (request, response) =>
  response.status(200).send(getNavigation())
)
