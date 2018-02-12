import { types } from 'mobx-state-tree'
import MenuItem from './MenuItem'
import Page from './Page'
import Route from './Route'
import User from './User'

export default types.model('ApplicationState', {
  navigation: types.optional(types.array(MenuItem), []),
  page: types.optional(Page, Page.create({ type: 'article' })),
  route: types.optional(Route, Route.create()),
  user: types.optional(User, User.create()),
}).actions(self => ({
  /* eslint-disable no-param-reassign */
  setPage(type, routeParams) {
    self.page = type.create()
    self.page.load(routeParams)
  },
  setRoute(route) { self.route = Route.create(route) },
  /* eslint-enable no-param-reassign */
}))
