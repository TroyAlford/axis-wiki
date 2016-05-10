import React           from 'react'
import ReactDOM        from 'react-dom'
import { Provider }    from 'react-redux'
import { Redirect, Route, Router, browserHistory } from 'react-router'
import { createStore } from 'redux'

import reducer         from '../reducers'

import Layout          from '../application/Layout'
import NotFound        from '../pages/NotFound'
import Article         from '../pages/Article'
import Media           from '../pages/Media'
import Profile         from '../pages/Profile'
import Search          from '../pages/Search'
import Sheet           from '../pages/Sheet'
import Upload          from '../pages/Upload'

const applicationElement = document.getElementById('application')

ReactDOM.render(
  <Provider store={reducer}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/page/home" />
      <Route path="/" component={Layout}>
        <Route path="/page/:slug" component={Article} />
        <Route path="/info/media/:filename" component={Media} />
        <Route path="/profile" component={Profile} />
        <Route path="/search/:term" component={Search} />
        <Route path="/sheet/:slug" component={Sheet} />
        <Route path="/upload" component={Upload} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
, applicationElement)
