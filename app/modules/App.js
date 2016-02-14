// modules/App.js
import React from 'react';

import TopNavigation from './TopNavigation';
import LeftNavigation from './LeftNavigation';

export default class App extends React.Component {
  render() {
    return (
      <div className="wiki-app">
        <TopNavigation />
        <div className="page-content">
          <div className="columns">
            <div className="column is-2">
              <LeftNavigation />
            </div>
            <div className="column">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}