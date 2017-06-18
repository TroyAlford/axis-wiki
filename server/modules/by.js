import bodyParser from 'body-parser'
import express from 'express'

import User from '../db/schema/User'

export default express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded

.get('/:id/profile', (request, response) => {
  const { id } = request.params
  User.findOne({ id })
      .then(user => response.status(200).send(User.render(user)))
})
