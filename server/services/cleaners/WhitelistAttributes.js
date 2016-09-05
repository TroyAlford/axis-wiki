import $ from 'cheerio'
import { difference, flatten, flow, keys, uniq } from 'lodash'

const defaultWhitelist = {
  'a': ['href'],
  'include': ['class', 'from', 'sections'],
}

export default (html, whitelist = defaultWhitelist) => {
  const $parser = $.load(html)

  keys(whitelist).forEach(tag => flow([
    tag => $parser(tag).get(),
    els => els.map(el => keys(el.attribs)),
    flatten, uniq,
    found => difference(found, whitelist[tag]),
    blacklist => blacklist.forEach(attr => $parser(tag).removeAttr(attr)),
  ])(tag))

  return $parser.html()
}
