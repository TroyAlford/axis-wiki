import Article from './Article'
import Config from './Config'
import fs from 'fs'
import path from 'path'
import utils from 'fs-utils'
import { defaults, values } from 'lodash'

function getUrls(slug, userId = null) {
  const folderPath = userId !== null
    ? path.resolve(Config.folders.users, userId, slug)
    : path.resolve(Config.folders.articles, slug)

  return {
    meta:  `${folderPath}.json`,
    html:  `${folderPath}.html`,
    sheet: `${folderPath}.sheet`,
  }
}

export function deleteArticle(slug, userId = null) {
  const urls = getUrls(slug, userId)

  values(urls).forEach(filename => {
    if (utils.exists(filename)) {
      console.warn(`Deleting: ${filename}`)
      fs.unlinkSync(filename, { force: true })
    }
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
  utils.writeFileSync(urls.meta, JSON.stringify(clean.meta))
  utils.writeFileSync(urls.html, clean.html)

  return true
}


export function deleteSheet(slug, userId = null) {
  const filename = getUrls(slug, userId).sheet

  if (utils.exists(filename)) {
    console.warn(`Deleting: ${filename}`)
    fs.unlinkSync(filename, { force: true })
  }

  return true
}

export function getSheet(slug, userId = null) {
  const urls = getUrls(slug, userId)

  return utils.exists(urls.sheet)
    ? utils.readJSONSync(urls.sheet) : undefined
}

export function saveSheet(slug, sheet, userId = null) {
  const urls = getUrls(slug, userId)

  utils.writeFileSync(urls.sheet, JSON.stringify(sheet))

  return true
}
