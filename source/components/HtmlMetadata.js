import _              from 'lodash'
import { connect }    from 'react-redux'
import Helmet         from 'react-helmet'

export default connect(
  (state) => {
    return {
      defaultTitle: 'Welcome',
      titleTemplate: `%s - ${state.application.name}`,
      title: state.article.title || _(state.article.slug).capitalize(),
      meta: [
        // { 'name': 'description', 'content': state.article.description },
        { 'name': 'keywords',    'content': [...state.article.tags, state.article.slug] }
      ]
    }
  }
)(Helmet)