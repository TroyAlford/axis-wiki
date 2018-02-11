import { types } from 'mobx-state-tree'
import { optionalArrayOfStrings } from './commonModels'

const AuthToken = types.model('AuthToken', {
  algorithm: '',
  code: '',
  issued_at: 0,
  user_id: '',
})

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
})
