import defaults from './Sheet.defaults.json'

import Collection from '../helpers/Collection'
import flow from 'lodash/flow'
import uniqBy from 'lodash/uniqBy'

export default class Sheet {
  constructor(data = {}) {
    this.armor = new Collection([
      ...data.armor || [],
      ...defaults.armor,
    ], {
      orderBy: ['equipped', 'name'],
      orderByDirection: ['desc', 'asc']
    })

    this.attributes = new Collection([
      ...data.attributes || [],
      ...defaults.attributes,
    ], { uniqBy: 'key' })

    this.descriptors = new Collection([
      ...data.descriptors || [],
      ...defaults.descriptors,
    ], { uniqBy: 'key' })

    this.skills = new Collection([
      ...data.skills || [],
      ...defaults.skills,
    ], { uniqBy: 'key' })

    this.traits = new Collection([
      ...data.traits || [],
      ...defaults.traits,
    ], { uniqBy: 'key' })

    this.weapons = new Collection([
      ...data.weapons || [],
      ...defaults.weapons,
    ], {
      orderBy: ['equipped', 'name'],
      orderByDirection: ['desc', 'asc']
    })
  }

  descriptors(values) {

  }
}
