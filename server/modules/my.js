import bodyParser from 'body-parser'
import express from 'express'
import NoAnonymous from '../middleware/NoAnonymous'

import User from '../db/schema/User'

export default express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded

.get('/profile', NoAnonymous, (request, response) => {
  const { session: { id } } = request
  User.findOne({ id }).then(user =>
    response.status(200).send(user)
  )
})
.post('/profile', (request, response) => {
  const authenticated = Boolean(request.session && request.session.id)
  const { name, email } = request.body
  const id = authenticated ? request.session.id : request.body.id

  if (!id) return response.status(500).send('Invalid profile id')

  User.findOne({ _id: id }).then((user) => {
    /* eslint-disable no-param-reassign */

    if (!authenticated && user) {
      // User is not logged in, and attempting to update existing profile.
      return response.status(401).send('You must be logged in to update your profile.')
    } else if (authenticated && user) {
      // User logged in, and updating their own profile.
      user.name = name
      user.email = email
      user.save()

      return response.status(200).send({ ...user, id })
    } else if (!user) {
      // User is not logged in, and there's no profile. Allow new user creation.
      const created = new User({ _id: id, name, email })
      created.save()

      return response.status(200).send({ ...created, id })
    }

    // This shouldn't happen, but is a catchall.
    return response.status(500).send('Unable to save profile.')
  })
})
