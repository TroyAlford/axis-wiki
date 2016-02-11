// modules/TopNavigation.js
import React from 'react';
import { Link } from 'react-router';

export default class TopNavigation extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-item">
            <p className="subtitle is-5">
              <strong>Axis</strong> Wiki
            </p>
          </div>
        </div>
        <div className="navbar-right">
          <div className="tabs is-boxed" role="nav">
            <ul>
              <li className="navbar-item"><Link to="/w/home">Home</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}