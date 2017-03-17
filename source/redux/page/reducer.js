import {
  ARTICLE, PICTURE, PROFILE, SEARCH,
  DEFAULTS,
  METADATA,
} from './actions'

export default (state = DEFAULTS, action) => {
  switch (action.type) {

    case METADATA:
      return {
        ...state,
        metadata: {
          title:    action.title,
          keywords: action.keywords,
        },
      }

    case ARTICLE:
    case PICTURE:
    case PROFILE:
    case SEARCH:
      return {
        ...state,
        ...DEFAULTS,

        type: action.type,
        ...action[action.type],
      }

    default:
      return state
  }
}
