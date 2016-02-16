var
  express = require('express'),
  fs      = require('fs'),
  http    = require('http'),
  mkdirp  = require('mkdirp'),
  path    = require('path'),
  request = require('request'),
  url     = require('url'),

  port    = 8080
;

var folders = {
  articles: './../content/articles',
  config:   './../content/config',
  media:    './../content/media',
  metadata: './../content/metadata'
};

// Ensure the required folders exist.
Object.keys(folders).forEach(function(folder) {
  mkdirp(folders[folder], function(err) { return; });
});

var modules = {
  article: require('./modules/article.js')
};

var app = express();
app.use('/api/w', modules.article);
app.use('/js', express.static(path.join(__dirname, '../build/develop/js')));
app.use('/font', express.static(path.join(__dirname, '../build/develop/font')));
app.use('/styles', express.static(path.join(__dirname, '../build/develop/styles')));
app.get('*', function (req, res) {
  fs.createReadStream(path.join(__dirname, '../build/develop', 'index.html'))
    .pipe(res);
});

http.createServer(app).listen(port, function() {
  console.log('Express server running on port ' + port);
});