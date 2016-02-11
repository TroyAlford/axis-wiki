import React    from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Router, browserHistory } from 'react-router';

import App     from './modules/App';
import About   from './modules/About';
import Article from './modules/Article';

ReactDOM.render((
  <Router history={browserHistory}>
    <Redirect from="/" to="/w/home" />
    <Route path="/" component={App}>
      <Route path="/w/:slug" component={Article} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
), document.getElementById('application'));