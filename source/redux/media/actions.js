import { loadArticle } from '../article/actions'
import { addMessage  } from '../messages/actions'

export const
  MEDIA_DELETE     = 'media.delete',
  MEDIA_LOAD       = 'media.load'
;

export function loadMedia(filename) {
  return dispatch => {
    return fetch(`/api/media/${filename}`, { credentials: 'include' })
      .then(response => response.json())
      .then(json => dispatch(loadedMedia(filename, json)))
    ;    
  }
}

export function loadedMedia(filename, media) {
  return {
    type: 'MEDIA_LOADED',
    media: Object.assign({}, { filename: filename }, media)
  }
}

export function deleteMedia(filename) {
  return dispatch => {
    return fetch(`/api/media/${filename}`, { 
      credentials: 'include',
      method: 'DELETE'
    }).then(response => {
      if (response.status == 410 /* Deleted */) {
        dispatch(loadArticle('home'))
        dispatch(addMessage(`Media file '${slug}' was successfully deleted!`))
      } else if (response.status == 401 /* Unauthorized */)
        dispatch(addMessage(`Your account does not have permission to delete media file '${slug}'.`))
      else if (response.status == 500 /* Internal Server Error */)
        dispatch(addMessage(`An error occurred while attempting to delete media file '${slug}'. Please try again.`))
    })
  }
}
