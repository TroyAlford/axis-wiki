import {
  SHEET_LOAD,
  SHEET_LOADED,
  SHEET_LOADING
} from './actions'

const default_state = {
  slug: '',
  ownerId: undefined,

  armor: [],
  attributes: [],
  descriptors: [],
  skills: [],
  traits: [],
  weapons: [],
}

export default (state = default_state, action) => {
  const { sheet, slug, ownerId } = action;
  switch (action.type) {
    case SHEET_LOADING:
      return { ...default_state, slug, ownerId, loading: true }
    case SHEET_LOADED:
      return { ...default_state, slug, ...sheet, ownerId, loading: false }
    default:
      return state
  }
}
