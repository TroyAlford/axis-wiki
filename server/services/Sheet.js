import path   from 'path'
import utils  from 'fs-utils'

import { uniqBy } from 'lodash'
import config from '../../config/server'

import defaults from './Sheet.defaults.json'

export default class Sheet {
  constructor(data = {}) {
    this.folders = config.folders

    this.json = this.json.bind(this)

    /* Unique Collections */
    this.attributes = uniqBy([
      ...data.attributes || [],
      ...defaults.attributes,
    ], 'key')
    this.descriptors = uniqBy([
      ...data.descriptors || [],
      ...defaults.descriptors,
    ], 'key')
    this.skills = uniqBy([
      ...data.skills || [],
      ...defaults.skills,
    ], 'key')
    this.traits = uniqBy([
      ...data.traits || [],
      ...defaults.traits,
    ], 'key')

    /* Non-Unique Collections */
    this.armor = [
      ...data.armor || [],
      ...defaults.armor,
    ]
    this.weapons = [
      ...data.weapons || [],
      ...defaults.weapons,
    ]
  }

  json() {
    return {
      attributes: this.attributes,
      descriptors: this.descriptors,
      skills: this.skills,
      traits: this.traits,
      armor: this.armor,
      weapons: this.weapons
    }
  }

  static open(ownerId, slug) {
    const base = path.resolve(folders.users, ownerId),
          file = path.resolve(base, `${slug}.sheet`)

    let json = undefined

    try {
      json = utils.readJSONSync(file)
    } catch (err) {
      console.log(err.message)
    }

    return new Sheet(json)
  }
  save(ownerId, slug) {
    const base = path.resolve(folders.users, ownerId),
          file = path.resolve(base, `${slug}.sheet`)

    try {
      fs.writeFileSync(file, this.data)
    } catch (err) {
      console.log(err.message)
      return false
    }

    return true
  }
}
