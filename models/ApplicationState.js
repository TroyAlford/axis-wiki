import { types } from 'mobx-state-tree'
import MenuItem from './MenuItem'
import Page from './Page'
import User from './User'

export default types.model('ApplicationState', {
  navigation: types.optional(types.array(MenuItem), []),
  page: types.optional(Page, Page.create({ type: 'article' })),
  user: types.optional(User, User.create()),
})
