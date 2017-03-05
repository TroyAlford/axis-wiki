import Helmet from 'react-helmet'
import { connect } from 'react-redux'

export default connect(
  (state) => {
    return {
      defaultTitle:  'Welcome',
      titleTemplate: `%s - ${state.config.application.name}`,
      title:         state.page.title,

      meta: [{
        name:    'keywords',
        content: state.page.keywords,
      }],
    }
  }
)(Helmet)
