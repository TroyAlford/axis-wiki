import { defaultsDeep, flow, pick, startCase } from 'lodash'
import { extractSlug, slugify } from '../../utility/Slugs'
import unique from '../../utility/unique'

import cleaners from './cleaners'
import renderers from './renderers'

const ALIASES = Symbol('aliases')
const HTML = Symbol('html')
const SLUG = Symbol('slug')
const TAGS = Symbol('tags')
const TITLE = Symbol('title')

const CLEANERS = Symbol('cleaners')
const RENDERERS = Symbol('renderers')

export const DEFAULTS = {
  title: undefined,

  aliases: [],
  data:    [],
  tags:    [],

  cleaners,
  renderers,
}

function uniqueSlugs(slugs) {
  if (!Array.isArray(slugs)) return uniqueSlugs([slugs])

  return flow([
    slugify, unique,
    array => array.filter(item => item),
    Array.sort,
  ])(slugs)
}

export default class Article {
  /* eslint-disable no-console */
  constructor(slug, html = '', settings = {}) {
    this.settings = defaultsDeep({}, settings, DEFAULTS)

    this.slug = slug
    this.html = html

    this.cleaners = this.settings.cleaners
    this.renderers = this.settings.renderers

    this.title = this.settings.title
    this.aliases = this.settings.aliases
    this.data = this.settings.data
    this.tags = this.settings.tags
  }

  get cleaners() { return this[CLEANERS] || [] }
  set cleaners(value) {
    if (Array.isArray(value)) {
      this[CLEANERS] = value.filter(fn => typeof fn === 'function')
    } else if (typeof value === 'function') {
      this[CLEANERS] = [value]
    } else {
      console.warn(`Cleaners must be functions, not ${typeof value}`)
    }
  }

  get renderers() { return this[RENDERERS] }
  set renderers(value) {
    if (Array.isArray(value)) {
      this[RENDERERS] = value.filter(fn => typeof fn === 'function')
    } else if (typeof value === 'function') {
      this[RENDERERS] = [value]
    } else {
      console.warn(`Renderers must be functions, not ${typeof value}`)
    }
  }

  get aliases() { return this[ALIASES].filter(alias => alias !== this.slug) }
  set aliases(aliases) { this[ALIASES] = uniqueSlugs(aliases) }

  get html() { return this[HTML] }
  set html(html) {
    if (typeof html === 'string') {
      this[HTML] = html
    }
  }

  get title() { return this[TITLE] || startCase(this.slug) }
  set title(title) {
    if (typeof title === 'string') {
      this[TITLE] = title
    }
  }

  get slug() { return extractSlug(this[SLUG] || '') }
  set slug(slug) { this[SLUG] = extractSlug(slug) }

  get meta() {
    return pick(this, ['title', 'aliases', 'data', 'tags'])
  }

  set settings(value) {
    this.cleaners = value.cleaners
    this.renderers = value.renderers

    this.aliases = value.aliases || []
    this.data = value.data || []
    this.tags = value.tags || []
    this.title = value.title || startCase(this.slug)
  }
  get settings() {
    return {
      cleaners:  this.cleaners,
      renderers: this.renderers,

      aliases: this.aliases,
      data:    this.data,
      tags:    this.tags,
      title:   this.title,
    }
  }

  get clean() {
    const article = new Article(this.slug, this.html, this.settings)
    return this.runAll(this.cleaners, article)
  }
  get rendered() {
    return this.runAll(this.renderers, this.clean)
  }

  get tags() { return this[TAGS].filter(tag => tag !== this.slug) }
  set tags(tags) { this[TAGS] = uniqueSlugs(tags) }

  runAll(functions, ...args) {
    return flow(functions).apply(this, args)
  }
}
