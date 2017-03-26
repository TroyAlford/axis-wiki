import { setPage, PICTURE } from '../page/actions'
import { loadArticle } from './actions-article'
import { addMessage } from '../messages/actions'

export const MEDIA_DELETE = 'media.delete'
export const MEDIA_LOAD = 'media.load'

export function loadMedia(filename) {
  return dispatch => fetch(`/api/media/${filename}`, { credentials: 'include' })
    .then(response => response.json())
    .then(media => dispatch(setPage(PICTURE, { ...media, title: filename, keywords: [] })))
}

export function deleteMedia(filename) {
  return dispatch => fetch(`/api/media/${filename}`, {
    credentials: 'include',
    method:      'DELETE',
  }).then((response) => {
    if (response.status === 410 /* Deleted */) {
      dispatch(loadArticle('home'))
      dispatch(addMessage(`Media file '${filename}' was successfully deleted!`))
    } else if (response.status === 401 /* Unauthorized */) {
      dispatch(addMessage(`Your account does not have permission to delete media file '${filename}'.`))
    } else if (response.status === 500 /* Internal Server Error */) {
      dispatch(addMessage(`An error occurred while attempting to delete media file '${filename}'. Please try again.`))
    }
  })
}
