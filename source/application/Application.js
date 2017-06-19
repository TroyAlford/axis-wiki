import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Redirect, Route, Router, browserHistory } from 'react-router'

import store from '../redux/store'
import { loadArticle } from '../redux/page/actions-article'
import { loadProfile } from '../redux/page/actions-profile'
import { searchFor } from '../redux/page/actions-search'

import Layout from '../application/Layout'
import NotFound from '../pages/NotFound'
import Article from '../pages/Article'
import Media from '../pages/Media'
import Profile from '../pages/Profile'
import Search from '../pages/Search'
import Upload from '../pages/Upload'

const applicationElement = document.getElementById('application')

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/page/home" />
      <Redirect from="/media/:filename" to="/info/media/:filename" />
      <Route path="/" component={Layout}>
        <Route path="/page/:slug" component={Article}
          onEnter={state => store.dispatch(loadArticle(state.params.slug))}
        />
        <Route path="/:id/profile" component={Profile}
          onEnter={state => store.dispatch(loadProfile(state.params.id))}
        />
        <Route path="/info/media/:filename" component={Media} />
        <Route path="/search/:term" component={Search}
          onEnter={state => store.dispatch(searchFor(state.params.term))}
        />
        <Route path="/search" component={Search} />
        <Route path="/upload" component={Upload} />

        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
, applicationElement)
