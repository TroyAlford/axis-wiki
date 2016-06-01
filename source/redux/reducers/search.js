import {
  SEARCH_LOADING,
  SEARCH_REQUEST,
  SEARCH_RESET,
  SEARCH_RESULTS
} from '../actions/search'

const default_state = {
  loading: false,
  results: {},
  term: ''
}

export default (state = default_state, action) => {
  const { term, results } = action;
  switch (action.type) {
    case SEARCH_LOADING:
      return Object.assign({},
        default_state,
        { term, loading: true }
      )
    case SEARCH_REQUEST:
      return Object.assign({}, 
        default_state,
        { term, loading: true }
      )
    case SEARCH_RESET:
      return Object.assign({}, default_state)
    case SEARCH_RESULTS:
      return Object.assign({}, 
        default_state,
        { loading: false, term, results }
      )
    default:
      return state
  }
}