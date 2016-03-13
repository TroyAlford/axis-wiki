// modules/TopNavigation.js
import React from 'react';

export default class TopNavigation extends React.Component {
  render() {
    return (
      <section className="hero is-info is-left is-bold cp-topnavigation">
        <div className="hero-header">
          <header className="header">
            <div className="header-left title">
              <strong>Axis</strong> Wiki
            </div>
            <div className="header-menu">
              {/*<span className="header-item"><a href="/w/home">Home</a></span>*/}
            </div>
          </header>
        </div>
      </section>
    );
  }
}