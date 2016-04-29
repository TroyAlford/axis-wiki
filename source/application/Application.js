import React    from 'react'
import ReactDOM from 'react-dom'
import { Redirect, Route, Router, browserHistory } from 'react-router'

import Layout       from './Layout'
import NotFound     from '../pages/NotFound'
import Article      from '../pages/Article'
import Media        from '../pages/Media'
import Profile      from '../pages/Profile'
import Sheet        from '../pages/Sheet'
import Upload       from '../pages/Upload'

ReactDOM.render((
  <Router history={browserHistory}>
    <Redirect from="/" to="/page/home" />
    <Route path="/" component={Layout}>
      <Route path="/page/:slug" component={Article} />
      <Route path="/info/media/:filename" component={Media} />
      <Route path="/profile" component={Profile} />
      <Route path="/sheet/:slug" component={Sheet} />
      <Route path="/upload" component={Upload} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('application'));