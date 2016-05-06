import { connect }    from 'react-redux'
import Helmet         from 'react-helmet'

export default connect(
  (state) => {
    let tags = state.article ? state.article.tags : [];

    return {
      defaultTitle: 'Welcome',
      titleTemplate: `%s - ${state.application.name}`,
      title: state.page.title,
      meta: [
        { 'name': 'description', 'content': state.page.description },
        { 'name': 'keywords',    'content': [...tags, state.page.title] }
      ]
    }
  },
  (dispatch) => { return {}; }
)(Helmet)