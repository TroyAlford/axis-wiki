import React, { Component } from 'react'
import Message from '../components/Message'

export default class NotFound extends Component {
  render() {
    const parts = window.location.pathname.split('/')
    const slug = parts[parts.length - 1]
    const url = `/page/${slug}`

    return (
      <div className="not-found page">
        <Message title="404">
          <p className="center">
            Whoops, how did you get here? Are you looking for <a href={url}>{url}</a>?
          </p>
        </Message>
      </div>
    )
  }
}
