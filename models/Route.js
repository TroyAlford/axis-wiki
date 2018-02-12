import { types } from 'mobx-state-tree'

export default types.model('Route', {
  hash: '',
  key: '',
  pathname: '',
  search: '',
}).views(self => ({
  get slug() { return self.pathname.split('/').pop() },
}))
