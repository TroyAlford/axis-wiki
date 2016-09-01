import forEach from 'lodash/forEach'
import orderBy from 'lodash/orderBy'
import uniqBy from 'lodash/uniqBy'

const defaults = {
  orderBy: undefined,
  orderByDirection: undefined,
  uniqBy: undefined,
}

export default class Collection {
  constructor(data, settings = defaults) {
    this.data = this.data.bind(this)

    this.settings = settings
    this.data(data)
  }

  data(obj) {
    if (obj === undefined) // GET operation
      return this.settings.orderBy
        ? orderBy(this.data, this.settings.orderBy, this.settings.orderByDirection)
        : this.data

    // SET operation
    if (Array.isArray(obj))
      return forEach(obj, this.push)

    if (this.settings.uniqBy)
      this.data = uniqBy([obj, ...this.data], this.settings.uniqBy)
    else
      this.data.push(obj)
  }
}
