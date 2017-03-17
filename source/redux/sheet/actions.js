import { filter, includes, startCase } from 'lodash'
import { addMessage } from '../messages/actions'
import { setMetadata } from '../page/actions'

export const SHEET_LOAD = 'sheet.load'
export const SHEET_LOADED = 'sheet.loaded'
export const SHEET_LOADING = 'sheet.loading'

const buildUrl = (slug, ownerId = undefined) => (
  ownerId ? `/api/by/${ownerId}/sheet/${slug}` : `/api/my/sheet/${slug}`
)

export function loadingSheet(slug, ownerId = undefined) {
  return {
    type: SHEET_LOADING,
    ownerId,
    slug,
  }
}

export function loadedSheet(slug, sheet, ownerId = undefined) {
  return {
    type: SHEET_LOADED,
    ownerId,
    slug,
    sheet,
  }
}

export function loadSheet(requestedSlug, ownerId = undefined) {
  return (dispatch) => {
    dispatch(loadingSheet(requestedSlug, ownerId))

    let slug = requestedSlug
    return fetch(buildUrl(slug, ownerId), { credentials: 'include' })
      .then((response) => {
        slug = response.url.split('/').pop()
        return response.json()
      })
      .then((json) => {
        const title = json.name || startCase(slug)
        const keywords = [
          ...filter(json.descriptors, descriptor =>
            includes(['homeland', 'race'], descriptor.key)
          ).map(descriptor => descriptor.value),
          'character', title,
        ]
        dispatch(setMetadata({ title, keywords }))
        dispatch(loadedSheet(slug, json, ownerId))
      })
  }
}

export function deleteSheet(slug, ownerId = undefined) {
  return dispatch => fetch(buildUrl(slug, ownerId), {
    credentials: 'include',
    method:      'DELETE',
  }).then((response) => {
    if (response.status === 410 /* Deleted */) {
      dispatch(addMessage(`Sheet ${slug} was successfully deleted!`))
    } else if (response.status === 401 /* Unauthorized */) {
      dispatch(addMessage(`Your account does not have permission to delete the '${slug}' sheet.`))
    } else if (response.status === 500 /* Internal Server Error */) {
      dispatch(addMessage(`An error occurred while attempting to delete the '${slug}' sheet. Please try again.`))
    }
  })
}

export function saveSheet(slug, article, ownerId = undefined) {
  return dispatch => fetch(buildUrl(slug, ownerId), {
    body:        JSON.stringify(article),
    credentials: 'include',
    method:      'POST',
    mode:        'cors',

    headers: new Headers({
      'Content-Type': 'application/json',
      Accept:         'application/json',
    }),
  }).then((response) => {
    if (response.status === 200 /* OK */) {
      dispatch(loadSheet(slug))
    } else if (response.status === 401 /* Unauthorized */) {
      dispatch(addMessage(`Your account does not have permission to update the '${slug}' sheet.`))
    } else if (response.status === 500 /* Internal Server Error */) {
      dispatch(addMessage(`An error occurred while attempting to save the '${slug}' sheet. Please try again.`))
    }
  })
}
