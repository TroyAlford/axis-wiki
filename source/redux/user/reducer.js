import {
  USER_PROFILE,
  USER_LOGOFF,
} from './actions'

const default_state = {
  anonymous: true,
  id: undefined,
  email: '',
  name: '',
  privileges: ['read']
}

export default (state = default_state, action) => {
  switch (action.type) {

    case USER_PROFILE:
      if (!action.profile) return default_state

      const { id, name, email, privileges } = action.profile
      return {
        ...state,
        id, email, name,
        anonymous: false,
        privileges: privileges || ['read'],
      }

    case USER_LOGOFF:
      return {
        ...default_state,
        anonymous: true,
        privileges: privileges || ['read'],
      }

    default:
      return state

  }
}
