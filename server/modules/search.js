import capitalize  from 'lodash/capitalize'
import last        from 'lodash/last'
import sortBy      from 'lodash/sortBy'

import $           from 'cheerio'
import express     from 'express'
import utils       from 'fs-utils'

import grep        from '../helpers/grep'
import Config      from '../services/Config'

const { folders } = Config

let search = module.exports = express()
  .get('/:search_term', async (request, response) => {
    let search_term = encode(request.params.search_term).toLowerCase();

    let output = [
       ... await getContentMatches(search_term)
    ].filter(result => result) // Only return truthy results

    output = sortBy(output.map(entry =>
      entry.file.match(/.html^/) ? entry : {
        file: `${entry.file.replace('.html', '')}`,
        image:   entry.image,
        results: entry.results,
        title:   entry.title || entry.file,
        type:    entry.type
      }
    ), ['title']);
    response.status(200).send(JSON.stringify(output))
  })
;

async function getContentMatches(search_term) {
  return grep(search_term, folders.articles, { ext: 'html' })
    .then(list =>
      list.map(hit => {
        let name = last(hit.file.split('/')).replace(/\.html$/g, ''),
            html = utils.readFileSync(hit.file),
           $html = $(html || '')

        let results = hit.results.map(result => {
          let text = $(result.text).text();
          if (!text.toLowerCase().indexOf(search_term))
            return null;

          return Object.assign(result, {
            text: $(result.text).text()
          })
        }).filter(result => !!result) // Only truthy results

        return {
          title: $html.find('h1,h2,h3,h4,h5,h6').first().text() || capitalize(name),
          file:  name,
          image: $html.find('img').first().attr('src'),
          results,
          type: 'article:content'
        }
      }).filter(hit => hit.results.length)
    )
  ;
}

const html_codes = {
  '&': '&amp;',
  "'": '&apos;',
  '"': '&quot;',
  '<': '&lt;',
  '>': '&gt;'
}
function encode(input) {
  let output = input

  Object.keys(html_codes).forEach(key => {
    const regex = new RegExp(`[${key}]`, 'g')
    output = output.replace(regex, html_codes[key])
  })

  return output
}
