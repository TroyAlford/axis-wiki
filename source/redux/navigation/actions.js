import fetch from 'isomorphic-fetch'

export const NAVIGATION_CHANGE = 'navigation.change'

export function loadNavigation() {
  return (dispatch =>
    fetch('/api/config/navigation', { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(navigationChange(json)))
  )
}

export function navigationChange(navigation) {
  return {
    type: NAVIGATION_CHANGE,
    navigation,
  }
}
