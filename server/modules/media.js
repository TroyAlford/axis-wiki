var
  _          = require('lodash'),
  bodyParser = require('body-parser'),
  cheerio    = require('cheerio'),
  express    = require('express'),
  fs         = require('fs'),
  multer     = require('multer'),
  path       = require('path'),
  utils      = require('fs-utils'),

  Tags       = require('./tags')
;

var paths = {
  media: path.resolve(__dirname, '../../content/media')
};

var media = module.exports = express();
media.use(bodyParser.json()); // Parses application/json
media.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

var storage = multer.diskStorage({ 
  destination: function(req, file, cb) { 
    cb(null, path.join(paths.media, file.name));
  },
  filename: function() {}
});
var upload = multer({ storage: storage });

media.post('/', upload.single("Image"), function(request, response, next) {
  
});
media.get('/', express.static(paths.media));