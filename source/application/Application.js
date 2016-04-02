import React    from 'react'
import ReactDOM from 'react-dom'
import { Redirect, Route, Router, browserHistory } from 'react-router'

import Layout       from '../components/Layout'
import Article      from '../components/Article'
import Media        from '../components/Media'
import TagBrowser   from '../components/TagBrowser'
import FileUploader from '../components/FileUploader'

ReactDOM.render((
  <Router history={browserHistory}>
    <Redirect from="/" to="/page/home" />
    <Route path="/" component={Layout}>
      <Route path="/page/:slug" component={Article} />
      <Route path="/info/media/:filename" component={Media} />
      <Route path="/upload" component={FileUploader} />
    </Route>
  </Router>
), document.getElementById('application'));