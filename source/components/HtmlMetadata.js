import React, { Component } from 'react'
import { observer } from 'mobx-react'
import unique from '@utils/unique'
import CONFIG from '../../config/config'

const html = document.querySelector('html')
const head = document.querySelector('head') || document.createElement('head')
if (!head.parentElement) html.insertBefore(head, html.firstChild)

const getOrCreateHeadTag = (name, tag = 'meta') => {
  const el = (
    head.querySelector(`${tag}[name="${name}"]`) ||
    Object.assign(document.createElement(tag), { name })
  )
  if (!el.parentElement) head.appendChild(el)

  return el
}

@observer export default class HtmlMetadata extends Component {
  static defaultProps = {
    author: '',
    description: '',
    keywords: [],
    title: '',
    titleFormat: '%TITLE% - %APPNAME%',
  }

  componentDidMount() { this.updateHeadTag(this.props) }
  componentDidUpdate() { this.updateHeadTag(this.props) }
  componentWillUnmount() { this.restoreHeadTag() }

  restoreHeadTag = () => {
    this.meta.author.content = this.originalValues.author
    this.meta.description.content = this.originalValues.description
    this.meta.keywords.content = this.originalValues.keywords
    this.meta.title.textContent = this.originalValues.title
  }
  updateHeadTag = (props) => {
    this.meta.author.content = props.author
    this.meta.description.content = props.description
    this.meta.keywords.content = unique(props.keywords).sort().join(', ')
    this.meta.title.textContent = (
      this.props.titleFormat
        .replace('%TITLE%', props.title)
        .replace('%APPNAME%', CONFIG.applicationName)
    )
  }

  meta = {
    author: getOrCreateHeadTag('author'),
    description: getOrCreateHeadTag('description'),
    keywords: getOrCreateHeadTag('keywords'),
    title: getOrCreateHeadTag('', 'title'),
  };

  originalValues = {
    author: this.meta.author.content,
    description: this.meta.description.content,
    keywords: this.meta.keywords.content,
    title: this.meta.title.textContent,
  }

  render() { return null }
}
