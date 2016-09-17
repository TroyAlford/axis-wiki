import $ from 'cheerio'
import { Slug } from '../../../utility/Slugs'

export default function(article = { html: '' }) {
  if (!article || !article.html)
    return article

  const $parser = $.load(article.html)
  $parser('include').each((index, element) => {
    const $include = $parser(element)

    $include.html('') // Remove contents

    let from = $include.attr('from') || ''
    if (!from) // Invalid from attr = remove include entirely
      return $include.remove()

    from = Slug(from)
    $include.attr('from', from)

    let sections = $include.attr('sections') || '*'
    if (sections !== '*')
      sections = Slug(sections.split(','))
                  .filter(s => !!s) // Eliminate blank sections
                  .join(',')

    $include.attr('sections', sections)
  })

  article.html = $parser.html()

  return article
}
