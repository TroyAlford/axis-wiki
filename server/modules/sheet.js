import bodyParser from 'body-parser'
import express from 'express'

export default express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded

.get('/:slug', (request, response) => {
  const { userId, slug } = request.params
  console.log(`GET ${userId}/sheet/${slug}`, request.route)
  response.send('got here')
})
