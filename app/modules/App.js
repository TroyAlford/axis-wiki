// modules/App.js
import React from 'react';

import TopNavigation from './TopNavigation';

export default class App extends React.Component {
  render() {
    return (
      <div className="wiki-app">
        <TopNavigation />
        {/* add this */}
        {this.props.children}
      </div>
    );
  }
}