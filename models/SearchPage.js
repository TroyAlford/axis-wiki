import { types } from 'mobx-state-tree'
import { optionalArrayOfStrings } from './commonModels'

const MatchResult = types.model('MatchResult', {
  text: '',
})

const SearchResult = types.model('SearchResult', {
  aliases: optionalArrayOfStrings,
  file: '',
  results: types.array(MatchResult),
  title: '',
})

export default types.model('SearchPage', {
  term: '',
  results: types.array(SearchResult),
  type: types.optional(types.literal('search'), 'search'),
}).views(self => ({
  get title() { return `Search: ${self.term}` },
  get keywords() { return [self.term, self.type] },
}))
