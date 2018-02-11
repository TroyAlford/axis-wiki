import { types } from 'mobx-state-tree'
import Article from './Article'
import Config from './Config'
import MenuItem from './MenuItem'
import User from './User'

export default types.model('ApplicationState', {
  config: types.optional(Config, Config.create()),
  navigation: types.optional(types.array(MenuItem), []),
  page: types.optional(Article, Article.create()),
  user: types.optional(User, User.create()),
})
