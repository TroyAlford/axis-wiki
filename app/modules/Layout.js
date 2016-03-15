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
      container.addEventListener('click', this.handleClicks, false);
    else if (el.attachEvent)
      container.attachEvent('onclick', this.handleClicks);
    else
      container['onclick'] = this.handleClicks;
  }
  handleClicks(event) {
    let inside_editor = undefined !== _.find(event.path, { id: 'react-tinymce-0' });

    if (event.which == 1 && event.target.nodeName == "A" && event.target.pathname !== '') {
      if (inside_editor || event.target.hostname == window.location.hostname)
        event.preventDefault();

      if (!inside_editor) browserHistory.push(event.target.pathname);
    }
    if (!inside_editor && event.which == 1 && event.target.nodeName == "IMG") {
      let parser = document.createElement('a');
      parser.href = event.target.src;
      let filename = _.last(parser.pathname.split('/'));

      if (parser.hostname == window.location.hostname)
        browserHistory.push(`/info/media/${filename}`);
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