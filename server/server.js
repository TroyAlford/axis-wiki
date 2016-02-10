var
  express = require('express'),
  fs      = require('fs'),
  http    = require('http'),
  path    = require('path'),
  request = require('request'),
  url     = require('url'),

  port    = 8080
;

var modules = {
  article: require('./modules/article.js')
};

var app = express();
app.use('/w', modules.article);

http.createServer(app).listen(port, function() {
  console.log('Express server running on port ' + port);
});