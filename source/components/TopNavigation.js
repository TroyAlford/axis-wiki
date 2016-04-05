import React from 'react';

import Facebook from './Facebook'

export default class TopNavigation extends React.Component {
  render() {
    return (
      <section className="hero is-info is-left is-bold cp-topnavigation">
        <div className="hero-header">
          <header className="header">
            <div className="header-left title">
              <strong>Axis</strong> Wiki
            </div>
            <nav className="navbar">
              <Facebook className="header-item" />
            </nav>
          </header>
        </div>
      </section>
    );
  }
}