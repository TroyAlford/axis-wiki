import {
  NAVIGATION_CHANGE,
} from './actions'

const default_state = [{
  text: 'Home',
  url: '/page/home'
}]

export default (state = default_state, action) => {
  switch (action.type) {

    case NAVIGATION_CHANGE:
      return action.navigation || default_state

    default:
      return state

  }
}
