import {
  MESSAGE_ADD,
  MESSAGE_CLEARALL,
  MESSAGE_DISMISS
} from './actions'

const default_state = []

export default (state = default_state, action) => {
  switch (action.type) {
    case MESSAGE_ADD:
      return [...state.messages, action.message]
    case MESSAGE_DISMISS:
      return [
        ...state.messages.slice(0, action.id - 1), 
        ...state.messages.slice(action.id + 1)
      ]
    case MESSAGE_CLEARALL:
      return default_state
    default:
      return state
  }
}
