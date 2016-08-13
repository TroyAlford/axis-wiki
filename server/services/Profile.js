import flow                 from 'lodash/flow'
import sortBy               from 'lodash/sortBy'
import uniq                 from 'lodash/uniq'

import fs                   from 'fs'
import path                 from 'path'
import utils                from 'fs-utils'

import Config               from '../services/Config'
import Permissions          from '../services/Permissions'

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
    if (!id) return Profile.default

    let file = path.resolve(Config.folders.users, `${id}.json`),
        profile = {}

    try {
      profile = utils.readJSONSync(file)
    } catch (err) {
      profile = Object.assign({}, Profile.default)
    }

    profile.privileges = flow(uniq(),sortBy())(
      ['read', ...Permissions.granted_to(id)]
    )

    return profile
  }

  static save(id, profile) {
    let filepath = path.resolve(Config.folders.users, `${id}.json`);

    try {
      utils.writeJSONSync(filepath, profile);
    } catch (err) {
      console.log(err.message);
      return false;
    }

    return true;
  }
}
