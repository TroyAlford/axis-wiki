import { browserHistory } from 'react-router'
import { startCase } from 'lodash'
import { addMessage } from '../messages/actions'
import { setPage, ARTICLE, LOADING } from '../page/actions'
import { extractSlug } from '../../../utility/Slugs'

export function loadArticle(requestedSlug, flashLoading = true) {
  return (dispatch) => {
    if (flashLoading) dispatch({ type: LOADING, slug: requestedSlug })

    let slug = requestedSlug
    fetch(`/api/page/${requestedSlug}`, { credentials: 'include' })
      .then((response) => {
        slug = extractSlug(response.url)
        if (slug !== requestedSlug) browserHistory.replace(`/page/${slug}`)
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
    if (response.status === 200 /* OK */) {
      dispatch(loadArticle(slug, false))
    } else if (response.status === 401 /* Unauthorized */) {
      dispatch(addMessage(`Your account does not have permission to update the '${slug}' article.`))
    } else if (response.status === 500 /* Internal Server Error */) {
      dispatch(addMessage(`An error occurred while attempting to save the '${slug}' article. Please try again.`))
    }
  })
}
