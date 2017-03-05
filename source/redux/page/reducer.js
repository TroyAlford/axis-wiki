import { PAGE_METADATA } from './actions'

const DEFAULTS = {
  title:    '',
  keywords: [],
}

export default (state = DEFAULTS, action) => {
  switch (action.type) {

    case PAGE_METADATA:
      return {
        ...state,
        title:    action.title,
        keywords: action.keywords,
      }

    default:
      return state
  }
}
