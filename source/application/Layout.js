import _                  from 'lodash'
import ReactDOM           from 'react-dom'
import { browserHistory } from 'react-router'

import ComponentBase      from '../application/ComponentBase'
import Header             from '../components/Header'
import Navigation         from '../components/Navigation'

export default class App extends ComponentBase {
  constructor(props) {
    super(props);
    this.parser = document.createElement('a');
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
    let pathname = this.parser.pathname
      .replace(/\/full\//, '/')
    ;
    
    let location = node_name == "A" ? pathname : `/info${pathname}`;
    browserHistory.push(location);
  }

  render() {
    return (
      <div className="layout" ref="container">
        <Header />
        <Navigation />
        <div className="page-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}