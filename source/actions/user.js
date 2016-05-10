import _                     from 'lodash'
import fetch                 from 'isomorphic-fetch'
import { browserHistory }    from 'react-router'

export const USER_LOGON      = 'user.logon'
export const USER_LOGOFF     = 'user.logoff'
export const USER_UPDATE     = 'user.update'

export function logon(profile) {
  return dispatch => fetch('/api/my/profile', { credentials: 'include' })
    .then(response => Object.assign({}, profile, response.json()))
    .then(merged => dispatch(updateUserInfo(merged)))
}

export function logoff() {
  return { type: USER_LOGOFF }
}

export function updateUserInfo(user) {
  return {
    type: USER_UPDATE,
    user
  }
}