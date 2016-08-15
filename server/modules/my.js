import bodyParser           from 'body-parser'
import express              from 'express'

import Profile              from '../services/Profile'

export default express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded
.get('/profile', (request, response) =>
  response.status(200).send(Profile.load(request.session.id))
)
.post('/profile', (request, response) => {
  const { id: posted_id, name, email, picture } = request.body

  // if request.session.id isn't set, this is a new Profile
  const id = request.session.id || posted_id,
        profile = { id, name, email, picture }

  if (!Profile.save(profile.id, profile))
    return response.status(500).send('Unable to save profile.')

  response.status(200).send(Profile.load(profile.id))
})
