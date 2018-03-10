/* Inspired by https://github.com/helmetjs/nocache */
export default (request, response, next) => {
  const expires = new Date()
  expires.setDate(expires.getDate() + 1)

  response.setHeader('Surrogate-Control', 'max-age=86400')
  response.setHeader('Cache-Control', 'max-age=86400, s-maxage=86400')
  response.setHeader('Expires', expires.toUTCString())

  next()
}
