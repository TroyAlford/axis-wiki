import {
  SEARCH_LOADING,
  SEARCH_REQUEST,
  SEARCH_RESET,
  SEARCH_RESULTS
} from './actions'

const default_state = {
  loading: false,
  results: [],
  term: '',
}

export default (state = default_state, action) => {
  const { term, results } = action;
  switch (action.type) {
    case SEARCH_LOADING:
      return { ...state, term, loading: true }
    case SEARCH_RESET:
      return default_state
    case SEARCH_RESULTS:
      return { ...state, term, results, loading: false }
    default:
      return state
  }
}
