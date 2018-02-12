import { flow, types } from 'mobx-state-tree'
import { optionalArrayOfStrings } from './commonModels'
import { GET } from './fetch'

const ChildArticle = types.model('ChildArticle', {
  slug: '',
  title: '',
})

export default types.model('ArticlePage', {
  aliases: optionalArrayOfStrings,
  children: types.optional(types.array(ChildArticle), []),
  html: '',
  isFavorite: false,
  keywords: optionalArrayOfStrings,
  layout: 'medium',
  links: optionalArrayOfStrings,
  loading: false,
  missing: optionalArrayOfStrings,
  privileges: optionalArrayOfStrings,
  slug: '',
  tags: optionalArrayOfStrings,
  title: '',
  type: types.optional(types.literal('article'), 'article'),
}).actions(self => ({
  update(values) { Object.assign(self, values) },
  save: flow(function* () {
    const response = yield GET(`/api/page/${self.slug}`, self.toJSON())
    switch (response.status) {
      case 200:
        self.update(yield response.json()); break
      case 401:
      case 500:
      default:
    }
  }),
}))
