import cookieParser from 'cookie-parser'
import express      from 'express'
import fs           from 'fs'
import http         from 'http'
import mkdirp       from 'mkdirp'
import path         from 'path'
import request      from 'request'
import url          from 'url'

import Config       from './services/Config'
import Facebook     from './middleware/Facebook'
import NoAnonymous  from './middleware/NoAnonymous'
import Watcher      from './services/Watcher'

import api_article  from './modules/article'
import api_by       from './modules/by'
import api_config   from './modules/config'
import api_my       from './modules/my'
import api_search   from './modules/search'

import module_media from './modules/media'

Watcher.watch()
const bindStatic = folder => express.static(path.join(__dirname, folder))

var app = express()
  .use(cookieParser())

  /* Non-Static Routes */
  .use('/api/page',   Facebook, api_article)
  .use('/api/by',     Facebook, api_by)
  .use('/api/config', Facebook, api_config)
  .use('/api/my',     Facebook, NoAnonymous, api_my)
  .use('/api/search', Facebook, api_search)

  /* Non-Static Content Routes */
  .use('/media',      Facebook, module_media)

  /* Static Content Routes */
  .use('/css',    bindStatic('../build/css'))
  .use('/js',     bindStatic('../build/js'))
  .use('/font',   bindStatic('../fontello/font'))
  .use('/images', bindStatic('../images'))

  .get('*', Facebook, (req, res) => {
    fs.createReadStream(path.join(__dirname, '../source/index.html'))
      .pipe(res)
  })

  .listen(Config.settings.server.port, () => {
    console.log(`Express server running on port ${Config.settings.server.port}`)
  })
;
