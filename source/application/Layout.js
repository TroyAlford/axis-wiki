import React, { Component } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'

import Header from '../components/Header'
import HtmlMetadata from '../components/HtmlMetadata'
import Navigation from '../components/Navigation'
import { updateLayout, SMALL, MEDIUM, LARGE } from '../redux/page/actions'

const parser = document.createElement('a')

const interceptClicks = (event) => {
  const { nodeName, attributes: { disabled } } = event.target
  if (disabled || ['A', 'IMG'].indexOf(nodeName.toUpperCase()) === -1) return

  parser.href = event.target.href || event.target.src
  if (parser.hostname !== window.location.hostname) return

  event.preventDefault()
  event.stopPropagation()

  window.routerHistory.push(parser.pathname)
}

class Layout extends Component {
  static defaultProps = {
    layout: LARGE,
  }

  constructor(props) {
    super(props)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.onWindowResize = debounce(this.onWindowResize, 150, { leading: false, trailing: true })
  }

  componentDidMount() { window.addEventListener('resize', this.onWindowResize) }
  componentWillUnmount() { window.removeEventListener('resize', this.onWindowResize) }
  onWindowResize() { this.props.dispatch(updateLayout()) }

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

export default connect(state => ({ layout: state.page.layout }))(Layout)
