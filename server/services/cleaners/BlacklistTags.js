import $ from 'cheerio'
import { filter } from 'lodash'

const defaults = [
  'script', 'style',
]

export default function(article = { html: '' }, tags = defaults) {
  if (!article || !article.html || !Array.isArray(tags))
    return article

  const blacklist = filter(tags, tag => typeof tag === 'string')
  const $parser = $.load(article.html || '')

  blacklist.forEach(tag => $parser(tag).remove())
  article.html = $parser.html()

  return article
}
