import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'
import { addMessage } from '../messages/actions'

export const
  SHEET_LOAD = 'sheet.load',
  SHEET_LOADED = 'sheet.loaded',
  SHEET_LOADING = 'sheet.loading'
;

const parser  = document.createElement('a');
const buildUrl = (slug, ownerId = undefined) => {
  return ownerId
    ? `/api/by/${ownerId}/sheet/${slug}`
    : `/api/my/sheet/${slug}`
}

export function loadSheet(requested_slug, ownerId = undefined) {
  return dispatch => {
    dispatch(loadingSheet(requested_slug, ownerId))

    let slug = requested_slug;
    return fetch(buildUrl(slug, ownerId), { credentials: 'include' })
      .then(response => {
        slug = response.url.split('/').pop()
        return response.json()
      })
      .then(json => dispatch(loadedSheet(slug, json, ownerId)))
  }
}

export function loadingSheet(slug, ownerId = undefined) {
  return {
    type: SHEET_LOADING,
    ownerId,
    slug
  }
}

export function loadedSheet(slug, sheet, ownerId = undefined) {
  return {
    type: SHEET_LOADED,
    ownerId,
    slug,
    sheet
  }
}

export function deleteSheet(slug, ownerId = undefined) {
  return dispatch => {
    return fetch(buildUrl(slug, ownerId), {
      credentials: 'include',
      method: 'DELETE'
    }).then(response => {
      if (response.status == 410 /* Deleted */) {
        dispatch(addMessage(`Sheet ${slug} was successfully deleted!`))
      } else if (response.status == 401 /* Unauthorized */)
        dispatch(addMessage(`Your account does not have permission to delete the '${slug}' sheet.`))
      else if (response.status == 500 /* Internal Server Error */)
        dispatch(addMessage(`An error occurred while attempting to delete the '${slug}' sheet. Please try again.`))
    })
  }
}

export function saveSheet(slug, article, ownerId = undefined) {
  return dispatch => {
    return fetch(buildUrl(slug, ownerId), {
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
        dispatch(loadSheet(slug))
      } else if (response.status == 401 /* Unauthorized */)
        dispatch(addMessage(`Your account does not have permission to update the '${slug}' sheet.`))
      else if (response.status == 500 /* Internal Server Error */)
        dispatch(addMessage(`An error occurred while attempting to save the '${slug}' sheet. Please try again.`))
    })
  }
}
