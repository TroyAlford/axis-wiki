import { application as config } from '../../config.json'
import { application as defaults } from '../../defaults.json'

import {
  PAGE_TITLE,
} from './actions'

const default_state = { ...defaults, ...config }

export default (state = default_state, action) => {
  switch (action.type) {
    case PAGE_TITLE:
      return { ...state, title: action.title }
    default:
      return state;
  }
}
