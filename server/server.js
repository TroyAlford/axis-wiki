import _            from 'lodash';
import cookieParser from 'cookie-parser'
import express      from 'express';
import fs           from 'fs';
import http         from 'http';
import mkdirp       from 'mkdirp';
import path         from 'path';
import request      from 'request';
import url          from 'url';

import Facebook     from './middleware/Facebook'
import Config  	    from './services/Config'
import Watcher      from './services/Watcher'

var apis    = {
  article: require('./modules/article'),
  config:  require('./modules/config'),
  my:      require('./modules/my'),
  search:  require('./modules/search')
}
var modules = {
  media:   require('./modules/media')
}

Watcher.watch();

var app = express();

app.use(cookieParser());

/* Non-Static Routes */
app.use('/api/page',   Facebook, apis.article);
app.use('/api/config', Facebook, apis.config);
app.use('/api/my',     Facebook, apis.my);
app.use('/api/search', Facebook, apis.search);

app.use('/media',      Facebook, modules.media);

/* Static Content Routes */
app.use('/css',    express.static(path.join(__dirname, '../build/css')));
app.use('/js',     express.static(path.join(__dirname, '../build/js')));
app.use('/font',   express.static(path.join(__dirname, '../fontello/font')));
app.use('/images', express.static(path.join(__dirname, '../images')));

app.get('*', Facebook, function (req, res) {
  fs.createReadStream(path.join(__dirname, '../source/index.html'))
    .pipe(res)
});

app.listen(Config.settings.server.port, function() {
  console.log(`Express server running on port ${Config.settings.server.port}`);
});