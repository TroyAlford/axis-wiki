import _                     from 'lodash'
import fetch                 from 'isomorphic-fetch'
import { browserHistory }    from 'react-router'

export const SEARCH_LOADING = 'search.loading'
export const SEARCH_REQUEST = 'search.request'
export const SEARCH_RESET   = 'search.reset'
export const SEARCH_RESULTS = 'search.results'

export function searchLoading(term) {
  return {
    type: SEARCH_RESULTS,
    term
  }
}
export function searchRequest(term) {
  return dispatch => {
    dispatch(searchLoading(term));

    let updated_term = ''
    return fetch(`/api/search/${term}`, { credentials: 'include' })
      .then(response => {
        updated_term = _(response.url).split('/').last()
        return response.json()
      }).then(json => {
        dispatch(searchResults(updated_term, json))        
      })
    ;
  }
}
export function searchResults(term, results) {
  if (browserHistory.location !== `/search/${term}`)
    browserHistory.push(`/search/${term}`);

  return {
    type: SEARCH_RESULTS,
    results, term
  }
}
export function searchReset() {
  return {
    type: SEARCH_RESET
  }
}