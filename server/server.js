import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import path from 'path'
import utils from 'fs-utils'

import Facebook from './middleware/Facebook'
import Profile from './services/Profile'
import Watcher from './services/Watcher'

import articleModule from './modules/article'
import byModule from './modules/by'
import configModule, { getNavigation } from './modules/config'
import mediaModule from './modules/media'
import monitorModule from './modules/monitor'
import myModule from './modules/my'
import searchModule from './modules/search'

import config from '../config/server'

Watcher.watch()
const bindStatic = folder => express.static(path.join(__dirname, folder))

express()
  .use(compression())
  .use(cookieParser())
  .use(cors())
  .options('*', cors())

  /* Non-Static Routes */
  .use('/api/page', Facebook, articleModule)
  .use('/api/by', Facebook, byModule)
  .use('/api/config', Facebook, configModule)
  .use('/api/monitor', Facebook, monitorModule)
  .use('/api/my', Facebook, myModule)
  .use('/api/search', Facebook, searchModule)

  /* Non-Static Content Routes */
  .use('/media', Facebook, mediaModule)

  /* Static Content Routes */
  .use('/favicon.png', bindStatic('../source/favicon.png'))
  .use('/css', bindStatic('../build/css'))
  .use('/js', bindStatic('../build/js'))
  .use('/font', bindStatic('../fontello/font'))
  .use('/images', bindStatic('../images'))

  .get('*', Facebook, (request, response) => {
    const profile = request.session.id
      ? Profile.load(request.session.id)
      : { ...Profile.default, anonymous: true }

    const initialState = {
      navigation: getNavigation(),
      user:       profile,
    }

    const indexFile = path.join(__dirname, '../source/index.html')
    const html = utils.readFileSync(indexFile)
                    .replace('#INITIAL_STATE#', JSON.stringify(initialState))

    response.status(200).send(html)
  })

  .listen(config.port, () => {
    console.log(`Express server running on port ${config.port}`) // eslint-disable-line no-console
  })
