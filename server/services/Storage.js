import path from 'path'
import utils from 'fs-utils'
import Article from './Article'
import Config from './Config'
import { defaults } from 'lodash'

export function getArticle(slug, userId = null) {
  const folderPath = userId !== null
    ? path.resolve(Config.folders.users, userId, slug)
    : path.resolve(Config.folders.articles, slug)

  const metaFilePath = `${folderPath}.json`
  const htmlFilePath = `${folderPath}.html`

  const meta = utils.exists(metaFilePath)
    ? utils.readJSONSync(metaFilePath) : undefined

  const html = utils.exists(htmlFilePath)
    ? utils.readFileSync(htmlFilePath) : ''

  return (new Article(slug, html, meta))
}
