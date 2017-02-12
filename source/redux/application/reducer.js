import config from '../../../config/config'
import {
  PAGE_METADATA,
} from './actions'

const default_state = config.application

export default (state = default_state, action) => {
  switch (action.type) {
    case PAGE_METADATA:
      return {
        ...state,
        title: action.title,
        keywords: action.keywords,
      }
    default:
      return state
  }
}
