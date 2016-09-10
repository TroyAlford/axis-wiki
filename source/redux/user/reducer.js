import {
  USER_PROFILE,
  USER_LOGOFF,
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

    case USER_PROFILE:
      if (!action.profile) return default_state

      const { id, name, email, picture, privileges } = action.profile
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
