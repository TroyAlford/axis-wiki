export default (request, response, next) => {
  const { session: { id } } = request
  if (id === undefined)
    return response.status(401).send({ error: 'You must be logged in to perform this action.' })

  next();
}
