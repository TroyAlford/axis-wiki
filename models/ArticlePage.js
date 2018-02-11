import { types } from 'mobx-state-tree'
import { optionalArrayOfStrings } from './commonModels'

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
})
