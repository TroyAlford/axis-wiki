jest.unmock('jimp')
jest.unmock('./image_processor')

import Jimp from 'jimp'
import { resize } from './image_processor'

Jimp.read = jest.fn().mockImplementation((source, cb) =>
  new Promise(() => { new Jimp(1000, 1000, 0xFF0000FF, cb) })
)
Jimp.prototype.write = jest.fn().mockImplementation(function(path, cb) {
  cb.call(this, null, this)
})

describe('image_processor', () => {
  it('does stuff', async () => {
    const source = '/tmp/source.png'
    const destination = '/tmp/dest.png'

    const result = await resize(source, [
      { path: destination, maxWidth: 24, maxHeight: 24 },
    ])

    expect(result.length).toEqual(1)
    expect(result[0].success).toEqual(true)
    expect(result[0].error).toBeUndefined()
    expect(result[0].image).not.toBeUndefined()

    const image = result[0].image

    expect(image.bitmap.width).toBeLessThanOrEqual(24)
    expect(image.bitmap.height).toBeLessThanOrEqual(24)
  })
})
