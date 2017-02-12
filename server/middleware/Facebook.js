import crypto  from 'crypto'
import config  from '../../config/server'
import Profile from '../services/Profile'

const PREFIX = 'fbsr_';

export default (req, res, next) => {
  const
    { app_id, app_secret } = config.facebook,
    cookie_name = `${PREFIX}${app_id}`,
    header_name = `X-${PREFIX}${app_secret}`,
    cookie      = req.header(header_name) || req.cookies[cookie_name]
  ;

  let hmac = null;
  try {
    hmac = crypto.createHmac('sha256', app_secret);
  } catch (err) { // app_secret is probably not set-up
    req.session = {};
    next();
    return;
  }

  if (cookie) {
    const
      chunks = cookie.split('.', 2),
      rawSignature = chunks[0].replace(/\-/g, '+').replace(/\_/g, '/'),
      hexSignature = encodeToHex(new Buffer(rawSignature, 'base64')),
      rawToken = new Buffer(chunks[1].replace(/\-/g, '+').replace(/\_/g, '/'), 'base64').toString(),
      token = JSON.parse(rawToken),
      hmac = crypto.createHmac('sha256', app_secret)
    ;

    hmac.update(chunks[1]);

    const expectedSignature = hmac.digest('hex');

    if (expectedSignature == hexSignature)
      req.session = Object.assign({ token }, Profile.load(token.user_id))
  } else
    req.session = {}

  next();
}

const toHex = byte => ((byte < 16) ? '0' : '') + byte.toString(16);

function encodeToHex(buffer) {
  let encoded = '';
  for (let byte of buffer)
    encoded += toHex(byte);

  return encoded;
}
