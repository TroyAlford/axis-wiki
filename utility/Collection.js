import Guid from './Guid'
import {
  filter,
  includes,
  merge,
  orderBy,
  reject,
} from 'lodash'

const defaults = {
  orderBy: {
    fieldNames: ['key'],
    directions: ['asc'],
  },
  template: {
    id: Guid,
    key: self => self.id,
  }
}

export default class Collection {
  constructor(items = [], settings = {}) {
    this.items = []
    this.settings = merge({}, defaults, settings)

    items.forEach(item => this.add(item))
  }

  emitChanged() {
    if (typeof this.onChange === 'function')
      this.onChange()
  }

  get ids() {
    return this.map(item => item.id)
  }
  get keys() {
    return this.map(item => item.key)
  }
  get sorted() {
    if (typeof this.settings.orderBy === 'function')
      return orderBy(this.items, this.settings.orderBy)

    const { orderBy: { fieldNames, directions } } = this.settings
    return orderBy(this.items, fieldNames, directions)
  }

  add(newItem = {}) {
    const item = merge({}, this.settings.template, newItem)

    if (typeof item.id === 'function')
      item.id = item.id(item)
    if (typeof item.key === 'function')
      item.key = item.key(item)

    this.items.push(item)
    this.emitChanged()
  }
  remove(itemFilter) {
    const count = this.items.length

    if (includes(['object', 'function'], typeof itemFilter))
      this.items = reject(this.items, itemFilter)
    else if (inclues(['number', 'string'], typeof itemFilter))
      this.items = reject(this.items, { id: itemFilter })

    if (this.items.length !== count)
      this.emitChanged()
  }
  update(itemFilter, updater) {
    let items = this.filter(itemFilter)

    if (typeof updater === 'function')
      items.forEach(updater)
    else
      items.forEach(item => merge(item, updater))

    this.emitChanged()
  }

  filter(itemFilter = () => true) {
    if (includes(['object', 'function'], typeof itemFilter))
      return filter(this.items, itemFilter)
    else if (includes(['number', 'string'], typeof itemFilter))
      return filter(this.items, { id: itemFilter })
    else
      return this.items
  }
  forEach(fn = item => {}) {
    this.items.forEach(fn)
  }
  map(fn = item => {}) {
    this.items.map(fn)
  }
}
