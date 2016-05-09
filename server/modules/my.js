import _                    from 'lodash'
import { html as beautify } from 'js-beautify'
import bodyParser           from 'body-parser'
import cheerio              from 'cheerio'
import express              from 'express'
import fs                   from 'fs'
import path                 from 'path'
import URL                  from 'url'
import utils                from 'fs-utils'

import Profile              from '../services/Profile'

var my = module.exports = express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded
  .get('/profile', (request, response) => {
    let { session } = request.facebook,
      profile = Profile.load(session.user_id);

    if (!profile)
      Profile.save(session.user_id, Profile.default);

    return response.status(200).send(Profile.load(session.user_id));
  })
  .post('/profile', (request, response) => {
    let user   = request.user,
        posted = request.body,
        saved  = Profile.save(user.id, posted);

    if (!saved)
      return response.status(500).send('Unable to save profile.');

    response.status(200).send(Profile.load(user.id));
  })
;
