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
      const parsedUrl = url.parse(href)

      const isInternal = !parsedUrl.hostname
      if (isInternal) {
        const slug = extractSlug(href)
        if (slug.match(/\.(gif|jpg|png)$/)) {
          $link.attr('href', `/media/${slug}`)
        } else {
          $link.attr('href', `/page/${slug}`)
        }
        links.push(slug)
      } else {
        $link.attr('target', '_new').addClass('external')
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
          $include.html(`\n<!-- Article '${from}' does not exist -->\n`)
          links.push(from)
          missing.push(from)
          return Promise.resolve()
        }

        const $article = $.load(article.html, { xmlMode: true })
        lines.push(`<!-- Transcluded from '${from}'. To edit, change the original article. -->`)

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

  static render = slug => (
    Article
      .findOne({ $or: [{ slug }, { aliases: slug }] })
      .then((article) => {
        // eslint-disable-next-line no-param-reassign
        if (!article) article = Article.create({ _id: slug, slug })
        return Promise.all([
          Promise.resolve(article),
          Article.findMissingLinks(article.links || []),
          Article.transclude(article.html || ''),
          Article.find({ tags: article.slug }).then(all => (
            all.map(({ slug: s, title }) => ({ slug: s, title }))
          )),
        ])
      })
      .then(([article, missingLinks, transcluded, children]) => ({
        aliases: article.aliases,
        data: article.data,
        slug: article.slug,
        tags: article.tags,
        title: article.title,
        html: beautify(transcluded.html, BEAUTIFY_OPTIONS),
        links: [...article.links, ...transcluded.links],
        missing: [...missingLinks, ...transcluded.missing],
        children,
      }))
      .catch((error) => {
        console.log(` ~> ERROR: Article.render(${slug}) failed:`, error)
        return Promise.reject()
      })
  )

  static reloadAll = () => {
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
        console.log(` ~> DB:LOADED: ${count} article(s)`)
      }),
    ]

    steps.reduce((promise, fn) => promise.then(fn), Promise.resolve())
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
