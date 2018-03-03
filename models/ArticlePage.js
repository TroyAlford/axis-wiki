import { autorun } from 'mobx'
import { flow, getParent, types } from 'mobx-state-tree'
import titleCase from '@utils/titleCase'
import ChildArticle from '@models/ChildArticle'
import PageData from '@models/PageData'
import { optionalArrayOfStrings } from '@models/commonModels'
import { DELETE, GET, POST } from './fetch'

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
  data: types.optional(PageData, {}),
  links: optionalArrayOfStrings,
  missing: optionalArrayOfStrings,
  privileges: optionalArrayOfStrings,
  tags: optionalArrayOfStrings,
  type: types.optional(types.literal('article'), DEFAULTS.type),
}).volatile(() => ({
  loading: false,
  activeTabId: 'sheet',
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
  get user() { return getParent(self).user },
  get readonly() { return self.user.anonymous || !self.privileges.includes('edit') },
})).actions((self) => {
  /* eslint-disable no-param-reassign */
  let autorunDisposer
  let userId

  return {
    afterAttach() {
      userId = self.user.id // eslint-disable-line prefer-destructuring
      autorunDisposer = autorun(() => {
        if (self.user.id !== userId) {
          userId = self.user.id // eslint-disable-line prefer-destructuring
          self.reload()
        }
      })
    },
    beforeDestroy() { autorunDisposer() },
    delete: flow(function* () {
      const response = yield DELETE(`/api/page/${self.slug}`)
      switch (response.status) {
        case 410:
          window.routerHistory.push('/')
          break
        default:
      }
    }),
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
    reload() { self.load({ slug: self.slug }) },
    removeTag(tag) { self.tags.remove(tag) },
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
    setActiveTabId(tabId) { self.activeTabId = tabId },
    setHTML(html) { self.html = html },
    setTags(tags) { self.tags = tags },
    setTitle(title) { self.title = title },
    toggleFavorite: flow(function* () {
      const { slug, isFavorite } = self
      const response = yield POST('/api/my/favorites', { slug, value: !isFavorite })
      if (response.status === 200) {
        self.isFavorite = !isFavorite
      }
    }),
    update(values) { Object.assign(self, { ...DEFAULTS, ...values }) },
    /* eslint-enable no-param-reassign */
  }
})

export default ArticlePage
