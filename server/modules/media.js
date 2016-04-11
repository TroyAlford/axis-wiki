
import _               from 'lodash'
import bodyParser      from 'body-parser'
import cheerio         from 'cheerio'
import express         from 'express'
import fs              from 'fs'
import lwip            from 'lwip'
import multer          from 'multer'
import path            from 'path'

import Config          from '../services/Config'
import Slug            from '../services/Slug'

var folders = Config.folders;
var settings = Config.settings.media;

var media = module.exports = express();
media.use(bodyParser.json()); // Parses application/json
media.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

media.get('/full/*', (req, res) => {
  let ext       = path.extname(req.url),
      filename  = path.basename(req.url, ext);

  res.sendFile(`${folders.media}/${filename}.full${ext}`);
});
media.get('*', express.static(folders.media));

var storage = multer.diskStorage({
  destination: function(request, file, cb) {
    cb(null, folders.media);
  },
  filename: function(request, file, cb) {
    var ext  = path.extname(file.originalname),
        name = Slug.normalize(path.basename(file.originalname, ext));

    ext = ext.replace(/jpeg/, 'jpg');

    request._filename = name;
    request._extension = ext;
    request._full_path = `${name}.full${ext}`;
    cb(null, request._full_path);
  }
});
media.post('/', multer({ storage: storage })
  .single("image_data"), function(request, response) {
    let name     = request._filename,
        ext      = request._extension,
        filename = `${name}${ext}`;

    lwip.open(request.file.path, (error, image) => {
      let resize_w = settings.image_resize_width,
          resize_h = image.height() * (resize_w / image.width());
      image.batch()
        .resize(resize_w, resize_h)
        .writeFile(path.resolve(folders.media, filename), err => {
          if (err) response.status(400).send({
            error: 'Error encountered while attempting to create a thumbnail for your file.'
          });
        })
      ;
    })
    response.redirect(`/info/media/${filename}`);
  })
;
