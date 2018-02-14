import { flow, types } from 'mobx-state-tree'
import { optionalArrayOfStrings } from './commonModels'
import { GET, POST } from './fetch'

const AuthToken = types.model('AuthToken', {
  algorithm: '',
  code: '',
  issued_at: 0,
  user_id: '',
})

export const ANONYMOUS = {
  articles: [],
  email: '',
  favorites: [],
  id: '',
  name: 'Anonymous',
  privileges: [],
  tags: [],
  token: AuthToken.create(),
}

export default types.model('User', {
  articles: optionalArrayOfStrings,
  email: '',
  favorites: optionalArrayOfStrings,
  id: '',
  name: 'Anonymous',
  privileges: optionalArrayOfStrings,
  tags: optionalArrayOfStrings,
  token: types.optional(AuthToken, {}),
}).views(self => ({
  get anonymous() { return !self.id },
})).actions(self => ({
  become(user) { Object.assign(self, user) },
  fetchProfile: flow(function* (fb) {
    const response = yield GET('/api/my/profile')

    let profile = ANONYMOUS
    if (response.status === 200) profile = yield response.json()

    self.become({ ...fb, ...profile })
  }),
  saveProfile: flow(function* () {
    const response = yield POST('/api/my/profile', self.toJSON())

    if (response.status === 200) {
      const profile = yield response.json()
      self.become(profile)
    }
  }),
}))
