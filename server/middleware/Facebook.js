import crypto from 'crypto'
import Config from '../services/Config'

const PREFIX = 'fbsr_';

export default (req, res, next) => {
  let
    { application_id, application_secret } = Config.settings.facebook,
    cookie_name = `${PREFIX}${application_id}`,
    header_name = `X-${PREFIX}${application_secret}`,
    cookie      = req.header(header_name) || req.cookies[cookie_name]
  ;

  req.facebook = {};

  if (cookie) {
    let 
      chunks = cookie.split('.', 2),
      rawSignature = chunks[0].replace(/\-/g, '+').replace(/\_/g, '/'),
      hexSignature = encodeToHex(new Buffer(rawSignature, 'base64')),
      rawToken = new Buffer(chunks[1].replace(/\-/g, '+').replace(/\_/g, '/'), 'base64').toString(),
      token = JSON.parse(rawToken),
      hmac = crypto.createHmac('sha256', application_secret)
    ;

    hmac.update(chunks[1]);

    let expectedSignature = hmac.digest('hex');

    if (expectedSignature == hexSignature)
      req.facebook = { session: token };
  }

  next();
}

function encodeToHex(buffer) {
  let toHex = byte => ((byte < 16) ? '0' : '') + byte.toString(16);

  let encoded = '';
  for (let byte of buffer)
    encoded += toHex(byte);

  return encoded;
}
