import _                     from 'lodash'
import fetch                 from 'isomorphic-fetch'
import { browserHistory }    from 'react-router'

export const ARTICLE_LOAD    = 'article.load';
export const ARTICLE_LOADING = 'article.loading';
export const ARTICLE_LOADED  = 'article.loaded';

export function loadArticle(requested_slug) {
  return dispatch => {
    dispatch(loadingArticle(requested_slug))

    let slug = requested_slug;
    return fetch(`/api/page/${requested_slug}`)
      .then(response => {
        slug = _(response.url).split('/').last();
        return response.json();
      })
      .then(json => dispatch(loadedArticle(slug, json)))
    ;
  }
}

export function loadingArticle(slug) {
  return {
    type: ARTICLE_LOADING,
    slug
  }
}

export function loadedArticle(slug, article) {
  browserHistory.push(`/page/${slug}`)
  return {
    type: ARTICLE_LOADED,
    slug,
    article
  }
}
