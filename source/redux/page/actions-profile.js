import { setPage, PROFILE } from '../page/actions'
import { addMessage } from '../messages/actions'

export function loadProfile(id) {
  return dispatch => fetch(`/api/${id}/profile`, { credentials: 'include' })
  .then((response) => {
    switch (response.status) {
      case 200:
        response.json().then(profile => dispatch(setPage(PROFILE, profile)))
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

// import User from '../../db/schema/User'
//     User.findOne({ _id: id }).then((user) => {
//       dispatch(setPage(PROFILE, user))
//     })
