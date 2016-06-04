import bodyParser           from 'body-parser'
import express              from 'express'

import Profile              from '../services/Profile'

var my = module.exports = express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded
  .get('/profile', (request, response) => {
    let { session } = request.facebook

    if (!session.user_id) 
      return response.status(401).send('Please log in to Facebook in order to authenticate.')

    return response.status(200).send(
      Profile.load(session.user_id) || Profile.default
    );
  })
  .post('/profile', (request, response) => {
    let { session } = request.facebook,
        { name, email, picture } = request.body,
        profile = {
          id: session.user_id,
          name, email, picture
        }

    profile = Profile.save(session.user_id, profile);

    if (!profile)
      return response.status(500).send('Unable to save profile.');

    response.status(200).send(profile);
  })
;
