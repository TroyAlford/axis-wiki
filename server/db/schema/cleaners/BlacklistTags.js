import $ from 'cheerio'

const defaults = [
  'script', 'style',
]

export default function (article = { html: '' }, tags = defaults) {
  if (!article || !article.html || !Array.isArray(tags)) { return article }

  const blacklist = tags.filter(tag => typeof tag === 'string')
  const $parser = $.load(article.html || '', { xmlMode: true, decodeEntities: false })

  blacklist.forEach(tag => $parser(tag).remove())
  article.html = $parser.html()

  return article
}
