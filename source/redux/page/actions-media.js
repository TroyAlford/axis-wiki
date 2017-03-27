import { loadArticle } from './actions-article'
import { addMessage } from '../messages/actions'

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
