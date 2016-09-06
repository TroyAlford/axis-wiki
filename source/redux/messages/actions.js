export const
  MESSAGE_ADD      = 'msg.add',
  MESSAGE_CLEARALL = 'msg.clear-all',
  MESSAGE_DISMISS  = 'msg.dismiss'
;

export function addMessage(message) {
  return {
    type: MESSAGE_ADD,
    message
  }
}

export function clearMessages() {
  return {
    type: MESSAGE_CLEARALL
  }
}

export function dismissMessage(id) {
  return {
    type: MESSAGE_DISMISS,
    id
  }
}
