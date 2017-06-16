import fs from 'fs-extra'
import path from 'path'
import utils from 'fs-utils'
import { Document } from 'camo'
import config from '../../../config/server'

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
    this._preventHooks = false

    this.schema({
      slug:    String,
      html:    String,
      aliases: [String],
      data:    Object,
      tags:    [String],
      title:   String,
    })
  }

  static collectionName = () => 'articles';

  postSave() {
    if (!this._preventHooks) {
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
  }

  static reloadAll = () => {
    /* eslint-disable no-console */
    console.log(' ~> DB:RELOADING: Articles')

    const steps = [
      () => Article.deleteMany().then((count) => {
        console.log(` ~~> DB:DUMPING: Articles (${count})`)
      }),
      () => Promise.all(
        fs.readdirSync(config.folders.articles)
          .filter(name => name.endsWith('.html'))
          .map((filename) => {
            const slug = filename.replace(/\.html$/, '')
            const paths = getFilePaths(slug)
            const html = utils.readFileSync(paths.html)
            const json = utils.readJSONSync(paths.json)
            const { aliases, data, tags, title } = json

            const article = Article.create({ _id: slug, slug, html, aliases, data, tags, title })
            article._preventHooks = true

            return article.save()
          })
      ),
      () => Article.count().then((count) => {
        console.log(` ~~> DB:LOADED: ${count} articles.`)
      }),
    ]

    steps.reduce((promise, fn) => promise.then(fn), Promise.resolve())
  }
}
