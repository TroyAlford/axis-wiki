import mkdirp       from 'mkdirp'
import path         from 'path'
import utils        from 'fs-utils'

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
      argv       = require('minimist')(process.argv.slice(2)),
      defaults   = require('../defaults.json'),
      arg_path   = argv.c || argv.config || 'defaults.json',
      adj_path   = path.isAbsolute(arg_path) ? arg_path : path.join(__dirname, '../', arg_path),
      cfg_exists = utils.exists(adj_path),
      config     = cfg_exists ? require(adj_path) : {}
    ;

    SETTINGS = Object.assign({}, defaults, config);
    console.log(`Loaded Configuration: ${adj_path}`);

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
      metadata: path.join(basePath, './metadata')
    };

    return this._folders;
  }
}

export default new Config();