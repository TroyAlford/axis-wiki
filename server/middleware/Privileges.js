import NoAnonymous from './NoAnonymous'

export default required => (request, response, next) => {
  NoAnonymous(request, response, () => {
    if (!Array.isArray(required)) return next()

    const { session: { privileges } } = request

    const has = required
    .filter(privilege => typeof privilege === 'string')
    .filter(privilege =>
      privileges.indexOf(privilege) !== -1 ||
      privileges.indexOf('admin') !== -1
    )

    if (has.length === 0) {
      return response.status(401).send('You are not authorized for this action.')
    }

    return next()
  })
}
