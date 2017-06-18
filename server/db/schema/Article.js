import $ from 'cheerio'
import fs from 'fs-extra'
import path from 'path'
import url from 'url'
import utils from 'fs-utils'
import { Document } from 'camo'
import config from '../../../config/server'
import unique from '../../../utility/unique'
import { extractSlug } from '../../../utility/Slugs'

import cleaners from '../../services/cleaners'

function getFilePaths(slug) {
  const folderPath = path.resolve(config.folders.articles, slug)

  return {
    html: `${folderPath}.html`,
    json: `${folderPath}.json`,
  }
}

export default class Article extends Document {
  /* eslint-disable no-underscore-dangle */
  constructor() {
    super()
    this._initialLoad = false

    this.schema({
      slug:    String,
      html:    String,
      aliases: [String],
      data:    Object,
      tags:    [String],
      title:   String,

      // Auto-Calculated Properties
      links:   [String],
      missing: [String],
    })
  }

  preSave() {
    this.parseLinks()
  }
  postSave() {
    this.persistToDisk()
  }

  parseLinks() {
    const $parser = $.load(this.html)
    const links = []

    $parser('a').each((index, element) => {
      const $link = $parser(element)
      const href = $link.attr('href') || ''
      const parsedUrl = url.parse(href)

      const isInternal = !parsedUrl.hostname
      if (isInternal) {
        const slug = extractSlug(href)
        links.push(slug)
      } else {
        $link.attr('target', '_new').addClass('external')
      }
    })

    this.links = unique(links)
  }

  persistToDisk() {
    if (this._initialLoad) return

    // eslint-disable-next-line no-console
    console.log(` 💾: Article ${this._id} updated`)

    const paths = getFilePaths(this.slug)
    const clean = cleaners.reduce((a, cleaner) => cleaner(a), this)
    fs.writeFileSync(paths.html(clean.html))
    fs.writeJSONSync(paths.json({
      aliases: clean.aliases,
      data:    clean.data,
      tags:    clean.tags,
      title:   clean.title,
    }))
  }

  static findMissingLinks(links) {
    return Article.find({ slug: { $in: links } }, { populate: ['slug'] })
                  .then(articles => articles.map(({ slug }) => slug))
                  .then(slugs => unique(links).filter(link => slugs.indexOf(link) === -1))
  }

  static transclude(html) {
    const $parser = $.load(html)
    const links = []
    const missing = []

    return Promise.all($parser('include').map((index, includeEl) => {
      const $include = $parser(includeEl)
      $include.attr('class', ($include.attr('class') || '').concat('noedit'))

      const lines = []
      const from = $include.attr('from')
      if (links.indexOf(from) === -1) links.push(from)

      return Article.findOne({ slug: from }).then((article) => {
        if (!article) {
          $include.html(`\n<!-- Article '${from}' does not exist -->`)
          if (missing.indexOf(from) === -1) missing.push(from)
          return
        }

        const $article = $.load(article.html)
        lines.push(`<!-- Transcluded from '${from}'. To edit, change the original article. -->`)

        const sections = $include.attr('sections') || ''
        if (sections === '*') {
          lines.push($article.html())
        } else {
          sections.split(',').map(s => s.trim()).filter(s => s)
            .forEach((section) => {
              $article(`#${section}`).each((ix, sectionEl) => {
                lines.push($.html(sectionEl))
              })
            })
        }

        const joined = ['', ...lines.map(line => `  ${line}`), ''].join('\n')
        $include.html(joined)
      })
    }).get())
    .then(() => ({ html: $parser.html(), links, missing }))
  }

  static reloadAll = () => {
    /* eslint-disable no-console */
    const steps = [
      () => Promise.all(
        fs.readdirSync(config.folders.articles)
          .filter(name => name.endsWith('.html'))
          .map((filename) => {
            const slug = filename.replace(/\.html$/, '')
            const paths = getFilePaths(slug)
            const html = utils.readFileSync(paths.html)
            const json = utils.readJSONSync(paths.json)
            const { aliases, data, tags, title } = json

            const article = Article.create({
              _initialLoad: true,

              _id: slug,
              slug,
              html,
              aliases,
              data,
              tags,
              title,
            })

            return article.save()
          })
      ),
      () => Article.count().then((count) => {
        console.log(` ~> DB:LOADED: ${count} articles.`)
      }),
    ]

    steps.reduce((promise, fn) => promise.then(fn), Promise.resolve())
  }

  static render = slug => (
    Article
    .findOne({ $or: [{ slug }, { aliases: slug }] })
    .then(article => Promise.all([
      Promise.resolve(article),
      Article.findMissingLinks(article.links),
      Article.transclude(article.html),
      Article.find({ tags: article.slug }).then(all =>
        all.map(({ slug: s, title }) => ({ slug: s, title }))
      ),
    ]))
    .then(([article, missingLinks, transcluded, children]) => ({
      aliases: article.aliases,
      data:    article.data,
      slug:    article.slug,
      tags:    article.tags,
      title:   article.title,
      html:    transcluded.html,
      links:   [...article.links, ...transcluded.links],
      missing: [...missingLinks, ...transcluded.missing],
      children,
    }))
  )
}
