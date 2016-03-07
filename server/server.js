var
  _       = require('lodash'),
  express = require('express'),
  fs      = require('fs'),
  http    = require('http'),
  mkdirp  = require('mkdirp'),
  path    = require('path'),
  request = require('request'),
  url     = require('url'),

  port    = 8080
;

var modules = {
  article: require('./modules/article.js'),
  config:  require('./modules/config.js'),
  media:   require('./modules/media.js'),
  search:  require('./modules/search.js')
};

var app = express();
app.use('/api/w', modules.article);
app.use('/api/config', modules.config);
app.use('/api/search', modules.search);
app.use('/media', modules.media);

_.forEach(['js', 'font', 'images', 'styles'], function(el) {
  app.use('/' + el, express.static(path.join(__dirname, '../build/develop/' + el)));
});

app.get('*', function (req, res) {
  fs.createReadStream(path.join(__dirname, '../build/develop', 'index.html'))
    .pipe(res);
});

http.createServer(app).listen(port, function() {
  console.log('Express server running on port ' + port);
});