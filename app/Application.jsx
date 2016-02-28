import React    from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Router, browserHistory } from 'react-router';

import Layout     from './modules/Layout';
import About      from './modules/About';
import Article    from './modules/Article';
import TagBrowser from './modules/TagBrowser';

ReactDOM.render((
  <Router history={browserHistory}>
    <Redirect from="/" to="/w/home" />
    <Route path="/" component={Layout}>
      <Route path="/w/:slug" component={Article} />
      <Route path="/tagged/:tag" component={TagBrowser} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
), document.getElementById('application'));