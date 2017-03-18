import fs from 'fs'
import path from 'path'
import utils from 'fs-utils'

import Article from './Article'
import config from '../../config/server'

function getUrls(slug) {
  const folderPath = path.resolve(config.folders.articles, slug)

  return {
    html: `${folderPath}.html`,
    json: `${folderPath}.json`,
  }
}

export function deleteArticle(slug) {
  const urls = getUrls(slug)

  Object.keys(urls).forEach((key) => {
    const filename = urls[key]
    if (utils.exists(filename)) {
      console.warn(`Deleting: ${filename}`)
      fs.unlinkSync(filename, { force: true })
    } else {
      console.warn(`Skipping: ${filename} - doesn't exist`)
    }
  })

  return true
}

export function getArticle(slug) {
  const urls = getUrls(slug)

  const meta = utils.exists(urls.json)
    ? utils.readJSONSync(urls.json) : undefined

  const html = utils.exists(urls.html)
    ? utils.readFileSync(urls.html) : ''

  return (new Article(slug, html, meta))
}

export function saveArticle(slug, article) {
  if (!(article instanceof Article)) return false

  const urls = getUrls(slug)

  const clean = article.clean
  utils.writeFileSync(urls.json, JSON.stringify(clean.meta))
  utils.writeFileSync(urls.html, clean.html)

  return true
}
