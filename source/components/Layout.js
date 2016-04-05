import _                  from 'lodash'
import React              from 'react'
import ReactDOM           from 'react-dom'
import { browserHistory } from 'react-router'

import TopNavigation      from './TopNavigation'
import LeftNavigation     from './LeftNavigation'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.parser = document.createElement('a');

    this.handleClicks = this.handleClicks.bind(this);
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
    let node_name = event.target.nodeName.toUpperCase();
    if (!_(['A', 'IMG']).includes(node_name))
      return; // If the click wasn't on an A or IMG, no need to continue.

    let inside_editor = undefined !== _.find(event.path, { id: 'react-tinymce-0' }),
        url = event.target.href || event.target.src;
    if (inside_editor || !url) {
      // Clicks inside TinyMCE and clicks with no href/img do nothing
      event.preventDefault();
      return;
    }

    this.parser.href = url;
    if (this.parser.hostname != window.location.hostname) return; // Allow external links

    event.preventDefault();
    let location = node_name == "A"
      ? this.parser.pathname
      : `/info${this.parser.pathname}`;
    browserHistory.push(location);
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