import $ from 'cheerio'
import { difference, flatten, flow, keys, uniq } from 'lodash'

const defaults = {
  'a': ['href'],
  'include': ['from', 'sections'],
}

export default function(article = { html: '' }, whitelist = defaults) {
  if (!article || !article.html || !whitelist)
    return article

  const $parser = $.load(article.html)

  keys(whitelist).forEach(tag => flow([
    tag => $parser(tag).get(),
    els => els.map(el => keys(el.attribs)),
    flatten, uniq,
    found => difference(found, whitelist[tag]),
    blacklist => blacklist.forEach(attr => $parser(tag).removeAttr(attr)),
  ])(tag))
  article.html = $parser.html()

  return article
}
