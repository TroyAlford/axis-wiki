import * as React           from 'react'
import * as ReactDOM       from 'react-dom'
import { Provider }    from 'react-redux'
import { Redirect, Route, Router, browserHistory } from 'react-router'
import { createStore } from 'redux'

import store           from '../redux/store'

import Layout          from '../application/Layout'
import NotFound        from '../pages/NotFound'
import Article         from '../pages/Article'
import Media           from '../pages/Media'
import Search          from '../pages/Search'
import Sheet           from '../pages/Sheet'
import Upload          from '../pages/Upload'

const applicationElement = document.getElementById('application')

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/page/home" />
      <Redirect from="/media/:filename" to="/info/media/:filename" />
      <Route path="/" component={Layout}>
        <Route path="/page/:slug" component={Article} />
        <Route path="/info/media/:filename" component={Media} />
        <Route path="/search/:term" component={Search} />
        <Route path="/search" component={Search} />
        <Route path="/sheet/:slug" component={Sheet} />
        <Route path="/upload" component={Upload} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
, applicationElement)
