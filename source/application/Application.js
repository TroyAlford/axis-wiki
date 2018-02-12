import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Observer } from 'mobx-react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import HtmlMetadata from '../components/HtmlMetadata'
import Navigation from '../components/Navigation'
import SiteHeader from '../components/SiteHeader'

import ApplicationState from '../../models/ApplicationState'
import NotFound from '../pages/NotFound'
import Article from '../pages/Article'
import Media from '../pages/Media'
import Profile from '../pages/Profile'
import Search from '../pages/Search'
import Upload from '../pages/Upload'

const appState = ApplicationState.create(window.InitialState || {})
window.appState = appState
window.routerHistory = createBrowserHistory()

appState.setRoute(window.routerHistory.location)
window.routerHistory.listen(route => appState.setRoute(route))

const PageRoute = ({ component: Component, ...props }) => {
  const { page, ...rest } = appState
  return <Route {...props} render={() => <Component {...page} {...rest} />} />
}
PageRoute.displayName = 'PageRoute'

const renderLayoutHeader = () => (
  <Fragment>
    <HtmlMetadata page={appState.page} />
    <SiteHeader user={appState.user} />
    <Navigation menuItems={appState.navigation} current={appState.route} />
  </Fragment>
)

ReactDOM.render(
  <Router history={window.routerHistory}>
    <div className="layout">
      <Observer render={renderLayoutHeader} />
      <div className="page-container">
        <Switch>
          <Route exact path="/">
            <Redirect to={{ pathname: '/page/home' }} />
          </Route>
          <Route path="/media/:filename">
            <Redirect to={{ pathname: '/info/media/:filename' }} />
          </Route>
          <PageRoute exact path="/profile" component={Profile} />
          <PageRoute exact path="/search" component={Search} />
          <PageRoute exact path="/upload" component={Upload} />
          <PageRoute path="/info/media/:filename" component={Media} />
          <PageRoute path="/page/:slug" component={Article} />
          <PageRoute path="/profile/:id" component={Profile} />
          <PageRoute path="/search/:term" component={Search} />
          <PageRoute component={NotFound} />
        </Switch>
      </div>
    </div>
  </Router>
  , document.getElementById('application')
)
