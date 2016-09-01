import bodyParser           from 'body-parser'
import express              from 'express'

import Profile              from '../services/Profile'
import api_sheet            from './sheet'

export default express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded

.use('/:id/sheet/:slug', (request, response) => {
  const { id, slug } = request.params
  console.log(`GET ${id}/sheet/${slug}`)
  response.send('got here')
})

.get('/:id/profile', (request, response) =>
  response.status(200).send(Profile.load(request.params.id))
)
