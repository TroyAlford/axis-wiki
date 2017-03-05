import path from 'path'
import utils from 'fs-utils'
import config from './config'

export function setting(key, defaultValue) {
  return process && process.env && process.env[key] || defaultValue
}

const _contentPath = setting('STORAGE_PATH', path.join(__dirname, '/content'))
const contentPath = !path.isAbsolute(_contentPath)
  ? path.join(__dirname, _contentPath)
  : _contentPath

const folders = ['articles', 'config', 'media', 'metadata', 'users']
  .reduce((folders, folderName) => ({
    ...folders,
    [folderName]: path.join(contentPath, `./${folderName}`)
  }), {})

for (let folder in folders) {
  if (!utils.isDir(folders[folder])) {
    console.error(`Folder missing: ${folders[folder]}`)
  }
}

export default {
  ...config,

  cleanup: {
    throttle: 5000 // ms
  },
  facebook: {
    ...config.facebook,
    appSecret: setting('FB_APP_SECRET', undefined),
  },
  folders,

  port: setting('SERVER_PORT', 8080),
}
