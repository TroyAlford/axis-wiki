import { flow, types } from 'mobx-state-tree'
import { optionalArrayOfStrings } from './commonModels'
import { GET } from './fetch'

const MatchResult = types.model('MatchResult', {
  text: '',
})

const SearchResult = types.model('SearchResult', {
  aliases: optionalArrayOfStrings,
  file: '',
  image: '',
  results: types.optional(types.array(MatchResult), []),
  title: '',
})

export default types.model('SearchPage', {
  term: '',
  results: types.optional(types.array(SearchResult), []),
  type: types.optional(types.literal('search'), 'search'),
}).views(self => ({
  get title() { return `Search: ${self.term}` },
  get keywords() { return [self.term, self.type] },
})).actions(self => ({
  /* eslint-disable no-param-reassign */
  load: flow(function* ({ term }) {
    const response = yield GET(`/api/search/${term}`)
    if (response.status !== 200) return

    const results = yield response.json()
    self.term = term
    self.results = results
  }),
  /* eslint-enable no-param-reassign */
}))
