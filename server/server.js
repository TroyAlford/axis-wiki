import _          from 'lodash';
import express    from 'express';
import fs         from 'fs';
import http       from 'http';
import mkdirp     from 'mkdirp';
import path       from 'path';
import request    from 'request';
import url        from 'url';

import Watcher from './services/Watcher'

var port = 8080;

var modules = {
  article: require('./modules/article.js'),
  config:  require('./modules/config.js'),
  media:   require('./modules/media.js'),
};

Watcher.watch();

var app = express();
app.use('/api/page', modules.article);
app.use('/api/config', modules.config);
app.use('/media', modules.media);

['js', 'font', 'images', 'styles'].forEach(function(el) {
  app.use('/' + el, express.static(path.join(__dirname, '../build/develop/' + el)));
});

app.get('*', function (req, res) {
  fs.createReadStream(path.join(__dirname, '../build/develop', 'index.html'))
    .pipe(res);
});

app.listen(port, function() {
  console.log('Express server running on port ' + port);
});