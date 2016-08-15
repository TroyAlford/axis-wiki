import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { split } from 'lodash'

import ComponentBase from '../application/ComponentBase'
import Header from '../components/Header'
import HtmlMetadata from '../components/HtmlMetadata'
import Navigation from '../components/Navigation'

import { loadArticle } from '../redux/article/actions'

const parser = document.createElement('a');

class Layout extends ComponentBase {
  elementIsWithinEditor(element) {
    if (element.id.startsWith('react-tinymce'))
      return true;
    else if (!element.parentElement)
      return false;
    else
      return this.elementIsWithinEditor(element.parentElement);
  }

  handleClicks(event) {
    let node_name = event.target.nodeName.toUpperCase();
    if (node_name !== 'A' && node_name !== 'IMG') return;
    if (event.target.attributes.disabled) return;

    let inside_editor = this.elementIsWithinEditor(event.target)
    let url = parser.href = event.target.href || event.target.src

    if (inside_editor || !url)
      return event.preventDefault();

    if (parser.hostname != window.location.hostname) return; // Allow external links

    event.preventDefault()
    event.stopPropagation()

    let slug = split(parser.pathname, '/').pop()

    switch (node_name) {
      case "A":
        return browserHistory.push(parser.pathname)
      case "IMG":
        return browserHistory.push(`/info/media/${slug}`)
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
