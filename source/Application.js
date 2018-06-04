import '@babel/polyfill'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Observer } from 'mobx-react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import ApplicationState from '@models/ApplicationState'
import Article from '@source/pages/Article'
import ArticlePage from '@models/ArticlePage'
import HtmlMetadata from '@components/HtmlMetadata'
import Media from '@source/pages/Media'
import MediaPage from '@models/MediaPage'
import Navigation from '@components/Navigation'
import NotFound from '@source/pages/NotFound'
import Profile from '@source/pages/Profile'
import ProfilePage from '@models/ProfilePage'
import Search from '@source/pages/Search'
import SearchPage from '@models/SearchPage'
import SiteHeader from '@components/SiteHeader'
import Upload from '@source/pages/Upload'

const appState = ApplicationState.create(window.InitialState || {})
window.appState = appState
window.routerHistory = createBrowserHistory()

appState.setRoute(window.routerHistory.location)
window.routerHistory.listen(route => appState.setRoute(route))

const PageRoute = ({ component: Component, computedMatch, model, ...props }) => {
  if (model) appState.setPage(model, computedMatch.params)
  return <Route {...props} render={() => <Component match={computedMatch} {...appState} />} />
}
PageRoute.displayName = 'PageRoute'

const renderLayoutHeader = () => {
  const { author, description, displayName, keywords, title } = appState.page
  const { showMenu } = appState.viewport

  return (
    <Fragment>
      <input
        id="navigation-menu"
        className="icon icon-menu menu-toggle"
        defaultChecked={showMenu}
        onClick={appState.viewport.toggleMenu}
        type="checkbox"
      />
      <label className="icon icon-menu" htmlFor="navigation-menu" />
      <HtmlMetadata {...{ author, description, keywords, title: title || displayName }} />
      <SiteHeader page={appState.page} user={appState.user} />
      <Navigation menuItems={appState.navigation} current={appState.route} />
    </Fragment>
  )
}

ReactDOM.render(
  <Router history={window.routerHistory}>
    <div className="axis wiki layout">
      <Observer render={renderLayoutHeader} />
      <div className="page-container">
        <Switch>
          <Redirect exact from="/" to="/page/home" />
          {/*
            <Redirect from="/media/:filename" to="/info/media/:filename" />
            TODO: Replace the render() version with the above
              - react-router 3.2.0 does not contain the fix for param mapping, but next version does
              - https://github.com/ReactTraining/react-router/issues/5753#issuecomment-346876235
          */}
          <Route path="/media/:filename"
            render={({ match }) => <Redirect to={`/ info / media / ${match.params.filename}`} />}
          />
          <PageRoute exact path="/profile" component={Profile} model={ProfilePage} />
          <PageRoute exact path="/search" component={Search} model={SearchPage} />
          <PageRoute exact path="/upload" component={Upload} />
          <PageRoute path="/info/media/:filename" component={Media} model={MediaPage} />
          <PageRoute path="/page/:slug" component={Article} model={ArticlePage} />
          <PageRoute path="/profile/:id" component={Profile} model={ProfilePage} />
          <PageRoute path="/search/:term" component={Search} model={SearchPage} />
          <PageRoute component={NotFound} />
        </Switch>
      </div>
    </div>
  </Router>
  , document.getElementById('application')
)
