import bodyParser from 'body-parser'
import express from 'express'

import Profile from '../services/Profile'

export default express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded

.get('/profile', (request, response) => {
  const { session: { id } } = request
  response.status(200).send(Profile.load(id))
})
.post('/profile', (request, response) => {
  const { id: postedId, name, email } = request.body

  // if request.session.id isn't set, this is a new Profile
  const id = request.session.id || postedId
  const profile = { id, name, email }

  if (!Profile.save(profile.id, profile)) {
    return response.status(500).send('Unable to save profile.')
  }

  return response.status(200).send(Profile.load(profile.id))
})
