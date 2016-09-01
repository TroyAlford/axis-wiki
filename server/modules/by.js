import bodyParser           from 'body-parser'
import express              from 'express'

import Profile              from '../services/Profile'
import Sheet                from '../services/Sheet'

export default express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded

.get('/:id/sheet/:slug', (request, response) => {
  const { id, slug } = request.params
  response.send(Sheet.open(id, slug).json())
})

.get('/:id/profile', (request, response) =>
  response.status(200).send(Profile.load(request.params.id))
)
