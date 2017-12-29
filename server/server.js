import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import path from 'path'
import utils from 'fs-utils'

import Database from './db/db'
import Facebook from './middleware/Facebook'
import NoCache from './middleware/NoCache'

import articleModule from './modules/article'
import byModule from './modules/by'
import configModule, { getNavigation } from './modules/config'
import mediaModule from './modules/media'
import monitorModule from './modules/monitor'
import myModule from './modules/my'
import profileModule from './modules/profile'
import searchModule from './modules/search'

import config from '../config/server'

const bindStatic = folder => express.static(path.join(__dirname, folder))

express()
  .use(compression())
  .use(cookieParser())
  .use(cors())
  .options('*', cors())

  /* Non-Static Routes */
  .use('/api/page', NoCache, Facebook, articleModule)
  .use('/api/by', NoCache, Facebook, byModule)
  .use('/api/config', NoCache, Facebook, configModule)
  .use('/api/monitor', NoCache, Facebook, monitorModule)
  .use('/api/my', NoCache, Facebook, myModule)
  .use('/api/profile', NoCache, Facebook, profileModule)
  .use('/api/search', NoCache, Facebook, searchModule)

  /* Non-Static Content Routes */
  .use('/media', NoCache, Facebook, mediaModule)

  /* Static Content Routes */
  .use('/favicon.png', bindStatic('../source/favicon.png'))
  .use('/css', bindStatic('../build/css'))
  .use('/js', bindStatic('../build/js'))
  .use('/font', bindStatic('../fontello/font'))
  .use('/images', bindStatic('../images'))

  .get('*', Facebook, (request, response) => {
    const user = request.session
    const initialState = { navigation: getNavigation(), user }

    const indexFile = path.join(__dirname, '../source/index.html')
    const html = utils.readFileSync(indexFile)
      .replace('#INITIAL_STATE#', JSON.stringify(initialState))

    response.status(200).send(html)
  })

  .listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`STARTUP: Express server running on port ${config.port}`)
  })

Database.startup()
process.on('exit', Database.shutdown)
process.on('SIGTERM', Database.shutdown)
