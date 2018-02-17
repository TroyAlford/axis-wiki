import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import utils from 'fs-utils'
import config from './config'

dotenv.config()

function setting(key, defaultValue) {
  // eslint-disable-next-line no-mixed-operators
  return process && process.env && process.env[key] || defaultValue
}

let contentPath = setting('STORAGE_PATH', path.join(__dirname, '/content'))
contentPath = !path.isAbsolute(contentPath)
  ? path.join(__dirname, contentPath)
  : contentPath

const folders = ['articles', 'config', 'media', 'users']
  .reduce((hash, name) => ({
    ...hash,
    [name]: path.join(contentPath, `./${name}`),
  }), {})

Object.keys(folders).forEach((folder) => {
  if (!utils.isDir(folders[folder])) {
    fs.mkdirSync(folders[folder])
    console.error(`Folder missing: ${folders[folder]} => created it`) // eslint-disable-line no-console
  }
})

export default {
  ...config,

  cleanup: {
    throttle: 5000, // ms
  },
  facebook: {
    ...config.facebook,
    appId: setting('FB_APP_ID', undefined),
    appSecret: setting('FB_APP_SECRET', undefined),
  },
  folders,

  port: setting('SERVER_PORT', 8080),
}
