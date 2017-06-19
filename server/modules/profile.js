import bodyParser from 'body-parser'
import express from 'express'

import User from '../db/schema/User'

/* eslint-disable no-underscore-dangle, no-param-reassign */

export default express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded

.get('/profile/:id', (request, response) => {
  User.findOne({ _id: request.params.id }).then(user =>
    response.status(200).send(User.render(user))
  )
})
