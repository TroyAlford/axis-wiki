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

var modules = {
  article: require('./modules/article.js'),
  config:  require('./modules/config.js'),
  media:   require('./modules/media.js'),
  my:      require('./modules/my.js')
};

Watcher.watch();

var app = express();

app.use(cookieParser());

/* Non-Static Routes */
app.use('/api/page',   Facebook, modules.article);
app.use('/api/config', Facebook, modules.config);
app.use('/api/my',     Facebook, modules.my);
app.use('/media',      Facebook, modules.media);

/* Static Content Routes */
app.use('/css',    express.static(path.join(__dirname, '../build/css')));
app.use('/js',     express.static(path.join(__dirname, '../build/js')));
app.use('/font',   express.static(path.join(__dirname, '../fontello/font')));
app.use('/images', express.static(path.join(__dirname, '../images')));

app.get('*', function (req, res) {
  fs.createReadStream(path.join(__dirname, '../source/index.html'))
    .pipe(res);
});

app.listen(Config.settings.server.port, function() {
  console.log(`Express server running on port ${Config.settings.server.port}`);
});