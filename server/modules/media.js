
import _               from 'lodash'
import bodyParser      from 'body-parser'
import cheerio         from 'cheerio'
import del             from 'del'
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

    ext = ext
      .replace('.', '')
      .replace(/jpeg/, 'jpg')
    ;

    request._filename = name;
    request._extension = ext;
    request._temp_path = `${name}.temp.${ext}`;

    cb(null, request._temp_path);
  }
});
media.post('/', multer({ storage: storage })
  .single("image_data"), function(request, response) {
    let name     = request._filename,
        ext      = request._extension,
        fullsize_filename = `${name}.full.${ext}`,
        preview_filename  = `${name}.${ext}`;

    let lwip_error = false;

    lwip.open(path.resolve(folders.media, request._temp_path), (error, image) => {
      lwip_error = error || false;
      if (lwip_error) return;

      console.log(`Media: uploaded ${request._temp_path} => ${image.width()}x${image.height()}px image.`)

      let fullsize_w = settings.lg_image_width,
          fullsize_h = Math.round(image.height() * (fullsize_w / image.width())),
          preview_w  = settings.sm_image_width,
          preview_h  = Math.round(image.height() * (preview_w / image.width()));

      let fullsize = (image.width() > fullsize_w)
        ? resize(image, fullsize_w, fullsize_h)
        : image;

      let preview = (image.width() > preview_w)
        ? resize(image, preview_w, preview_h)
        : image;

      fullsize.writeFile(path.resolve(folders.media, fullsize_filename), error => {
        if (error)
          return console.log(` !! fullsize error: ${lwip_error}`);

        console.log(` >> ${fullsize_filename} => ${fullsize_w}x${fullsize_h}px`);

        preview.writeFile(path.resolve(folders.media, preview_filename), error => {
          if (error)
            return console.log(` !! preview error: ${lwip_error}`);

          console.log(` >> ${preview_filename} => ${preview_w}x${preview_h}px`);

          del([path.resolve(folders.media, request._temp_path)], { force: true })
            .then(paths => { console.log(` XX ${request._temp_path} => deleted`); });

          response.redirect(`/info/media/${preview_filename}`);
        });
      });
    });
  })
;

function resize(image, w, h) {
  return image.batch().resize(w, h);
}