import { flow, types } from 'mobx-state-tree'
import { optionalArrayOfStrings } from './commonModels'
import { GET } from './fetch'

const DEFAULTS = {
  id: '',
  email: '',
  favorites: [],
  name: '',
  privileges: [],
  tags: [],
  type: 'profile',
}

export default types.model('ProfilePage', {
  ...DEFAULTS,
  favorites: optionalArrayOfStrings,
  privileges: optionalArrayOfStrings,
  tags: optionalArrayOfStrings,
  type: types.optional(types.literal('profile'), 'profile'),
}).views(self => ({
  get title() { return self.name },
  get keywords() { return [self.name, self.type] },
})).actions(self => ({
  /* eslint-disable no-param-reassign */
  load: flow(function* ({ id }) {
    const response = yield GET(id ? `/api/profile/${id}` : '/api/my/profile')
    if (response.status === 200) {
      const profile = yield response.json()
      Object.assign(self, profile)
    }
  }),
  /* eslint-enable no-param-reassign */
}))
