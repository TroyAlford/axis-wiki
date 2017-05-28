import bodyParser from 'body-parser'
import express from 'express'
import Facebook     from '../middleware/Facebook'
import NoAnonymous  from '../middleware/NoAnonymous'

import Profile from '../services/Profile'

export default express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded

.get('/profile', NoAnonymous, (request, response) => {
  const { session: { id } } = request
  response.status(200).send(Profile.load(id))
})
.post('/profile', (request, response) => {
  const authenticated = Boolean(request.session && request.session.id)
  const { name, email } = request.body
  const id = authenticated ? request.session.id : request.body.id
  const profile = { id, name, email }

  if (!id) return response.status(500).send('Invalid profile id')

  if (authenticated) {
    if (Profile.save(id, profile))
      return response.status(200).send(profile)
    else
      return response.status(500).send('Unable to save profile.')
  }

  // If we got here, the user is non-authenticated
  if (Profile.exists(id)) // Don't let the user update an existing profile
    return response.status(401).send('You must be logged in to update your profile.')

  if (Profile.save(id, profile)) // Create new profile
    return response.status(200).send({ ...profile, id })

  return response.status(500).send('Unable to save profile.')
})
