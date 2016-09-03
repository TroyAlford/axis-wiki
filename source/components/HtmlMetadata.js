import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { startCase } from 'lodash'

export default connect(
  state => {
    return {
      defaultTitle: 'Welcome',
      titleTemplate: `%s - ${state.application.name}`,
      title: state.application.title,
      meta: [
        { 'name': 'keywords', 'content': state.application.keywords }
      ]
    }
  }
)(Helmet)
