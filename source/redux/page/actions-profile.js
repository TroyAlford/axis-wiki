import { setPage, PROFILE } from '../page/actions'
import { addMessage } from '../messages/actions'

export function loadProfile(id) {
  const url = id ? `/api/profile/${id}` : '/api/my/profile'
  return dispatch => fetch(url, { credentials: 'include' })
  .then((response) => {
    switch (response.status) {
      case 200:
        response.json().then(profile =>
          dispatch(setPage(PROFILE, profile))
        )
        break
      case 404:
        dispatch(addMessage(`User ${id}'s profile was not found.`))
        break
      case 500:
      default: // All other error messages
        dispatch(addMessage(`Error encountered while loading profile for User ${id}.`))
    }
  })
}
