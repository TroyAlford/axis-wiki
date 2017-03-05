import {
  USER_PROFILE,
  USER_LOGOFF,
} from './actions'

const DEFAULTS = {
  id:         undefined,
  anonymous:  true,
  email:      '',
  name:       '',
  privileges: ['read'],
}

export default (state = DEFAULTS, action) => {
  switch (action.type) {

    case USER_PROFILE:
      if (!action.profile) return DEFAULTS

      const { id, name, email, privileges } = action.profile
      return {
        ...state,
        id,
        email,
        name,
        anonymous:  false,
        privileges: privileges || ['read'],
      }

    case USER_LOGOFF:
      return {
        ...DEFAULTS,
        anonymous:  true,
        privileges: privileges || ['read'],
      }

    default:
      return state

  }
}
