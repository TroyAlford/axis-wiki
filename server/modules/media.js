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

const fileFilter = (request, file, cb) => {
  file.extension = path.extname(file.originalname).toLowerCase().replace('.', '')
  file.process   = _.includes(settings.allowed_extensions, file.extension)
  if (!file.process)
    request.rejected_files = [...(request.rejected_files || []), file]

  cb(null, file.process)
}

const storage = multer.diskStorage({
  destination: function(request, file, cb) {
    cb(null, folders.media);
  },
  filename: function(request, file, cb) {
    file.slug = Slug.normalize(path.basename(file.originalname, file.extension))
                    .replace('.', '')

    cb(null, `${file.slug}.temp.${file.extension}`)
  }
})

const file_middleware = multer({ fileFilter, storage }).array('file')

media.post('/', file_middleware, (request, response) => {
  if (_.intersection(request.session.privileges, ['admin', 'edit']).length == 0)
    return response.status(401).send('You do not have sufficient privileges to upload files.')

  let files_to_process = (request.files || []),
      files_rejected   = (request.rejected_files || []),
      results = {},
      processors = []

  files_to_process.forEach(file => {
    const { slug, extension } = file,
          filename = `${slug}.${extension}`,
          temp_filepath = path.resolve(folders.media, file.filename)

    let opener = Q.defer(),
        sm_processor = Q.defer(),
        lg_processor = Q.defer(),
        promises = [sm_processor.promise, lg_processor.promise]

    let result = results[filename] = {
      errors: [],
      large: false,
      small: false
    }

    processors = [...processors, ...promises]

    lwip.open(temp_filepath, (error, image) => {
      if (error) {
        console.log(`Media Uploaded => ${filename} failed to .open() for processing. Invalid file.`)
        result.errors.push(`An error occurred while attempting to process this file. It may be corrupt or have an incorrect file extension.`)
        lg_processor.reject(error)
        sm_processor.reject(error)
        opener.reject(error)
      } else
        opener.resolve(image)
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

      console.log(`Media Upload => Processing ${filename}`)
      image.clone((error, large) => {
        if (error) {
          console.log(`Media Upload => ${filename} failed to .clone() for large-size processing`)
          result.errors.push(`An error occurred while saving the large format version of this file.`)
          result.large = null
          lg_processor.reject(error)
          return
        }

        large.batch()
        .resize(w_lg, h_lg)
        .writeFile(path_lg, extension, error => {
          if (error) {
            console.log(`Media Upload => ${filename} failed to .writeFile() for large-size processing\n ==> ${error}`)
            result.errors.push(`An error occurred while saving the large format version of this file.`)
            result.large = null
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
          result.errors.push(`An error occurred while saving the small format version of this file.`)
          result.small = null
          sm_processor.reject(error)
          return
        }

        small.batch()
        .resize(w_sm, h_sm)
        .writeFile(path_sm, extension, error => {
          if (error) {
            console.log(`Media Upload => ${filename} failed to .writeFile() for small-size processing\n ==> ${error}`)
            result.errors.push(`An error occurred while saving the small format version of this file.`)
            result.small = null
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

  files_rejected.forEach(file => {
    results[file.originalname] = {
      errors: [`Only valid .${settings.allowed_extensions.join(', .')} files are allowed.`],
      large: null,
      small: null
    }
  })

  Q.allSettled(processors).then(() => {
    let files_to_delete = request.files.map(f => path.resolve(folders.media, f.filename))
    console.log(`Media Upload Finished => Deleting: \n ==> ${files_to_delete.join('\n ==> ')}`)
    del(files_to_delete, { force: true })
    response.status(200).send(results)
  })
})
