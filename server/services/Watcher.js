import chokidar from 'chokidar'
import path from 'path'
import { includes } from 'lodash'

import config from '../../config/server'
import Links from './Links'
import Tags from './Tags'

const CHOKIDAR_OPTIONS = {
  ignoreInitial: true,
  persistent:    true,
}
const watchedExtensions = ['html', 'json']

export default class Watcher {
  static watch() {
    chokidar.watch(`${config.folders.articles}/*`, CHOKIDAR_OPTIONS)
      .on('raw', (event, filename) => {
        if (filename == null) { // On Windows, the filename is null. Fully reindex.
          Links.rebuild()
          Tags.rebuild()
          return
        }

        if (path.dirname(filename) !== '.' && // Windows = '.', and only events for files in the subdir
            path.dirname(filename) !== config.folders.articles) { // *nix = full path
          return
        }

        const ext = path.extname(filename)
        const action = event !== 'unlink' ? 'reindex' : 'unindex'
        const target = path.basename(filename, ext)

        if (!includes(watchedExtensions, ext)) return

        Links[`${action}${ext.toUpperCase()}`](target)
        if (ext === 'json') Tags[action](target)
      })
      .on('error', error =>
        console.log(`Watcher error: ${error}`) // eslint-disable-line no-console
      )
  }
}
