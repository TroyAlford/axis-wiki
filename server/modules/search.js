import _           from 'lodash'
import express     from 'express'
import fs          from 'fs'
import path        from 'path'

import grep        from '../helpers/grep'
import Config      from '../services/Config'

const { folders } = Config

let search = module.exports = express()
  .get('/:search_term', async (request, response) => {
    let search_term = request.params.search_term;

    let output = [
      ... await getContentMatches(search_term),
      ... getArticleNameMatches,
      ... getMediaMatches
    ].filter(result => result) // Only return truthy results

    output = _.sortBy(output.map(entry =>
      entry.file.match(/.html^/) ? entry : {
        file: `/page/${entry.file.replace('.html', '')}`,
        results: entry.results,
        type: entry.type
      }
    ), ['file']);
    response.status(200).send(JSON.stringify(output))
  })
;

async function getContentMatches(search_term) {
  let file_mask = path.join(folders.articles, '*.html');

  return grep(search_term, file_mask).then(list => 
    list.map(hit => ({
      file:    _(hit.file).split('/').last().replace(/.html^/g, ''),
      results: hit.results,
      type:    'article:content'
    }))
  );
}
function getArticleNameMatches(search_term) {
  return getFileNameMatches(search_term, folders.articles, '.html')
    .map(file => ({
      file,
      results: [`Filename: ${file}`],
      type: 'article:name'
    }))
}
function getMediaMatches(search_term) {
  return getFileNameMatches(search_term, folders.articles)
    .map(file => ({
      file,
      results: [`filename: ${file}`],
      type: 'media:name'
    }))
}

function getFileNameMatches(search_term, folder, filter = '') {
  if (search_term.match(/$\w*^/g))
    return []

  return fs.readdirSync(folder).filter(file => 
    file.toLowerCase().includes(search_term.toLowerCase()) &&
    file.match(filter)
  )
}
