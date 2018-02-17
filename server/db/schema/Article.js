import $ from 'cheerio'
import fs from 'fs-extra'
import path from 'path'
import url from 'url'
import utils from 'fs-utils'
import { html_beautify as beautify } from 'js-beautify'
import Document from '../../camo/document'
import config from '../../../config/server'
import unique from '../../../utility/unique'
import { extractSlug } from '../../../utility/Slugs'

import cleaners from './cleaners'

const BEAUTIFY_OPTIONS = {
  end_with_newline: true,
  indent_size: 2,
  indent_char: ' ',
  preserve_newlines: false,
  wrap_line_length: 0,
}

function getFilePaths(slug) {
  const folderPath = path.resolve(config.folders.articles, slug)

  return {
    html: `${folderPath}.html`,
    json: `${folderPath}.json`,
  }
}

export default class Article extends Document {
  /* eslint-disable no-underscore-dangle, no-console */
  constructor() {
    super()
    this._initialLoad = false

    this.schema({
      slug: String,
      html: String,
      aliases: [String],
      data: Object,
      tags: [String],
      title: String,

      // Auto-Calculated Properties
      links: [String],
      missing: [String],
    })
  }

  parseLinks() {
    const $parser = $.load(this.html, { xmlMode: true, decodeEntities: false })
    const links = []

    $parser('a').each((index, element) => {
      const $link = $parser(element)
      const href = $link.attr('href') || ''
      const slug = extractSlug(href)
      const parsedUrl = url.parse(href)

      const isInternal = !parsedUrl.hostname
      if (isInternal) {
        if (slug.match(/\.(gif|jpg|png)$/)) {
          $link.attr('href', `/media/${slug}`)
        } else {
          $link.attr('href', `/page/${slug}`)
        }
        links.push(slug)
      } else {
        $link.attr('target', '_new').addClass('external')
      }

      if (this.missing.includes(slug)) {
        $link.addClass('missing')
      }
    })

    this.html = $parser.html()
    this.links = unique(links)
  }

  static findMissingLinks(links) {
    return Article.find({ slug: { $in: links } })
      .then(articles => articles.map(({ slug }) => slug))
      .then(slugs => unique(links).filter(link => slugs.indexOf(link) === -1))
  }

  static transclude(html) {
    const $parser = $.load(html, { xmlMode: true, decodeEntities: false })
    const links = []
    const missing = []

    return Promise.all($parser('include').map((index, includeEl) => {
      const $include = $parser(includeEl)
      $include.attr('class', [
        $include.attr('class') || '',
        'noedit',
      ].filter(Boolean).join(' '))

      const lines = []
      const from = $include.attr('from')
      links.push(from)

      return Article.findOne({ slug: from }).then((article) => {
        if (!article) {
          $include.html(`\n<div class="warning">Transcluded Article '${from}' does not exist</div>\n`)
          links.push(from)
          missing.push(from)
          return Promise.resolve()
        }

        const $article = $.load(article.html, { xmlMode: true, decodeEntities: false })

        const sections = $include.attr('sections')
        if (sections === '*' || !sections) {
          lines.push($article.html())
        } else {
          sections.split(',').map(s => s.trim()).filter(Boolean)
            .forEach((section) => {
              $article(`#${section}`).each((ix, sectionEl) => {
                lines.push($.html(sectionEl))
              })
            })
        }

        const rendered = ['', ...lines.map(line => `  ${line}`), ''].join('\n')
        return Article.transclude(rendered).then((transcluded) => {
          $include.html(transcluded.html)
          links.push(...transcluded.links)
          missing.push(...transcluded.missing)
          return Promise.resolve()
        })
      })
    }).get())
      .then(() => ({
        html: $parser.html(),
        links: unique(links),
        missing: unique(missing),
      }))
  }

  static render = async (slug) => {
    const found = await Article.findOne({ $or: [{ slug }, { aliases: slug }] })
    const article = found || Article.create({ _id: slug, slug })

    const transcluded = await Article.transclude(article.html || '')
    const links = [...article.links, ...transcluded.links]
    const missing = await Article.findMissingLinks(links)

    Object.assign(article, {
      children: await Article.find({ tags: article.slug })
        .then(all => (all.map(({ slug: s, title }) => ({ slug: s, title })))),
      html: beautify(transcluded.html, BEAUTIFY_OPTIONS),
      links,
      missing,
    })

    article.parseLinks()
    return article
  }

  static reloadAll = async () => {
    const files = fs.readdirSync(config.folders.articles)
    const htmlFiles = files.filter(name => name.endsWith('.html'))

    const articles = htmlFiles.map((filename) => {
      const slug = filename.replace(/\.html$/, '')
      const paths = getFilePaths(slug)
      const html = utils.readFileSync(paths.html)
      const json = utils.readJSONSync(paths.json)
      const { aliases, data, tags, title } = json

      return Article.create({
        _initialLoad: true,

        _id: slug,
        slug,
        html,
        aliases,
        data,
        tags,
        title,
      })
    })

    Promise.all(articles.map(a => a.save())).then((promises) => {
      console.log(` ~> DB:LOADED: ${promises.length} article(s)`)
    })
  }

  postDelete() { this.deleteFromDisk() }
  deleteFromDisk() {
    const paths = getFilePaths(this.slug)
    Promise.all([fs.unlink(paths.html), fs.unlink(paths.json)])
      .catch((error) => {
        if (error.code === 'ENOENT') return undefined
        return console.log(` ✖  Article ${this._id} deletion threw error:`, error)
      })
      .then(console.log(` ✖  Article ${this._id} deleted`))
  }

  preSave() { this.parseLinks() }
  postSave() { this.saveToDisk() }

  saveToDisk() {
    if (this._initialLoad) return

    console.log(` 💾: Article ${this._id} updated`)

    const paths = getFilePaths(this.slug)
    const clean = cleaners.reduce((a, cleaner) => cleaner(a), this)
    fs.writeFileSync(paths.html, beautify(clean.html, BEAUTIFY_OPTIONS))
    fs.writeJSONSync(paths.json, {
      aliases: clean.aliases,
      data: clean.data,
      tags: clean.tags,
      title: clean.title,
    })
  }
}
