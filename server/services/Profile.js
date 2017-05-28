import fs from 'fs'
import path from 'path'
import utils from 'fs-utils'
import { flow, sortBy, uniq } from 'lodash'
import config from '../../config/server'
import Permissions from '../services/Permissions'

export default class Profile {
  static get default() {
    return {
      id:    undefined,
      email: '',
      name:  '',

      privileges: ['read'],
    }
  }

  static delete(id) {
    // Removes files only. Reference updates are performed in response to file watchers.
    const filepath = path.resolve(config.folders.users, `${id}.json`)
    if (utils.exists(filepath)) {
      fs.unlinkSync(filepath, { force: true })
    }

    return true
  }

  static exists(id) {
    if (!id) return false
    const filepath = path.resolve(config.folders.users, `${id}.json`)
    return utils.exists(filepath)
  }

  static load(id) {
    if (!id) return Profile.default

    const file = path.resolve(config.folders.users, `${id}.json`)
    let profile = {}

    try {
      profile = utils.readJSONSync(file)
    } catch (err) {
      profile = Object.assign({}, Profile.default)
    }

    profile.privileges = flow(uniq(), sortBy())(
      ['read', ...Permissions.granted_to(id)]
    )

    return profile
  }

  static save(id, profile) {
    const filepath = path.resolve(config.folders.users, `${id}.json`)

    try {
      utils.writeFileSync(filepath, JSON.stringify(profile))
      return true
    } catch (err) {
      console.log(err.message) // eslint-disable-line no-console
      return false
    }
  }
}
