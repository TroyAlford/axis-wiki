import { application }     from '../../config/config.json'

const default_state = Object.assign({}, {
  name: ''
}, application)

export default (state = default_state, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return action.title;
    default:
      return state;
  }
}
