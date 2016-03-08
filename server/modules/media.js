
import _               from 'lodash'
import bodyParser      from 'body-parser'
import cheerio         from 'cheerio'
import express         from 'express'
import fs              from 'fs'
import multer          from 'multer'
import path            from 'path'

import Config          from './config'
import Slug            from './slug'

var folders = Config.folders();

var media = module.exports = express();
media.use(bodyParser.json()); // Parses application/json
media.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

media.get('*', express.static(folders.media));

var storage = multer.diskStorage({
  destination: function(request, file, cb) {
    cb(null, folders.media);
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
