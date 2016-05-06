const default_state = {
  title: ''
}

export default (state = default_state, action) => {
  switch (action.type) {
    case 'SET_PAGE_TITLE':
      return action.title;
    default:
      return state;
  }
}
