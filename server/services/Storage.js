import path from 'path'
import utils from 'fs-utils'
import Article from './Article'
import Config from './Config'
import { defaults } from 'lodash'

function getUrls(slug, userId = null) {
  const folderPath = userId !== null
    ? path.resolve(Config.folders.users, userId, slug)
    : path.resolve(Config.folders.articles, slug)

  return {
    meta: `${folderPath}.json`,
    html: `${folderPath}.html`,
  }
}

export function deleteArticle(slug) {
  const urls = getUrls(slug, userId)
  [urls.meta, urls.html].forEach(filename => {
    if (utils.exists(filename))
      fs.unlinkSync(filename, { force: true })
  })

  return true
}

export function getArticle(slug, userId = null) {
  const urls = getUrls(slug, userId)

  const meta = utils.exists(urls.meta)
    ? utils.readJSONSync(urls.meta) : undefined

  const html = utils.exists(urls.html)
    ? utils.readFileSync(urls.html) : ''

  return (new Article(slug, html, meta))
}

export function saveArticle(slug, article, userId = null) {
  if (!(article instanceof Article)) return false

  const urls = getUrls(slug, userId)

  const clean = article.clean
  utils.writeJSONSync(urls.meta, clean.meta)
  utils.writeFileSync(urls.html, clean.html)

  return true
}
