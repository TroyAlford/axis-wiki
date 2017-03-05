import { browserHistory } from 'react-router'

export const USER_PROFILE = 'user.profile'
export const USER_LOGOFF = 'user.logoff'

export function loadProfile() {
  return (dispatch =>
    fetch('/api/my/profile', { credentials: 'include' })
    .then(response => {
      switch (response.status) {
        case 200:
          return response.json()
        default:
          throw response.json()
      }
    }).then(json => json.id
      ? dispatch(setProfile(json))
      : dispatch(setLoggedOff())
    ).catch(error => dispatch(setLoggedOff()))
  )
}

export function updateProfile(profile) {
  return (dispatch =>
    fetch('/api/my/profile', {
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      method: 'POST',
      mode: 'cors',
    }).then(response => {
      if (response.status === 200 /* OK */)
        return response.json()
      else
        throw response.json()
    }).then(profile => {
      dispatch(setProfile(profile))
    }).catch(error => {
      console.warn('Error retrieving profile:', error)
    })
  )
}

export function setLoggedOff() {
  return { type: USER_LOGOFF }
}

export function setProfile(profile) {
  return {
    type: USER_PROFILE,
    profile,
  }
}
