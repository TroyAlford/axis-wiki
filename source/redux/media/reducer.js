import {
  MEDIA_LOADED
} from './actions'

const default_state = {
  uri: '',
  author: '',
  description: '',
  usage_rights: ''
}

export default (state = default_state, action) => {
  switch (action.type) {
    case MEDIA_LOADED:
      return { ...default_state, ...action.media }
    default:
      return state
  }
}
