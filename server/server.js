import compression  from 'compression'
import cookieParser from 'cookie-parser'
import express      from 'express'
import http         from 'http'
import mkdirp       from 'mkdirp'
import path         from 'path'
import url          from 'url'
import utils        from 'fs-utils'

import Config       from './services/Config'
import Facebook     from './middleware/Facebook'
import Profile      from './services/Profile'
import NoAnonymous  from './middleware/NoAnonymous'
import Watcher      from './services/Watcher'

import api_article  from './modules/article'
import api_by       from './modules/by'
import { default as api_config, getNavigation } from './modules/config'
import api_my       from './modules/my'
import api_search   from './modules/search'

import module_media from './modules/media'

Watcher.watch()
const bindStatic = folder => express.static(path.join(__dirname, folder))

var app = express()
  .use(compression())
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

  .get('*', Facebook, (request, response) => {
    const profile = request.session.id
      ? Profile.load(request.session.id)
      : Profile.default

    const initialState = {
      navigation: getNavigation(),
      user: profile,
    }

    const indexFile = path.join(__dirname, '../source/index.html')
    let html = utils.readFileSync(indexFile)
                    .replace('#INITIAL_STATE#', JSON.stringify(initialState))

    response.status(200).send(html)
  })

  .listen(Config.settings.server.port, () => {
    console.log(`Express server running on port ${Config.settings.server.port}`)
  })
;
