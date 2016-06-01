import _                     from 'lodash'
import fetch                 from 'isomorphic-fetch'
import { browserHistory }    from 'react-router'
import { addMessage }       from '../actions/messages'

export const
  ARTICLE_LOAD    = 'article.load',
  ARTICLE_LOADING = 'article.loading',
  ARTICLE_LOADED  = 'article.loaded',
  ARTICLE_DELETE  = 'article.delete'
;

export function loadArticle(requested_slug) {
  return dispatch => {
    dispatch(loadingArticle(requested_slug))

    let slug = requested_slug;
    return fetch(`/api/page/${requested_slug}`, { credentials: 'include' })
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
  if (browserHistory.location !== `/page/${slug}`)
    browserHistory.push(`/page/${slug}`)
  
  return {
    type: ARTICLE_LOADED,
    slug,
    article
  }
}

export function deleteArticle(slug) {
  return dispatch => {
    return fetch(`/api/page/${slug}`, { 
      credentials: 'include',
      method: 'DELETE'
    }).then(response => {
      if (response.status == 410 /* Deleted */) {
        dispatch(loadArticle('home'))
        dispatch(addMessage(`Article ${slug} was successfully deleted!`))
      } else if (response.status == 401 /* Unauthorized */)
        dispatch(addMessage(`You need a higher level of permissions to delete ${slug}. Sorry!`))
      else if (response.status == 500 /* Internal Server Error */)
        dispatch(addMessage(`Unable to delete ${slug}. Internal error - please try again.`))
    })
  }
}