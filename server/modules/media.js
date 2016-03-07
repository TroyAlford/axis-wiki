var
  _          = require('lodash'),
  bodyParser = require('body-parser'),
  cheerio    = require('cheerio'),
  express    = require('express'),
  fs         = require('fs'),
  multer     = require('multer'),
  path       = require('path'),

  Slug       = require('./slug')
;

var paths = {
  media: path.resolve(__dirname, '../../content/media')
};

var media = module.exports = express();
media.use(bodyParser.json()); // Parses application/json
media.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

media.get('*', express.static(paths.media));

var storage = multer.diskStorage({
  destination: function(request, file, cb) {
    cb(null, paths.media);
  },
  filename: function(request, file, cb) {
    var ext  = path.extname(file.originalname),
        name = Slug.normalize(path.basename(file.originalname, ext));

    request._filename = `${name}${ext}`;
    cb(null, request._filename);
  }
});
media.post('/', multer({ storage: storage })
  .single("Image"), function(request, response) {
    response.redirect(`/media/${request._filename}`);
  })
;
