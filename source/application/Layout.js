import * as React from 'react'
import { browserHistory } from 'react-router'

import ComponentBase from '../application/ComponentBase'
import Header from '../components/Header'
import HtmlMetadata from '../components/HtmlMetadata'
import Navigation from '../components/Navigation'

const parser = document.createElement('a')

const interceptClicks = (event) => {
  const { nodeName, attributes: { disabled } } = event.target
  if (disabled || ['A', 'IMG'].indexOf(nodeName.toUpperCase()) === -1) return

  parser.href = event.target.href || event.target.src
  if (parser.hostname !== window.location.hostname) return

  event.preventDefault()
  event.stopPropagation()

  browserHistory.push(parser.pathname)
}

export default class Layout extends ComponentBase {
  render() {
    return (
      <div className="layout" onClick={interceptClicks}>
        <HtmlMetadata />
        <Header />
        <Navigation />
        <div className="page-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
