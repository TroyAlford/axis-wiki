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
  anonymous: true,
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
  anonymous: true,
  articles: optionalArrayOfStrings,
  email: '',
  favorites: optionalArrayOfStrings,
  id: '',
  name: 'Anonymous',
  privileges: optionalArrayOfStrings,
  tags: optionalArrayOfStrings,
  token: types.optional(AuthToken, {}),
}).actions(self => ({
  become(user) { Object.assign(self, user) },
  fetchProfile: flow(function* () {
    const response = yield GET('/api/my/profile')

    let profile = ANONYMOUS
    if (response.status === 200) profile = yield response.json()

    self.become(profile)
  }),
  saveProfile: flow(function* () {
    const response = yield POST('/api/my/profile', self.toJSON())

    if (response.status === 200) {
      const profile = yield response.json()
      self.become(profile)
    }
  }),
}))
