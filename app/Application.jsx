import React    from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Router, browserHistory } from 'react-router';

import Layout       from './modules/Layout';
import Article      from './modules/Article';
import TagBrowser   from './modules/TagBrowser';
import FileUploader from './modules/FileUploader';

ReactDOM.render((
  <Router history={browserHistory}>
    <Redirect from="/" to="/w/home" />
    <Route path="/" component={Layout}>
      <Route path="/w/:slug" component={Article} />
      <Route path="/tagged/:tag" component={TagBrowser} />
      <Route path="/upload" component={FileUploader} />
    </Route>
  </Router>
), document.getElementById('application'));