import express     from 'express'
import grep        from 'simple-grep'
import path        from 'path'

import Config      from '../services/Config'

const { folders } = Config;

let search = module.exports = express()
  .get('/:search_term', (request, response) => {
    grep(request.params.search_term, path.join(folders.articles), list =>
      response.status(200).send(JSON.stringify(list))
    )
  })
;
