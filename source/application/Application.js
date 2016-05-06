import React           from 'react'
import ReactDOM        from 'react-dom'
import { Provider }    from 'react-redux'
import { Redirect, Route, Router, browserHistory } from 'react-router'
import { createStore } from 'redux'

import appState        from '../reducers'

import Layout          from './Layout'
import NotFound        from '../pages/NotFound'
import Article         from '../pages/Article'
import Media           from '../pages/Media'
import Profile         from '../pages/Profile'
import Upload          from '../pages/Upload'

const store              = createStore(appState)
const applicationElement = document.getElementById('application')

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/page/home" />
      <Route path="/" component={Layout}>
        <Route path="/page/:slug" component={Article} />
        <Route path="/info/media/:filename" component={Media} />
        <Route path="/profile" component={Profile} />
        <Route path="/upload" component={Upload} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
, applicationElement)
