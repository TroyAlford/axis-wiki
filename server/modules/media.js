import bodyParser from 'body-parser'
import del from 'del'
import express from 'express'
import multer from 'multer'
import path from 'path'

import { includes, intersection } from 'lodash'
import config from '../../config/server'
import { resizeAll } from '../helpers/image_processor'
import { slugify } from '../../utility/Slugs'

const { folders, media } = config

const fileFilter = (request, file, cb) => {
  file.extension = path.extname(file.originalname).toLowerCase().replace('.', '')
  file.process = includes(media.extensions, file.extension)
  if (!file.process) {
    request.rejected_files = [...(request.rejected_files || []), file]
  }

  cb(null, file.process)
}

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, folders.media)
  },
  filename: (request, file, cb) => {
    file.slug = slugify(path.basename(file.originalname, file.extension))
                  .replace('.', '')

    cb(null, `${file.slug}.temp.${file.extension}`)
  },
})

const fileMiddleware = multer({ fileFilter, storage }).array('file')

export default express()
  .use(bodyParser.json()) // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded
.get('/full/*', (req, res) => {
  const ext = path.extname(req.url)
  const filename = path.basename(req.url, ext)

  res.sendFile(`${folders.media}/${filename}.full${ext}`)
})
.get('*', express.static(folders.media))
.post('/', fileMiddleware, (request, response) => {
  if (intersection(request.session.privileges, ['admin', 'edit']).length === 0) {
    return response.status(401).send('You do not have sufficient privileges to upload files.')
  }

  // First, report errors for any files that were rejected
  const allowed = `.${media.extensions.join(', .')}`
  const rejections = (request.rejected_files || []).reduce((results, file) => {
    results[file.originalname] = {
      errors: [`Only files with the extensions ${allowed} are allowed for upload.`],
      paths:  [],
    }
  }, {})

  const processors = (request.files || []).map(file => ({
    filename: file.originalname,
    tempPath: file.path,

    destinations: [{
      path:      path.join(folders.media, `${file.slug}.full.${file.extension}`),
      maxWidth:  media.largeSizePixels,
      maxHeight: media.largeSizePixels,
    }, {
      path:      path.join(folders.media, `${file.slug}.${file.extension}`),
      maxWidth:  media.smallSizePixels,
      maxHeight: media.smallSizePixels,
    }],
  }))

  Promise.all(
    processors.map(entry =>
      resizeAll(entry.tempPath, entry.destinations)
        .then(result => ({
          ...result,
          filename: entry.filename,
          tempPath: entry.tempPath,
          paths:    result.paths.map(p => path.relative(folders.media, p)),
        }))
    )
  )
  .catch(console.error)
  .then((processed) => {
    const tempPaths = processed.map(file => file.tempPath)
    console.log('Media Upload Finished => Deleting:')
    tempPaths.forEach(path => console.log(` ==> ${path}`))
    del(tempPaths, { force: true })

    return processed
  })
  .then(processed => processed.reduce((results, file) => ({
    ...results,
    [file.filename]: {
      errors: file.errors || undefined,
      paths:  file.paths || [],
    },
  }), {}))
  .then(processed => ({ ...rejections, ...processed }))
  .then(results => response.status(200).send(results))

  return true
})
