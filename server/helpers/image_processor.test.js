jest.unmock('jimp')
jest.unmock('./image_processor')

import Jimp from 'jimp'
import { resizeAll } from './image_processor'

Jimp.read = jest.fn().mockImplementation((source, cb) =>
  new Promise(() => { new Jimp(1000, 1000, 0xFF0000FF, cb) })
)
Jimp.prototype.write = jest.fn().mockImplementation(function(path, cb) {
  cb.call(this, null, this)
})

describe('image_processor', () => {
  it('processes files synchronously', async () => {
    const source = '/tmp/source.png'
    const destination = '/tmp/dest.png'

    const result = await resizeAll(source, [
      { path: destination, maxWidth: 24, maxHeight: 24 },
    ])

    expect(result.filename).toEqual(source)
    expect(result.paths).toHaveLength(1)
    expect(result.paths[0]).toEqual(destination)
  })
})
