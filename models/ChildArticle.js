import { types } from 'mobx-state-tree'
import titleCase from '@utils/titleCase'

export default types.model('ChildArticle', {
  slug: '',
  title: '',
}).views(self => ({
  get displayName() { return self.title || titleCase(self.slug) },
}))
