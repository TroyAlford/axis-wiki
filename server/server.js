import cookieParser from 'cookie-parser'
import express      from 'express'
import fs           from 'fs'
import http         from 'http'
import mkdirp       from 'mkdirp'
import path         from 'path'
import request      from 'request'
import url          from 'url'

import Facebook     from './middleware/Facebook'
import Config       from './services/Config'
import Watcher      from './services/Watcher'

import article_api from './modules/article'
import config_api  from './modules/config'
import my_api      from './modules/my'
import search_api  from './modules/search'

import media_mod   from './modules/media'

Watcher.watch()

var app = express()
app.use(cookieParser())

/* Non-Static Routes */
app.use('/api/page',   Facebook, article_api)
app.use('/api/config', Facebook, config_api)
app.use('/api/my',     Facebook, my_api)
app.use('/api/search', Facebook, search_api)

app.use('/media',      Facebook, media_mod)

/* Static Content Routes */
const bindStatic = folder => express.static(path.join(__dirname, folder))
app.use('/css',    bindStatic('../build/css'))
app.use('/js',     bindStatic('../build/js'))
app.use('/font',   bindStatic('../fontello/font'))
app.use('/images', bindStatic('../images'))

app.get('*', Facebook, (req, res) => {
  fs.createReadStream(path.join(__dirname, '../source/index.html'))
    .pipe(res)
})

app.listen(Config.settings.server.port, () => {
  console.log(`Express server running on port ${Config.settings.server.port}`)
});