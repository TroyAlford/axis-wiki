import { flow, types } from 'mobx-state-tree'
import titleCase from '@utils/titleCase'
import { optionalArrayOfStrings } from './commonModels'
import { GET, POST } from './fetch'

const ChildArticle = types.model('ChildArticle', {
  slug: '',
  title: '',
}).views(self => ({
  get displayName() { return self.title || titleCase(self.slug) },
}))

const DEFAULTS = {
  aliases: [],
  children: [],
  html: '',
  isFavorite: false,
  keywords: [],
  layout: 'medium',
  links: [],
  loading: false,
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
}).views(self => ({
  get displayName() { return self.title || titleCase(self.slug) },
})).actions(self => ({
  load: flow(function* (slug) {
    const response = yield GET(`/api/page/${slug}`)
    switch (response.status) {
      case 200:
        self.update(yield response.json()); break
      default:
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
}))

export default ArticlePage
