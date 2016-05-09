import {
  USER_LOGON,
  USER_LOGOFF,
  USER_UPDATE
} from '../actions/user'

const default_state = {
  anonymous: true,
  id: '',
  email: '',
  name: '',
  picture: {},
  privileges: ['read']
}

export default (state = default_state, action) => {
  const { id, name, email, picture } = action;
  switch (action.type) {
    case USER_LOGON:
      return Object.assign({}, 
        state, { anonymous: false }
      )
    case USER_UPDATE:
      return Object.assign({},
        default_state,
        { id, email, name, picture }
      )
    case USER_LOGOFF:
      return Object.assign({}, 
        default_state, { anonymous: true }
      )
    default:
      return state
  }
}