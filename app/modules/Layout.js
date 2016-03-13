// modules/App.js
import React              from 'react'
import ReactDOM           from 'react-dom'
import { browserHistory } from 'react-router'

import TopNavigation from './TopNavigation'
import LeftNavigation from './LeftNavigation'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var container = ReactDOM.findDOMNode(this.refs.container);
    if (container.addEventListener)
      container.addEventListener('click', this.handleLinks, false);
    else if (el.attachEvent)
      container.attachEvent('onclick', this.handleLinks);
    else
      container['onclick'] = this.handleLinks;
  }
  handleLinks(event) {
    console.log(`link clicked... ${event.target.pathname}`);
    if (event.which == 1 && event.target.nodeName == "A"
      && event.target.hostname == window.location.hostname) {
      event.preventDefault();
      browserHistory.push(event.target.pathname);
    }
  }

  render() {
    return (
      <div className="cp-layout" ref="container">
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