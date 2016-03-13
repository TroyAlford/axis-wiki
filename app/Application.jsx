import React    from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Router, browserHistory } from 'react-router';

import Layout       from './modules/Layout';
import Article      from './modules/Article';
import TagBrowser   from './modules/TagBrowser';
import FileUploader from './modules/FileUploader';

ReactDOM.render((
  <Router history={browserHistory}>
    <Redirect from="/" to="/page/home" />
    <Route path="/" component={Layout}>
      <Route path="/page/:slug" component={Article} />
      <Route path="/upload" component={FileUploader} />
    </Route>
  </Router>
), document.getElementById('application'));