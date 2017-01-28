import Jimp from 'jimp'

export async function resize(source, destinations = []) {
  return new Promise((resolve, reject) => {
    Jimp.read(source, (error, image) => {
      if (error) return reject({ success: false, error })

      Promise.all(destinations.map(dest => new Promise((resolve, reject) => {
        const w = Math.min(dest.maxWidth || image.bitmap.width, image.bitmap.width)
        const h = Math.min(dest.maxHeight || image.bitmap.height, image.bitmap.height)

        image.clone()
          .scaleToFit(w, h)
          .write(dest.path, (error, image) => {
            if (error) return reject({ success: false, error })
            resolve({ success: true, image })
          })
      })))
      .then(resolve)
      .catch(reject)
    })
  })
}
