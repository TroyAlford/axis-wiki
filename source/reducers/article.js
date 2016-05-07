import {
  ARTICLE_LOAD,
  ARTICLE_LOADED,
  ARTICLE_LOADING
} from '../actions/article'

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
      return Object.assign(
        { slug }, 
        default_state,
      )
    case ARTICLE_LOADED:
      return Object.assign(
        { slug }, 
        default_state,
        action.article
      )
    default:
      return state
  }
}