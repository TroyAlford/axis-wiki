import $ from 'cheerio'
import { orderBy, uniq } from 'lodash'
import config from '../../../config/server'
import Links from '../Links'
import { Url, Extract } from '../../../utility/Slugs'
import path from 'path'
import url from 'url'
import utils from 'fs-utils'

export default function(article = { html: '' }) {
  const $parser = $.load(article.html)

  const links_to = []
  const missing_links = []

  $parser('a').each((index, element) => {
    const $link = $parser(element)
    const parsedUrl = url.parse($link.attr('href') || '')
    const isExternal = !!parsedUrl.hostname
    if (isExternal)
      return $link.attr('target', '_new').addClass('external')

    // Internal Link
    const filename = Extract($link.attr('href') || '') || ''
    const isMedia = 0 <= filename.indexOf('.')

    const exists = isMedia ? mediaExists(filename) : articleExists(filename)
    const rootedPath = isMedia ? 'media' : 'page'

    $link.attr('href', `/${rootedPath}/${filename}`)
    if (!exists) {
      missing_links.push(filename)
      $link.addClass('missing')
    }

    links_to.push(filename)

    const href = Url($link.attr('href'))
  })

  article.html = $parser.html()
  if (typeof article === 'object') {
    article.links_to = orderBy(uniq(links_to))
    article.missing_links = orderBy(uniq(missing_links))
  }

  return article
}

function articleExists(requested_slug) {
  const slug = Links.resolve(requested_slug)
  const filePath = path.join(config.folders.articles, `${slug}.html`)
  return utils.exists(filePath)
}
function mediaExists(filename) {
  const filePath = path.join(config.folders.media, filename)
  return utils.exists(filePath)
}
