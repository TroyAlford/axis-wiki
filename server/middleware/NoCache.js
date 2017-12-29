/* Inspired by https://github.com/helmetjs/nocache */
export default (request, response, next) => {
  response.setHeader('Surrogate-Control', 'no-store')
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  response.setHeader('Pragma', 'no-cache')
  response.setHeader('Expires', 0)

  next()
}
