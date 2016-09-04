import Guid from './Guid'
import {
  cloneDeep,
  filter,
  includes,
  isEqual,
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

    this.addAll(items)
  }

  emitChanged() {
    if (typeof this.onChange === 'function')
      this.onChange(this)
  }

  get ids() {
    return this.map(item => item.id)
  }

  get keys() {
    return this.map(item => item.key)
  }

  add(sent = {}) {
    if (sent.id && this.find(sent.id))
      return this.update(sent.id, sent)

    const item = this.applyTemplate(sent)
    this.items = this.sort([
      ...this.items,
      item
    ])

    this.emitChanged()
  }

  addAll(sent = []) {
    if (!Array.isArray(sent))
      return this.add(sent)

    const before = cloneDeep(this.items)
    const newItems = sent.map(this.applyTemplate.bind(this))
    const newIds = newItems.map(item => item.id)

    this.items = this.sort([
      ...this.filter(item => !includes(newIds, item.id)),
      ...newItems
    ])

    if (!isEqual(before, this.items))
      this.emitChanged()
  }

  applyTemplate(initial = {}) {
    const item = merge({}, this.settings.template, initial)

    if (typeof item.id === 'function')
      item.id = item.id(item)
    if (typeof item.key === 'function')
      item.key = item.key(item)

    return item
  }

  clear() {
    const before = this.items.length
    this.items = []

    if (before !== 0)
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

  find(itemFilter) {
    return this.filter(itemFilter).shift()
  }

  forEach(fn = item => { return }) {
    this.items.forEach(fn)
  }

  map(fn = item => item) {
    return this.items.map(fn)
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

  sort(items) {
    if (items === undefined)
      return this.sort(this.items)

    if (typeof this.settings.orderBy === 'function')
      return orderBy(items, this.settings.orderBy)

    const { orderBy: { fieldNames, directions } } = this.settings
    return orderBy(items, fieldNames, directions)
  }

  update(itemFilter, updater) {
    const before = cloneDeep(this.items)
    const items = this.filter(itemFilter)

    if (typeof updater === 'function')
      items.forEach(updater)
    else if (typeof updater === 'object')
      items.forEach(item => merge(item, updater))
    else
      return console.error(`Collection.update(itemFilter, updater) requires a function or object updater. Found ${typeof updater}`)

    this.items = this.sort(this.items)

    if (!isEqual(before, this.items))
      this.emitChanged()
  }

}
