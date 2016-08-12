import _                     from 'lodash'
import fetch                 from 'isomorphic-fetch'
import { browserHistory }    from 'react-router'

export const USER_LOGON      = 'user.logon'
export const USER_LOGOFF     = 'user.logoff'
export const USER_UPDATE     = 'user.update'

export function logon() {
  return dispatch => fetch('/api/my/profile', { credentials: 'include' })
    .then(response => response.json())
    .then(json => {
      if (!json.id) // User does not have a profile set up yet. Create it!
        FB.api('/me', { fields: 'name,email,picture.width(250)' }, fb_profile => {
          fetch('/api/my/profile', {
            body: JSON.stringify(fb_profile),
            credentials: 'include',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }),
            method: 'POST',
            mode: 'cors'
          })
          .then(response => response.json())
          .then(json => dispatch(updateUserInfo(json)))
        })
      else
        dispatch(updateUserInfo(json))
    })
}

export function logoff() {
  return { type: USER_LOGOFF }
}

export function setAnonymous() {
  return updateUserInfo(null)
}

export function updateUserInfo(user) {
  return {
    type: USER_UPDATE,
    user
  }
}
