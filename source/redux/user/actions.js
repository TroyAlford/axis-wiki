export const USER_PROFILE = 'user.profile'
export const USER_LOGOFF = 'user.logoff'

export function setLoggedOff() {
  return { type: USER_LOGOFF }
}

export function setProfile(profile) {
  return {
    type: USER_PROFILE,
    profile,
  }
}

export function loadProfile() {
  return (dispatch =>
    fetch('/api/my/profile', { credentials: 'include' })
    .then((response) => {
      switch (response.status) {
        case 200:
          return response.json()
        default:
          throw response.json()
      }
    }).then(json => (json.id
      ? dispatch(setProfile(json))
      : dispatch(setLoggedOff())
    )).catch(() => dispatch(setLoggedOff()))
  )
}

export function updateProfile(profile) {
  return (dispatch =>
    fetch('/api/my/profile', {
      credentials: 'include',
      method:      'POST',
      mode:        'cors',

      body:    JSON.stringify(profile),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept:         'application/json',
      }),
    }).then((response) => {
      if (response.status === 200 /* OK */) {
        return response.json()
      }

      throw response.json()
    }).then((fromServer) => {
      dispatch(setProfile(fromServer))
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.warn('Error retrieving profile:', error)
    })
  )
}
