import $ from 'cheerio'
import { filter } from 'lodash'

const defaultTags = [
  'script', 'style',
]

export default (html, tags = defaultTags) => {
  if (!Array.isArray(tags))
    return html

  const blacklist = filter(tags, tag => typeof tag === 'string')
  const $parser = $.load(html)

  blacklist.forEach(tag => $parser(tag).remove())

  return $parser.html()
}
