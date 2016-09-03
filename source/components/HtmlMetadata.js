import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { startCase } from 'lodash'

export default connect(
  state => {
    return {
      defaultTitle: 'Welcome',
      titleTemplate: `%s - ${state.application.name}`,
      title: state.application.title,
      meta: [
        // { 'name': 'description', 'content': state.article.description },
        { 'name': 'keywords', 'content': state.application.keywords }
      ]
    }
  }
)(Helmet)
