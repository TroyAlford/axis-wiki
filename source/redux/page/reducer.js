import {
  ARTICLE, PICTURE, PROFILE, SEARCH,
  METADATA,
  LOADING,
} from './actions'

const DEFAULTS = {
  type: ARTICLE,
  slug: 'home',

  aliases:  [],
  children: [],
  data:     [],
  html:     '',
  tags:     [],

  missing_links: [],
}

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

    case LOADING:
      return {
        ...state,
        loading: true,
        type:    'loading',
      }

    case ARTICLE:
    case PICTURE:
    case PROFILE:
    case SEARCH:
      return {
        // ...state,
        ...action.data,
        loading: false,
        type:    action.type,
      }

    default:
      return state
  }
}
