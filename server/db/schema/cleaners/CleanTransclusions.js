import $ from 'cheerio'
import { slugify } from '../../../../utility/Slugs'

export default function (article = { html: '' }) {
  if (!article || !article.html) return article

  const $parser = $.load(article.html, { xmlMode: true, decodeEntities: false })
  $parser('include').each((index, element) => {
    const $include = $parser(element)

    $include.html('') // Remove contents

    let from = $include.attr('from') || ''
    if (!from) { // Invalid from attr = remove include entirely
      return $include.remove()
    }

    from = slugify(from)
    $include.attr('from', from)

    let sections = $include.attr('sections') || '*'
    if (sections !== '*') {
      sections = slugify(sections.split(','))
        .filter(s => !!s) // Eliminate blank sections
        .join(',')
    }

    return $include.attr('sections', sections)
  })

  article.html = $parser.html()

  return article
}
