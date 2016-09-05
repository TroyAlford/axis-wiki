import $ from 'cheerio'
import { orderBy, uniq } from 'lodash'
import { folders } from '../Config'
import { Url, Extract } from '../../../utility/Slugs'
import path from 'path'
import url from 'url'
import utils from 'fs-utils'

export default function(html, article) {
  const $parser = $.load(html)

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

  if (typeof article === 'object') {
    article.links_to = orderBy(uniq(links_to))
    article.missing_links = orderBy(uniq(missing_links))
  }
  return $parser.html()
}

function articleExists(slug) {
  const filePath = path.join(folders.articles, `${slug}.html`)
  return utils.exists(filePath)
}
function mediaExists(filename) {
  const filePath = path.join(folders.media, filename)
  return utils.exists(filePath)
}
