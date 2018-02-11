import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Redirect, Route, Switch } from 'react-router-dom'

import ApplicationState from '../../models/ApplicationState'
import Layout from '../application/Layout'
import NotFound from '../pages/NotFound'
import Article from '../pages/Article'
import Media from '../pages/Media'
import Profile from '../pages/Profile'
import Search from '../pages/Search'
import Upload from '../pages/Upload'

const appState = ApplicationState.create()
const applicationElement = document.getElementById('application')
window.routerHistory = createBrowserHistory()

const BoundRoute = ({ component: Component, ...props }) => (
  <Route {...props} render={() => <Component appState={appState} />} />
)

ReactDOM.render(
  <Router history={window.routerHistory}>
    <Layout appState={appState}>
      <Switch>
        <Route exact path="/">
          <Redirect to={{ pathname: '/page/home' }} />
        </Route>
        <BoundRoute exact path="/profile" component={Profile} />
        <BoundRoute exact path="/search" component={Search} />
        <BoundRoute exact path="/upload" component={Upload} />
        <BoundRoute path="/info/media/:filename" component={Media} />
        <BoundRoute path="/page/:slug" component={Article} />
        <BoundRoute path="/profile/:id" component={Profile} />
        <BoundRoute path="/search/:term" component={Search} />
        <BoundRoute component={NotFound} />
      </Switch>
    </Layout>
  </Router>
  , applicationElement
)

// <Route path="/media/:filename"><Redirect to={{ pathname: '/info/media/:filename' }} /></Route>
