import fs from 'fs-extra'
import path from 'path'
import utils from 'fs-utils'
import { Document } from 'camo'
import config from '../../../config/server'

function getFilePaths(slug) {
  const folderPath = path.resolve(config.folders.articles, slug)

  return {
    html: `${folderPath}.html`,
    json: `${folderPath}.json`,
  }
}

export default class Article extends Document {
  constructor() {
    super()
    this.schema({
      slug:    String,
      title:   String,
      html:    String,
      aliases: [String],
      data:    Object,
      tags:    [String],
    })
  }

  static collectionName = () => 'articles';

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

            return Article.create({ _id: slug, slug, html, aliases, data, tags, title }).save()
          })
      ),
      () => Article.count().then((count) => {
        console.log(` ~~> DB:LOADED: ${count} articles.`)
      }),
    ]

    steps.reduce((promise, fn) => promise.then(fn), Promise.resolve())
  }
}
