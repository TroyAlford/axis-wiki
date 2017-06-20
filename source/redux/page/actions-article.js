import { browserHistory } from 'react-router'
import { startCase } from 'lodash'
import { addMessage } from '../messages/actions'
import { setPage, ARTICLE, FAVORITE, LOADING } from '../page/actions'
import { extractSlug } from '../../../utility/Slugs'

export function loadArticle(requestedSlug, flashLoading = true) {
  return (dispatch) => {
    if (flashLoading) dispatch({ type: LOADING, slug: requestedSlug })

    let slug = requestedSlug
    fetch(`/api/page/${requestedSlug}`, { credentials: 'include' })
      .then((response) => {
        slug = extractSlug(response.url)
        if (slug !== requestedSlug) {
          browserHistory.replace(`/page/${slug}`)
        } else {
          browserHistory.replace(`/page/${requestedSlug}`)
        }
        return response.json()
      })
      .then((article) => {
        const title = article.title || startCase(slug)
        const keywords = [
          ...(article.aliases || []),
          ...(article.tags || []),
          title,
        ]
        dispatch(setPage(ARTICLE, { ...article, slug, title, keywords }))
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
    /* eslint-disable no-throw-literal */
    if (response.status === 200 /* OK */) {
      return response.json()
    } else if (response.status === 401 /* Unauthorized */) {
      throw ({ status: 401, message: `Your account does not have permission to update the '${slug}' article.` })
    } else if (response.status === 500 /* Internal Server Error */) {
      throw ({ status: 500, message: `An error occurred while attempting to save the '${slug}' article. Please try again.` })
    }

    return {}
  }).then(updated => dispatch(setPage(ARTICLE, updated)))
    .catch((error) => {
      if (error && error.message) dispatch(addMessage(error.message))
    })
}

export function setFavorite({ slug, value }) {
  return dispatch => fetch('/api/my/favorites', {
    body: JSON.stringify({ slug, value }),

    credentials: 'include',
    method:      'POST',
    mode:        'cors',

    headers: new Headers({
      'Content-Type': 'application/json',
      Accept:         'application/json',
    }),
  }).then((response) => {
    if (response.status === 200 /* OK */) {
      return response.json()
    }

    throw ({ status: response.status })
  }).then(updated =>
    dispatch({
      type:  FAVORITE,
      slug:  updated.slug,
      value: updated.value,
    })
    .catch(() => dispatch(addMessage(`Unable to ${value ? 'add' : 'remove'} Favorite for ${slug}`)))
  )
}
