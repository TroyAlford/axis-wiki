import { startCase } from 'lodash'
import { addMessage } from '../messages/actions'
import { setMetadata } from '../page/actions'
import { extractSlug } from '../../../utility/Slugs'

export const ARTICLE_LOAD = 'article.load'
export const ARTICLE_LOADED = 'article.loaded'
export const ARTICLE_LOADING = 'article.loading'

export function loadingArticle(slug) {
  return {
    type: ARTICLE_LOADING,
    slug,
  }
}

export function loadedArticle(slug, article) {
  return {
    type: ARTICLE_LOADED,
    slug,
    article,
  }
}

export function loadArticle(requestedSlug, flashLoading = true) {
  return (dispatch) => {
    if (flashLoading) dispatch(loadingArticle(requestedSlug))

    let slug = requestedSlug
    return fetch(`/api/page/${requestedSlug}`, { credentials: 'include' })
      .then((response) => {
        slug = extractSlug(response.url)
        return response.json()
      })
      .then((json) => {
        const title = json.title || startCase(slug)
        const keywords = [
          ...(json.aliases || []),
          ...(json.tags || []),
          title,
        ]
        dispatch(setMetadata({ title, keywords }))
        dispatch(loadedArticle(slug, json))
      })
  }
}

export function deleteArticle(slug) {
  return dispatch => fetch(`/api/page/${slug}`, {
    credentials: 'include',
    method:      'DELETE',
  }).then((response) => {
    if (response.status === 410 /* Deleted */) {
      dispatch(loadArticle('home'))
      dispatch(addMessage(`Article ${slug} was successfully deleted!`))
    } else if (response.status === 401 /* Unauthorized */) {
      dispatch(addMessage(`Your account does not have permission to delete the '${slug}' article.`))
    } else if (response.status === 500 /* Internal Server Error */) {
      dispatch(addMessage(`An error occurred while attempting to delete the '${slug}' article. Please try again.`))
    }
  })
}

export function saveArticle(slug, article) {
  return dispatch => fetch(`/api/page/${slug}`, {
    body: JSON.stringify(article),

    credentials: 'include',
    method:      'POST',
    mode:        'cors',

    headers: new Headers({
      'Content-Type': 'application/json',
      Accept:         'application/json',
    }),
  }).then((response) => {
    if (response.status === 200 /* OK */) {
      dispatch(loadArticle(slug, false))
    } else if (response.status === 401 /* Unauthorized */) {
      dispatch(addMessage(`Your account does not have permission to update the '${slug}' article.`))
    } else if (response.status === 500 /* Internal Server Error */) {
      dispatch(addMessage(`An error occurred while attempting to save the '${slug}' article. Please try again.`))
    }
  })
}
