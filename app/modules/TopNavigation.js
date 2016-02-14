// modules/TopNavigation.js
import React from 'react';
import { Link } from 'react-router';

export default class TopNavigation extends React.Component {
  render() {
    return (
      <section className="hero is-info is-left is-bold cp-topnavigation">
        <div className="hero-header">
          <header className="header">
            <div className="container">
              <div className="header-left title">
                <strong>Axis</strong> Wiki
              </div>
              <div className="header-menu">
                <span className="header-item"><Link to="/w/home">Home</Link></span>
              </div>
            </div>
          </header>
        </div>
      </section>
    );
  }
}