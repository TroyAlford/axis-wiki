import { application as config   } from '../../config.json'
import { application as defaults } from '../../defaults.json'

const default_state = Object.assign({}, defaults, config)

export default (state = default_state, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.title }
    default:
      return state;
  }
}
