// Links File Example:
// 'elf': {
//   exists: true,
//   to:   ['human', 'orc', 'dwarf'],      // articles which this article has a link to
//   from: ['many', 'other', 'articles'],  // articles which link to this article
//   alias_for: 'elf-race',                // this form is for entries which are redirects
//   aliases: ['elven', 'elves', 'elvish'] // this form is for articles which have other names
// }
// Note: If both alias_for and aliases is included, the redirect chain will work
// - but the other fields are irrelevant.

import { difference, intersection, union } from 'lodash'

import fs from 'fs'
import path from 'path'
import utils from 'fs-utils'

import config from '../../config/server'
import { slugify } from '../../utility/Slugs'
import * as Storage from './Storage'

const THROTTLE = config.cleanup.throttle

class Links {
  constructor() {
    this.links = {}

    this.get = this.get.bind(this)
    this.resolve = this.resolve.bind(this)

    this.cleanse = this.cleanse.bind(this)
    this.rebuild = this.rebuild.bind(this)
    this.reload = this.reload.bind(this)

    this.reindexHTML = this.reindexHTML.bind(this)
    this.reindexJSON = this.reindexJSON.bind(this)
    this.unindexHTML = this.unindexHTML.bind(this)
    this.unindexJSON = this.unindexJSON.bind(this)

    this.folders = config.folders
    this.files = { links: path.resolve(this.folders.metadata, 'links.json') }

    setTimeout(this.rebuild, 0)
  }

  static get DEFAULT_NODE() {
    return {
      exists:  false,
      to:      [],
      from:    [],
      aliases: [],
    }
  }

  get(slug) {
    return this.links[this.resolve(slug)]
  }
  resolve(slug) {
    const norm = slugify(slug)
    const link = this.links[norm]

    if (link && link.alias_for && link.alias_for === norm) delete link.alias_for
    return (link && link.alias_for) ? this.resolve(link.alias_for) : norm
  }

  cleanse() {
    if (this.last_cleanse && (Date.now() - this.last_cleanse < THROTTLE)) {
      clearTimeout(this.cleanse_queued) // Clear any already queued cleansing, ...
      this.cleanse_queued = setTimeout(this.cleanse, THROTTLE) // ... and enqueue again ...
      return // ... then stop processing.
    }

    this.last_cleanse = Date.now() // Update the last cleansed time.
    this.cleanse_queued = null     // This should be the queued cleanse, so clear the timer.

    Object.keys(this.links).forEach((slug) => {
      const link = Object.assign(Links.DEFAULT_NODE, this.links[slug])
      if (link && link.alias_for === slug) delete link.alias_for
      if (!link.exists && !link.to.length && !link.from.length && !link.aliases.length && !link.alias_for) {
        delete this.links[slug]
      }
    })
  }
  reindexHTML(slug) {
    console.log(`${slug} changed: reindexing links.`)
    this.links[slug] = this.links[slug] || Links.DEFAULT_NODE

    const article = Storage.getArticle(slug).clean

    const existing = this.links[slug].to
    const updated = article.links_to
    const inBoth = intersection(existing, updated)
    const toDrop = difference(existing, inBoth)
    const toAdd = difference(updated, inBoth)

    toDrop.forEach((drop) => { this.links[drop].from = difference(this.links[drop].from, [slug]) })
    toAdd.forEach((add) => {
      if (!this.links[add]) this.links[add] = Links.DEFAULT_NODE
      this.links[add].from = union(this.links[add].from, [slug])
    })

    this.links[slug].exists = true
    this.links[slug].to = updated

    setTimeout(this.cleanse, THROTTLE)
  }
  reindexJSON(slug) {
    console.log(`${slug} changed: reindexing aliases.`)

    const article = Storage.getArticle(slug).clean

    this.links[slug] = {
      ...Links.DEFAULT_NODE,
      ...this.links[slug],
      title: article.title || slug,
    }
    const existing = this.links[slug].aliases
    const updated = article.aliases
    const inBoth = intersection(existing, updated)
    const toDrop = difference(existing, inBoth)
    const toAdd = difference(updated, inBoth)

    toDrop.forEach((drop) => { delete this.links[drop].alias_for })
    toAdd.forEach((add) => {
      this.links[add] = {
        ...Links.DEFAULT_NODE,
        ...this.links[add],
      }
      if (add !== slug) this.links[add].alias_for = slug
    })

    this.links[slug].aliases = updated

    setTimeout(this.cleanse, THROTTLE)
  }
  unindexHTML(slug) {
    console.log(`${slug} removed: unindexing links.`)
    this.links[slug] = this.links[slug] || Links.DEFAULT_NODE
    const existing = this.links[slug].to

    this.links[slug].exists = false
    this.links[slug].to = []
    existing.forEach((link) => {
      this.links[link].from = difference(this.links[link].from, [slug])
    })

    setTimeout(this.cleanse, THROTTLE)
  }
  unindexJSON(slug) {
    console.log(`${slug} removed: unindexing aliases.`)
    let existing = this.links[slug].aliases

    this.links[slug].aliases = []
    existing.forEach((link) => {
      if (this.links[link].alias_for === slug) {
        delete this.links[link].alias_for
      }
    })

    setTimeout(this.cleanse, THROTTLE)
  }

  rebuild() {
    const rebuilt = {}
    if (!utils.isDir(this.folders.articles)) {
      console.error(`${this.folders.articles} is not a valid directory.`)
      return
    }
    fs.readdirSync(this.folders.articles)
      .filter(name => name.endsWith('.html'))
      .forEach((file) => {
        const slug = file.replace(/.html/, '')
        const article = Storage.getArticle(slug).rendered

        // This article exists, because it was listed above. Create it.
        rebuilt[slug] = {
          ...Links.DEFAULT_NODE,
          ...rebuilt[slug] || {},
          ...{
            aliases: article.aliases,
            exists:  true,
            title:   article.title,
            to:      article.links_to,
          },
        }

        // Now parse all `links_to` and add this slug to each entry.
        article.links_to.forEach((link) => {
          rebuilt[link] = {
            ...Links.DEFAULT_NODE,
            ...rebuilt[link] || {},
          }
          rebuilt[link].from = union(rebuilt[link].from, [slug])
        })

        article.aliases.forEach((alias) => {
          rebuilt[alias] = {
            ...Links.DEFAULT_NODE,
            ...rebuilt[alias] || {},
          }
          if (alias !== slug) {
            rebuilt[alias].alias_for = slug
          }
        })
      })

    this.links = rebuilt

    setTimeout(this.cleanse, THROTTLE)
  }
  reload() {
    this.links = utils.exists(this.files.links) ? utils.readJSONSync(this.files.links) : {}
  }
}

const Singleton = new Links()
export default Singleton
