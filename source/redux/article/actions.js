import fetch from 'isomorphic-fetch'
import { addMessage } from '../messages/actions'
import { browserHistory } from 'react-router'
import { setMetadata } from '../application/actions'
import { startCase } from 'lodash'
import { Extract } from '../../../utility/Slugs'

export const
  ARTICLE_LOAD = 'article.load',
  ARTICLE_LOADED = 'article.loaded',
  ARTICLE_LOADING = 'article.loading'
;

const parser  = document.createElement('a');

export function loadArticle(requested_slug) {
  return dispatch => {
    dispatch(loadingArticle(requested_slug))

    let slug = requested_slug;
    return fetch(`/api/page/${requested_slug}`, { credentials: 'include' })
      .then(response => {
        slug = Extract(response.url)
        return response.json()
      })
      .then(json => {
        const title = startCase(slug)
        const keywords = [...json.aliases, ...json.tags, title]
        dispatch(setMetadata(title, keywords))
        dispatch(loadedArticle(slug, json))
      })
  }
}

export function loadingArticle(slug) {
  return {
    type: ARTICLE_LOADING,
    slug
  }
}

export function loadedArticle(slug, article) {
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
