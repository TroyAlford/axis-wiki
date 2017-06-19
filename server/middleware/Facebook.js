import crypto from 'crypto'
import config from '../../config/server'
import User from '../db/schema/User'

const PREFIX = 'fbsr_'

const toHex = byte => ((byte < 16) ? '0' : '') + byte.toString(16)
const encodeToHex = buffer => buffer.reduce(
  (encoded, byte) => encoded + toHex(byte)
, '')

export default (req, res, next) => {
  const { appId, appSecret } = config.facebook
  const cookieName = `${PREFIX}${appId}`
  const headerName = `X-${PREFIX}${appSecret}`
  const cookie = req.header(headerName) || req.cookies[cookieName]

  req.session = { anonymous: true } // eslint-disable-line no-param-reassign

  let hmac = null
  try {
    hmac = crypto.createHmac('sha256', appSecret)
  } catch (err) { // appSecret is probably not set-up
    next()
    return
  }

  if (cookie) {
    const chunks = cookie.split('.', 2)
    const rawSignature = chunks[0].replace(/-/g, '+').replace(/_/g, '/')
    const hexSignature = encodeToHex(new Buffer(rawSignature, 'base64'))
    const rawToken = new Buffer(chunks[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
    const token = JSON.parse(rawToken)

    hmac.update(chunks[1])

    const expectedSignature = hmac.digest('hex')

    if (expectedSignature === hexSignature) {
      User.findOne({ _id: token.user_id }).then((user) => {
        if (!user) {
          req.session = { anonymous: true }
        } else {
          req.session = { token, ...User.render(user) }
        }
        next()
      })
    }
  }
}
