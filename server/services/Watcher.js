import chokidar from 'chokidar'
import path from 'path'

import Config from './Config'
import Links from './Links'
import Tags from './Tags'

const CHOKIDAR_OPTIONS = {
  ignoreInitial: true,
  persistent: true
};

export default class Watcher {
  static watch() {
    chokidar.watch(`${Config.folders.articles}/*`, CHOKIDAR_OPTIONS)
      .on('raw', (event, filename, details) => {
        if (path.dirname(filename) != Config.folders.articles) return;

        let which = path.extname(filename),
            action = event != 'unlink' ? 'reindex' : 'unindex',
            target = path.basename(filename, which);

        which = which.replace('.', '');

        Links[`${action}_${which}`](target);
        if (which == 'json') Tags[action](target);
      })
      .on('error', error => console.log(`Watcher error: ${error}`))
    ;
  }
}
