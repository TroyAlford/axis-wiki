import {
  USER_LOGON,
  USER_LOGOFF,
  USER_UPDATE
} from './actions'

const default_state = {
  anonymous: true,
  id: '',
  email: '',
  name: '',
  picture: {},
  privileges: ['read']
}

export default (state = default_state, action) => {
  switch (action.type) {
    case USER_LOGON:
      return { ...state, anonymous: false }
    case USER_UPDATE:
      if (!action.user) return default_state

      const { id, name, email, picture, privileges } = action.user
      return { 
        ...state, 
        anonymous: false, 
        id, email, name, picture, 
        privileges: privileges || ['read'] 
      }
    case USER_LOGOFF:
      return { ...default_state, anonymous: true }
    default:
      return state
  }
}