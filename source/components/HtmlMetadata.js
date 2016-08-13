import { connect }    from 'react-redux'
import Helmet         from 'react-helmet'
import startCase      from 'lodash/startCase'

export default connect(
  (state) => {
    return {
      defaultTitle: 'Welcome',
      titleTemplate: `%s - ${state.application.name}`,
      title: state.article.title || startCase(state.article.slug),
      meta: [
        // { 'name': 'description', 'content': state.article.description },
        { 'name': 'keywords',    'content': [...state.article.tags, state.article.slug] }
      ]
    }
  }
)(Helmet)
