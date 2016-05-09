import mkdirp       from 'mkdirp'
import path         from 'path'
import utils        from 'fs-utils'

import defaults     from '../defaults.json'

let SETTINGS = null;

class Config {
  constructor() {
    Object.keys(this.folders).forEach(folder => {
      if (!utils.isDir(this.folders[folder])) {
        console.log(`Creating missing folder: ${this.folders[folder]}`);
        mkdirp(this.folders[folder]);
      }
    });
  }

  get settings() {
    if (SETTINGS)
      return SETTINGS;

    let 
      argv        = require('minimist')(process.argv.slice(2)),
      config_path = path.join(__dirname, '../config.json'),
      config      = utils.exists(config_path) ? require(config_path) : {},
      debug       = argv.debugging || false
    ;

    SETTINGS = Object.assign({ debugging: debug }, defaults, config);
    console.log(`Loaded Configuration`);

    return SETTINGS;
  }

  get folders() {
    if (this._folders)
      return this._folders;

    var storage = this.settings.storage,
      basePath = path.isAbsolute(storage.path)
        ? storage.path
        : path.join(__dirname, '../', storage.path);

    this._folders = {
      articles: path.join(basePath, './articles'),
      config:   path.join(basePath, './config'),
      media:    path.join(basePath, './media'),
      metadata: path.join(basePath, './metadata'),
      users:    path.join(basePath, './users')
    };

    return this._folders;
  }
}

export default new Config();