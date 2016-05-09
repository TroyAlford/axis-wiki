import _                    from 'lodash'
import fs                   from 'fs'
import path                 from 'path'
import utils                from 'fs-utils'

import Config               from './Config'

export default class Profile {
  static get default() {
    return {
      id: '',
      email: '',
      name: '',
      picture: {},
      privileges: ['read']
    }
  }

  static delete(id) {
    // Removes files only. Reference updates are performed in response to file watchers.
    let filepath = path.resolve(Config.folders.users, `${id}.json`);
    if (utils.exists(filepath))
      fs.unlinkSync(filepath, { force: true });

    return true;
  }

  static load(id) {
    let file = path.resolve(Config.folders.users, `${id}.json`),
        json = {};

    try {
      return utils.readFileSync(file);
    } catch (err) {
      return null;
    }
  }

  static save(id, profile) {
    let filepath = path.resolve(Config.folders.users, `${id}.json`);

    try {
      fs.writeFileSync(filepath, JSON.stringify(profile));
    } catch (err) {
      console.log(err.message);
      return false;
    }

    return true;
  }
}
