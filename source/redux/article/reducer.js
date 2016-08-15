import {
  ARTICLE_LOAD,
  ARTICLE_LOADED,
  ARTICLE_LOADING
} from './actions'

const default_state = {
  aliases: [],
  children: [],
  data: [],
  html: '',
  missing_links: [],
  tags: []
}

export default (state = default_state, action) => {
  const { slug } = action;
  switch (action.type) {
    case ARTICLE_LOADING:
      return { ...default_state, slug, loading: true }
    case ARTICLE_LOADED:
      return { ...default_state, slug, ...action.article, loading: false }
    default:
      return state
  }
}
