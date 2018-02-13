import { types } from 'mobx-state-tree'

export default types.model('MediaPage', {
  filename: '',
  type: types.optional(types.literal('media'), 'media'),
}).views(self => ({
  get title() { return self.filename },
  get keywords() { return [self.filename, self.type] },
})).actions(self => ({
  load() { },
}))
