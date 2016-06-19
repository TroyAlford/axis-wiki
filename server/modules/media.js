import _               from 'lodash'
import bodyParser      from 'body-parser'
import cheerio         from 'cheerio'
import del             from 'del'
import express         from 'express'
import fs              from 'fs'
import lwip            from 'lwip'
import multer          from 'multer'
import path            from 'path'
import Q               from 'q'

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

const storage = multer.diskStorage({
  destination: function(request, file, cb) {
    cb(null, folders.media);
  },
  filename: function(request, file, cb) {
    var ext  = path.extname(file.originalname),
        slug = Slug.normalize(path.basename(file.originalname, ext));

    ext = ext
      .replace('.', '')
      .replace(/jpeg/, 'jpg')
    ;

    file.slug = slug
    file.extension = ext

    cb(null, `${slug}.temp.${ext}`);
  }
})

const file_middleware = multer({ storage: storage }).array('file')

media.post('/', file_middleware, (request, response) => {
  let files = request.files || [],
      results = {},
      processors = []

  files.forEach(file => {
    const { slug, extension } = file,
          filename = `${slug}.${extension}`,
          temp_filepath = path.resolve(folders.media, file.filename)

    let opener = Q.defer(),
        sm_processor = Q.defer(),
        lg_processor = Q.defer(),
        promises = [sm_processor.promise, lg_processor.promise]

    processors = [...processors, ...promises]

    lwip.open(temp_filepath, (error, image) => {
      error ? opener.reject(error) : opener.resolve(image)
    })

    opener.promise.then(image => {
      const
        name_lg = `${slug}.full.${extension}`,
        path_lg = path.resolve(folders.media, name_lg),
        w_lg = Math.min(settings.lg_image_width, image.width()),
        h_lg = Math.round(image.height() * (w_lg / image.width())),

        name_sm = `${slug}.${extension}`,
        path_sm = path.resolve(folders.media, name_sm),
        w_sm = Math.min(settings.sm_image_width, image.width()),
        h_sm = Math.round(image.height() * (w_sm / image.width()))

      let result = results[filename] = {
        large: false,
        small: false
      }

      console.log(`Media Upload => Processing ${filename}`)
      image.clone((error, large) => {
        if (error) {
          console.log(`Media Upload => ${filename} failed to .clone() for large-size processing`)
          lg_processor.reject(error)
        }

        large.batch()
        .resize(w_lg, h_lg)
        .writeFile(path_lg, extension, error => {
          if (error) {
            console.log(`Media Upload => ${filename} failed to .writeFile() for large-size processing\n ==> ${error}`)
            lg_processor.reject(error)
          } else {
            console.log(`Media Upload => ${filename} => ${name_lg} saved`)
            result.large = `/media/${name_lg}`
            lg_processor.resolve(name_lg)
          }
        })
      })

      image.clone((error, small) => {
        if (error) {
          console.log(`Media Upload => ${filename} failed to .clone() for small-size processing`)
          sm_processor.reject(error)
        }

        small.batch()
        .resize(w_sm, h_sm)
        .writeFile(path_sm, extension, error => {
          if (error) {
            console.log(`Media Upload => ${filename} failed to .writeFile() for small-size processing\n ==> ${error}`)
            sm_processor.reject(error)
          } else {
            console.log(`Media Upload => ${filename} => ${name_sm} saved`)
            result.small = `/media/${name_sm}`
            sm_processor.resolve(name_sm)
          }
        })
      })
    })
  })

  Q.allSettled(processors).then(() => {
    let files_to_delete = files.map(f => path.resolve(folders.media, f.filename))
    console.log(`Media Upload Finished => Deleting: \n ==> ${files_to_delete.join('\n ==> ')}`)
    del(files_to_delete, { force: true })
    response.status(200).send(results)
  })
})
