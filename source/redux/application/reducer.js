import { application as config } from '../../config.json'
import { application as defaults } from '../../defaults.json'

import {
  PAGE_METADATA,
} from './actions'

const default_state = { ...defaults, ...config }

export default (state = default_state, action) => {
  switch (action.type) {
    case PAGE_METADATA:
      return {
        ...state,
        title: action.title,
        keywords: action.keywords
      }
    default:
      return state;
  }
}
