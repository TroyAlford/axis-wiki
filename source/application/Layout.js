import _                  from 'lodash'
import ReactDOM           from 'react-dom'
import { connect }        from 'react-redux'
import { browserHistory } from 'react-router'

import ComponentBase      from '../application/ComponentBase'
import HtmlMetadata       from '../components/HtmlMetadata'
import Header             from '../components/Header'
import Navigation         from '../components/Navigation'

import { loadArticle }    from '../actions/article'

const parser = document.createElement('a');

class Layout extends ComponentBase {
  constructor(props) {
    super(props);
    
    let slug = _(window.location.pathname).split('/').last();
    this.props.dispatch(loadArticle(slug));
  }

  handleClicks(event) {
    let node_name = event.target.nodeName.toUpperCase();
    if (node_name !== 'A' && node_name !== 'IMG') return;

    let inside_editor = undefined !== _(event.path).find({ id: 'react-tinymce-0' });
    let url = parser.href = event.target.href || event.target.src;
    
    if (inside_editor || !url)
      return event.preventDefault();

    if (parser.hostname != window.location.hostname) return; // Allow external links

    event.preventDefault();
    let slug = _(parser.pathname).split('/').last();
    
    switch (node_name) {
      case "A":
        return this.props.dispatch(loadArticle(slug));
      case "IMG":
        return browserHistory.push(`/info/${slug}`);
    }
  }

  render() {
    return (
      <div className="layout" onClick={this.handleClicks}>
        <HtmlMetadata />
        <Header />
        <Navigation />
        <div className="page-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect()(Layout)