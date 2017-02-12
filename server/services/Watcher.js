import chokidar from 'chokidar'
import path from 'path'
import { includes } from 'lodash'

import config from '../../config/server'
import Links from './Links'
import Tags from './Tags'

const CHOKIDAR_OPTIONS = {
  ignoreInitial: true,
  persistent: true
};
const watchedExtensions = ['html', 'json']

export default class Watcher {
  static watch() {
    chokidar.watch(`${config.folders.articles}/*`, CHOKIDAR_OPTIONS)
      .on('raw', (event, filename, details) => {
        if (filename == null) { // On Windows, the filename is null. Fully reindex.
          Links.rebuild();
          Tags.rebuild();
          return;
        }

        if (path.dirname(filename) != '.' && // Windows = '.', and only events for files in the subdir
            path.dirname(filename) != config.folders.articles) // *nix = full path
          return;

        let which = path.extname(filename),
            action = event != 'unlink' ? 'reindex' : 'unindex',
            target = path.basename(filename, which);

        which = which.replace('.', '');

        if (!includes(watchedExtensions, which)) return;

        Links[`${action}_${which}`](target);
        if (which == 'json') Tags[action](target);
      })
      .on('error', error => console.log(`Watcher error: ${error}`))
    ;
  }
}
