import $ from 'cheerio'
import { defaultsDeep, difference, flow, orderBy, uniq } from 'lodash'
import { Extract, Slug, Url } from '../../utility/Slugs'

import cleaners from './cleaners'
import renderers from './renderers'

const defaults = {
  aliases: [],
  data: [],
  tags: [],

  cleaners,
  renderers,
}

export default class Article {
  constructor(slug, html = '', settings = {}) {
    this.settings = defaultsDeep({}, settings, defaults)

    this.slug = slug
    this.html = html

    this.cleaners = this.settings.cleaners
    this.renderers = this.settings.renderers

    this.aliases = this.settings.aliases
    this.data = this.settings.data
    this.tags = this.settings.tags
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
  set aliases(aliases) { this._aliases = uniqueSlugs(aliases) }

  get html() { return this._html }
  set html(html) {
    if (typeof html !== 'string')
      return console.warn(`Article HTML must be set with a string value, not ${typeof html}`)

    if (html === this._html)
      return;
    else
      this._html = html
  }

  set settings(value) {
    this.cleaners = value.cleaners
    this.renderers = value.renderers

    this.aliases = value.aliases || []
    this.data = value.data || []
    this.tags = value.tags || []
  }
  get settings() {
    return {
      cleaners: this.cleaners,
      renderers: this.renderers,

      aliases: this.aliases,
      data: this.data,
      tags: this.tags,
    }
  }

  get clean() {
    const article = new Article(this.slug, this.html, this.settings)
    return this.runAll(this.cleaners, article)
  }
  get rendered() {
    return this.runAll(this.renderers, this.clean)
  }

  get slug() { return Extract(this._slug || '') }
  set slug(slug) { this._slug = Extract(slug) }

  get tags() { return difference(this._tags, [this.slug]) }
  set tags(tags) { this._tags = uniqueSlugs(tags) }

  runAll(functions, ...args) {
    return flow(functions).apply(this, args)
  }
}

function uniqueSlugs(slugs) {
  if (!Array.isArray(slugs))
    return uniqueSlugs([slugs])

  return flow([
    Slug, uniq,
    array => difference(array, ['']),
    orderBy,
  ])(slugs)
}
