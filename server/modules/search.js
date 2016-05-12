import _           from 'lodash'
import $           from 'cheerio'
import express     from 'express'
import fs          from 'fs'
import path        from 'path'
import utils       from 'fs-utils'

import grep        from '../helpers/grep'
import Config      from '../services/Config'

const { folders } = Config

let search = module.exports = express()
  .get('/:search_term', async (request, response) => {
    let search_term = decode(request.params.search_term);

    let output = [
       ... await getContentMatches(search_term)
    ].filter(result => result) // Only return truthy results

    output = _.sortBy(output.map(entry =>
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
  return grep(escape(search_term), folders.articles, { ext: 'html' })
    .then(list => 
      list.map(hit => {
        let name = _(hit.file).split('/').last().replace(/\.html$/g, ''),
            html = utils.readFileSync(hit.file),
           $html = $(html || '')

        return {
          title: $html.find('h1,h2,h3,h4,h5,h6').first().text() || _.capitalize(name),
          file:  name,
          image: $html.find('img').first().attr('src'),
          results: hit.results.map(result => Object.assign(result, {
            text: $(result.text).text()
          })).filter(result => 0 <= result.text.toLowerCase().indexOf(search_term.toLowerCase())),
          type: 'article:content'
        }
      }).filter(hit => hit.results.length)
    )
  ;
}

function decode(input) {
  return input
    .replace("'", '&apos;')
    .replace('"', '&quot;')
}
function escape(input) {
  return input
    .replace(/([&'";])/g, "\\$1")
}