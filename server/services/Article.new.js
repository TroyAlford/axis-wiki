import difference from 'lodash/difference'
import flow       from 'lodash/flow'
import map        from 'lodash/map'
import orderBy    from 'lodash/orderBy'
import uniq       from 'lodash/uniq'

import $          from 'cheerio'
import Slug       from './Slug'

export default class Article {
  constructor({
    aliases = [],
    data = [],
    html = '',
    slug = '',
    tags = [],

    cleaners = [],
    renderers = [],
  } = {}) {
    this._renderedHTML = undefined

    this.cleaners = cleaners
    this.renderers = renderers

    this.aliases = aliases
    this.data = data
    this.html = html
    this.slug = slug
    this.tags = tags
  }

  get cleaners() { return this._cleaners || [] }
  set cleaners(value) {
    if (Array.isArray(value))
      this._cleaners = value.filter(fn => typeof fn === 'function')
    else if (typeof value === 'function')
      this._cleaners = [value]
    else
      console.warn(`Cleaners must be functions, not ${typeof value}`)
  }

  get renderers() { return this._renderers }
  set renderers(value) {
    if (Array.isArray(value))
      this._renderers = value.filter(fn => typeof fn === 'function')
    else if (typeof value === 'function')
      this._renderers = [value]
    else
      console.warn(`Renderers must be functions, not ${typeof value}`)
  }

  get aliases() { return difference(this._aliases, [this.slug]) }
  set aliases(aliases) { this._aliases = slugify(aliases) }

  get html() { return this._html }
  set html(html) {
    if (typeof html !== 'string')
      return console.warn(`Article HTML must be set with a string value, not ${typeof html}`)

    this._renderedHTML = undefined
    this._html = runAll(this.cleaners, html)
  }

  get cleansedHTML() { return this.html }
  get renderedHTML() {
    if (this._renderedHTML !== undefined)
      return this._renderedHTML

    return this._renderedHTML = runAll(this.renderers, this.html)
  }

  get slug() { return this._slug || '' }
  set slug(slug) { this._slug = slugify(slug) }

  get tags() { return difference(this._tags, [this.slug]) }
  set tags(tags) { this._tags = slugify(tags) }

}

function runAll(functions, input) {
  let output = input
  functions.forEach(fn => {
    const result = fn(output)
    if (result !== undefined) output = result
  })
  return output
}
function slugify(slugs) {
  if (typeof slugs === 'string')
    return Slug.normalize(slugs)
  else if (Array.isArray(slugs))
    return flow(
      map(Slug.normalize),
      uniq(),
      orderBy(),
      difference([''])
    )(slugs)
  else
    return ''
}
