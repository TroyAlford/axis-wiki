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

const parser  = document.createElement('a');

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
        dispatch(addMessage(`Your account does not have permission to delete the '${slug}' article.`))
      else if (response.status == 500 /* Internal Server Error */)
        dispatch(addMessage(`An error occurred while attempting to delete the '${slug}' article. Please try again.`))
    })
  }
}

export function saveArticle(slug, article) {
  return dispatch => {
    return fetch(`/api/page/${slug}`, {
      body: JSON.stringify(article),
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      method: 'POST',
      mode: 'cors'
    }).then(response => {
      if (response.status == 200 /* OK */) {
        dispatch(loadArticle(slug))
      } else if (response.status == 401 /* Unauthorized */)
        dispatch(addMessage(`Your account does not have permission to update the '${slug}' article.`))
      else if (response.status == 500 /* Internal Server Error */)
        dispatch(addMessage(`An error occurred while attempting to save the '${slug}' article. Please try again.`))
    })
  }
}