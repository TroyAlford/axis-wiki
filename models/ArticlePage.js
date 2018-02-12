import { flow, types } from 'mobx-state-tree'
import ChildArticle from '@models/ChildArticle'
import titleCase from '@utils/titleCase'
import { optionalArrayOfStrings } from './commonModels'
import { GET, POST } from './fetch'

const DEFAULTS = {
  aliases: [],
  children: [],
  html: '',
  isFavorite: false,
  keywords: [],
  links: [],
  missing: [],
  privileges: [],
  slug: '',
  tags: [],
  title: '',
  type: 'article',
}

const ArticlePage = types.model('ArticlePage', {
  ...DEFAULTS,
  aliases: optionalArrayOfStrings,
  children: types.optional(types.array(ChildArticle), DEFAULTS.children),
  keywords: optionalArrayOfStrings,
  links: optionalArrayOfStrings,
  missing: optionalArrayOfStrings,
  privileges: optionalArrayOfStrings,
  tags: optionalArrayOfStrings,
  type: types.optional(types.literal('article'), DEFAULTS.type),
}).volatile(() => ({
  loading: false,
})).views(self => ({
  get displayName() { return self.title || titleCase(self.slug) },
})).actions(self => ({
  /* eslint-disable no-param-reassign */
  load: flow(function* (slug) {
    self.loading = true
    const response = yield GET(`/api/page/${slug}`)
    switch (response.status) {
      case 200:
        self.update(yield response.json())
      default:
        self.loading = false
    }
  }),
  update(values) { Object.assign(self, { ...DEFAULTS, ...values }) },
  save: flow(function* () {
    const response = yield POST(`/api/page/${self.slug}`, self.toJSON())
    switch (response.status) {
      case 200:
        self.update(yield response.json()); break
      case 401:
      case 500:
      default:
    }
  }),
  toggleFavorite() { self.isFavorite = !self.isFavorite },
  /* eslint-enable no-param-reassign */
}))

export default ArticlePage
