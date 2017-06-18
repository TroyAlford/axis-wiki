import bodyParser from 'body-parser'
import express from 'express'
import NoAnonymous from '../middleware/NoAnonymous'

import User from '../db/schema/User'

/* eslint-disable no-underscore-dangle, no-param-reassign */

export default express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded

.get('/profile', NoAnonymous, (request, response) => {
  const { session: { id } } = request
  User.findOne({ id }).then(user =>
    response.status(200).send(User.render(user))
  )
})
.post('/profile', (request, response) => {
  const authenticated = Boolean(request.session && request.session.id)
  const _id = authenticated ? request.session.id : request.body.id

  if (!_id) return response.status(500).send('Invalid profile id')

  return User.findOne({ _id }).then((user) => {
    if (!authenticated && user) {
      // User is not logged in, and attempting to update existing profile.
      return response.status(401).send('You must be logged in to update your profile.')
    } else if (authenticated && user) {
      // User logged in, and updating their own profile.
      user.name = request.body.name
      user.email = request.body.email
      return user.save().then(updated => response.status(200).send(User.render(updated)))
    } else if (!user) {
      // User is not logged in, and there's no profile. Allow new user creation.
      const created = new User({
        _id,
        name:  request.body.name,
        email: request.body.email,
      })
      return created.save().then(updated => response.status(200).send(User.render(updated)))
    }

    // This shouldn't happen, but is a catchall.
    return response.status(500).send('Unable to save profile.')
  })
})
