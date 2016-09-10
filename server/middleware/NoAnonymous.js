import crypto  from 'crypto'
import Config  from '../services/Config'
import Profile from '../services/Profile'

const PREFIX = 'fbsr_';

export default (request, response, next) => {
  const { session: { id } } = request
  if (id === undefined)
    return response.status(401).send({ error: 'You must be logged in to perform this action.' })

  next();
}
