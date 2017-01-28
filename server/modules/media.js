import includes        from 'lodash/includes'
import intersection    from 'lodash/intersection'

import bodyParser      from 'body-parser'
import del             from 'del'
import express         from 'express'
import jimp            from 'jimp'
import multer          from 'multer'
import path            from 'path'

import Config          from '../services/Config'
import Slug            from '../../utility/Slugs'

import { resizeAll }   from '../helpers/image_processor'

var folders = Config.folders;
var settings = Config.settings.media;

const fileFilter = (request, file, cb) => {
  file.extension = path.extname(file.originalname).toLowerCase().replace('.', '')
  file.process   = includes(settings.allowed_extensions, file.extension)
  if (!file.process)
    request.rejected_files = [...(request.rejected_files || []), file]

  cb(null, file.process)
}

const storage = multer.diskStorage({
  destination: function(request, file, cb) {
    cb(null, folders.media);
  },
  filename: function(request, file, cb) {
    file.slug = Slug(path.basename(file.originalname, file.extension))
                    .replace('.', '')

    cb(null, `${file.slug}.temp.${file.extension}`)
  }
})

const file_middleware = multer({ fileFilter, storage }).array('file')

export default express()
  .use(bodyParser.json()) // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded
.get('/full/*', (req, res) => {
  let ext       = path.extname(req.url),
      filename  = path.basename(req.url, ext);

  res.sendFile(`${folders.media}/${filename}.full${ext}`);
})
.get('*', express.static(folders.media))
.post('/', file_middleware, (request, response) => {
  if (intersection(request.session.privileges, ['admin', 'edit']).length === 0)
    return response.status(401).send('You do not have sufficient privileges to upload files.')

  // First, report errors for any files that were rejected
  const allowed = `.${settings.allowed_extensions.join(', .')}`
  const rejections = (request.rejected_files || []).reduce((results, file) => {
    results[file.originalname] = {
      errors: [`Only files with the extensions ${allowed} are allowed for upload.`],
      paths: [],
    }
  }, {})

  const processors = (request.files || []).map(file => ({
    filename: file.originalname,
    tempPath: file.path,
    destinations: [{
      path: path.join(folders.media, `${file.slug}.full.${file.extension}`),
      maxWidth: settings.images.large.maxWidth,
      maxHeight: settings.images.large.maxHeight,
    }, {
      path: path.join(folders.media, `${file.slug}.${file.extension}`),
      maxWidth: settings.images.small.maxWidth,
      maxHeight: settings.images.small.maxHeight,
    }]
  }))

  Promise.all(
    processors.map(entry =>
      resizeAll(entry.tempPath, entry.destinations)
        .then(result => ({
          ...result,
          filename: entry.filename,
          tempPath: entry.tempPath,
          paths: result.paths.map(p => path.relative(folders.media, p))
        }))
    )
  )
  .catch(console.error)
  .then(processed => {
    const tempPaths = processed.map(file => file.tempPath)
    console.log(`Media Upload Finished => Deleting:`)
    tempPaths.forEach(path => console.log(` ==> ${path}`))
    del(tempPaths, { force: true })

    return processed
  })
  .then(processed => processed.reduce((results, file) => ({
    ...results,
    [file.filename]: {
      errors: file.errors || undefined,
      paths: file.paths || [],
    }
  }), {}))
  .then(processed => { console.log('Processed', processed); return ({ ...rejections, ...processed }) })
  .then(results => response.status(200).send(results))
})
