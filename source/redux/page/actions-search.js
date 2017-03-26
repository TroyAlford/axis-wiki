import { browserHistory } from 'react-router'
import { setPage, SEARCH, LOADING } from '../page/actions'

export function searchResults(term, results) {
  if (browserHistory.location !== `/search/${term}`) browserHistory.push(`/search/${term}`)
  return { type: SEARCH, results, term }
}

export function searchFor(term = '') {
  return (dispatch) => {
    if (term.length < 3) return
    dispatch({ type: LOADING, term })

    let updatedTerm = term
    fetch(`/api/search/${term}`, { credentials: 'include' })
      .then((response) => {
        updatedTerm = response.url.split('/').pop()
        if (updatedTerm !== term) browserHistory.replace(`/search/${updatedTerm}`)
        return response.json()
      }).then((results) => {
        dispatch(setPage(SEARCH, { term: updatedTerm, results }))
      })
  }
}
export function searchReset() {
  return {
  }
}
