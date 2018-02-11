import { types } from 'mobx-state-tree'
import { optionalArrayOfStrings } from './commonModels'

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
}))
