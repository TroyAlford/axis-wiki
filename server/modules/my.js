import bodyParser           from 'body-parser'
import express              from 'express'

import Profile              from '../services/Profile'

var my = module.exports = express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded
  .get('/profile', (request, response) => {
    return response.status(200).send(
      Profile.load(request.session.user_id) || Profile.default
    );
  })
  .post('/profile', (request, response) => {
     let { name, email, picture } = request.body,
        profile = {
          id: request.session.user_id,
          name, email, picture
        }

    if (!Profile.save(profile.id, profile))
      return response.status(500).send('Unable to save profile.');

    response.status(200).send(profile);
  })
;
