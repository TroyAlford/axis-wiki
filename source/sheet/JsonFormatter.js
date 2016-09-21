import * as React from 'react'
import {
  defaults, filter, flow, includes,
  map, omit, omitBy, orderBy, pick,
} from 'lodash'
import { keys as allowedAttributeKeys } from './AttributeManager'
import { keys as allowedDescriptorKeys } from './DescriptorManager'
import Slug from '../../utility/Slugs'

export default class JsonFormatter extends React.Component {
  get cleansed() {
    return {
      name: this.name,
      rp: this.props.rp || 0,
      xp: this.props.xp || 0,
      wounds: this.props.wounds || {
        light: 0,
        deep: 0,
      },

      armor: this.armor,
      attributes: this.attributes,
      descriptors: this.descriptors,
      skills: this.skills,
      traits: this.traits,
      weapons: this.weapons,
    }
  }
  get json() {
    return JSON.stringify(this.cleansed)
  }

  get name() {
    return typeof this.props.name === 'string'
      ? this.props.name
      : 'Untitled Character'
  }

  get armor() {
    return flow([
      cleanKeysAndNames,
      array => ensureValueArray(array, 'values', 6, 0),
      array => map(array, item => ({ ...item, equipped: !!item.equipped })),
      array => map(array, item => pick(item, ['key', 'name', 'equipped', 'values'])),
      orderByKeys,
    ])(this.props.armor)
  }
  get attributes() {
    return flow([
      array => whitelistKeys(array, allowedAttributeKeys),
      array => map(array, item => flow([
        attr => defaults(item, { value: 0 }),
        attr => pick(item, ['key', 'value']),
      ])(item)),
      orderByKeys,
    ])(this.props.attributes)
  }
  get descriptors() {
    return flow([
      array => whitelistKeys(array, allowedDescriptorKeys),
      array => map(array, item => flow([
        attr => defaults(item, { value: '' }),
        attr => pick(item, ['key', 'value']),
      ])(item)),
      orderByKeys,
    ])(this.props.descriptors)
  }
  get skills() {
    return flow([
      cleanKeysAndNames,
      array => omitIfFalsy(array, ['category', 'name', 'note']),
      array => ensureValueArray(array, 'values', 2, 0),
      array => map(array, item =>
        pick(item, ['key', 'category', 'name', 'note', 'values'])
      ),
      orderByKeys,
    ])(this.props.skills)
  }
  get traits() {
    return flow([
      cleanKeysAndNames,
      array => omitIfFalsy(array, ['category', 'name', 'note']),
      array => map(array, item => flow([
        trait => defaults(item, { value: 0 }),
        trait => pick(item, ['key', 'category', 'name', 'note', 'value']),
      ])(item)),
      orderByKeys,
    ])(this.props.traits)
  }
  get weapons() {
    return flow([
      cleanKeysAndNames,
      array => ensureValueArray(array, 'values', 3, 0),
      array => map(array, item => ({ ...item, equipped: !!item.equipped })),
      array => map(array, item => pick(item, ['key', 'name', 'equipped', 'values'])),
      orderByKeys,
    ])(this.props.weapons)
  }

  render() { return null; }
}

function cleanKeysAndNames(array) {
  return flow([
    // Ensure that all keys are set & Slugified ...
    array => map(array, item => ({ ...item, key: Slug(item.key) })),
    // ... then remove an items which have a Falsy key
    array => filter(array, item => !!Slug(item.key)),
    // ... then remove any unnecessary names (Slugified = key)
    array => map(array, item =>
      (!item.name || Slug(item.name) === item.key)
        ? omit(item, 'name')
        : item
    ),
  ])(array)
}
function ensureValueArray(object, key, length, defaultValue) {
  if (Array.isArray(object))
    return object.map(item => ensureValueArray(item, key, length, defaultValue))

  let array = Array.isArray(object[key]) ? object[key] : []

  if (array.length < length) {
    const toAdd = Array.apply(this, Array(length - array.length))
                       .map(() => defaultValue)
    array = [...array, ...toAdd]
  }

  object[key] = array.slice(0, length)
  return object
}
function omitIfFalsy(object, keys) {
  if (Array.isArray(object))
    return object.map(item => omitIfFalsy(item, keys))

  return omitBy(object, (value, key) => {
    return includes(keys, key) && !value
  })
}
function orderByKeys(array) {
  return orderBy(array, ['key'])
}
function whitelistKeys(array, keys) {
  return filter(array, item => includes(keys, item.key))
}

JsonFormatter.propTypes = {
  name: React.PropTypes.string.isRequired,
  rp: React.PropTypes.number.isRequired,
  xp: React.PropTypes.number.isRequired,

  armor: React.PropTypes.array.isRequired,
  attributes: React.PropTypes.array.isRequired,
  descriptors: React.PropTypes.array.isRequired,
  skills: React.PropTypes.array.isRequired,
  traits: React.PropTypes.array.isRequired,
  weapons: React.PropTypes.array.isRequired,
}
JsonFormatter.defaultProps = {
  name: 'Unnamed Character',
  rp: 0,
  xp: 0,

  armor: [],
  attributes: [],
  descriptors: [],
  skills: [],
  traits: [],
  weapons: [],
}
