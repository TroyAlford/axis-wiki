import {
  ARTICLE, PICTURE, PROFILE, SEARCH,
  FAVORITE,
  METADATA,
  LOADING,

  getLayout,
  LAYOUT, SMALL, MEDIUM, LARGE,
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

  layout: getLayout(),
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

    case FAVORITE:
      if (action.slug === state.slug) {
        return { ...state, isFavorite: action.value }
      }
      return state

    case ARTICLE:
    case PICTURE:
    case PROFILE:
    case SEARCH:
      return {
        // ...state,
        ...action.data,
        layout:  state.layout,
        loading: false,
        type:    action.type,
      }

    case LAYOUT:
      return { ...state, layout: action.layout }

    default:
      return state
  }
}
