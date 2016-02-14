// modules/App.js
import React from 'react';

import TopNavigation from './TopNavigation';
import LeftNavigation from './LeftNavigation';

export default class App extends React.Component {
  render() {
    return (
      <div className="cp-layout">
        <div className="cp-layout-head">
          <TopNavigation />
        </div>
        <div className="cp-layout-left">
          <LeftNavigation />
        </div>
        <div className="cp-layout-main">
          {this.props.children}
        </div>
      </div>
    );
  }
}