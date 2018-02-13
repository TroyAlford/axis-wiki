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
  links: optionalArrayOfStrings,
  missing: optionalArrayOfStrings,
  privileges: optionalArrayOfStrings,
  tags: optionalArrayOfStrings,
  type: types.optional(types.literal('article'), DEFAULTS.type),
}).volatile(() => ({
  loading: false,
})).views(self => ({
  get displayName() { return self.title || titleCase(self.slug) },
  get keywords() {
    return [
      ...self.aliases,
      ...self.children.map(c => c.displayName),
      ...self.tags.map(t => t.toLowerCase()),
      self.displayName,
      self.slug,
      self.type,
    ]
  },
})).actions(self => ({
  /* eslint-disable no-param-reassign */
  load: flow(function* ({ slug }) {
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
  toggleFavorite: flow(function* () {
    const { slug, isFavorite } = self
    const response = yield POST('/api/my/favorites', { slug, value: !isFavorite })
    if (response.status === 200) {
      self.isFavorite = !isFavorite
    }
  }),
  /* eslint-enable no-param-reassign */
}))

export default ArticlePage
