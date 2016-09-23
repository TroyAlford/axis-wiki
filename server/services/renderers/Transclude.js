import $ from 'cheerio'
import Config from '../Config'
import Links from '../Links'
import * as Storage from '../Storage'
import path from 'path'
import utils from 'fs-utils'
import { orderBy, uniq } from 'lodash'

export default function(article = { html: '' }) {
  const $parser = $.load(article.html)
  const links_to = [], missing_links = []

  $parser('include').each((index, element) => {
    const $include = $parser(element)
    $include.attr('class', 'noedit')

    let html = []
    const from = $include.attr('from')
    if (!articleExists(from)) {
      html.push(`<!-- Article '${from}' does not exist -->`)
      missing_links.push(from)
    } else {
      html.push(`<!-- Transcluded from '${from}'. To edit, change the original article. -->`)
      links_to.push(from)
    }

    const sections = $include.attr('sections')
    const $article = $.load(Storage.getArticle(from).html || '')
    if (sections === '*') {
      html.push($article.html())
    } else {
      sections.split(',').forEach(section => {
        $article(`#${section}`).each((index, element) => {
          html.push($.html(element))
        })
      })
    }

    $include.html('\n' + html.map(line => `  ${line}\n`).join(''))
  })

  article.html = $parser.html()
  article.links_to = orderBy(uniq([
    ...(article.links_to || []),
    ...links_to,
  ]))
  article.missing_links = orderBy(uniq([
    ...(article.missing_links || []),
    ...missing_links,
  ]))

  return article
}

function articleExists(requested_slug) {
  const slug = Links.resolve(requested_slug)
  const filePath = path.join(Config.folders.articles, `${slug}.html`)
  return utils.exists(filePath)
}
function mediaExists(filename) {
  const filePath = path.join(Config.folders.media, filename)
  return utils.exists(filePath)
}
