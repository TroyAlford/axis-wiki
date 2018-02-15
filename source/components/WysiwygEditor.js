import React, { Component } from 'react'
import Loadable from 'react-loadable'
import noop from '@utils/noop'

const TinyMCE = Loadable({
  loader: () => import(/* webpackChunkName: "WysiwygEditor" */ './dynamic/TinyMCE'),
  loading: () => <div className="loading" />,
})

export default class WysiwygEditor extends Component {
  static defaultProps = {
    onChange: noop,
  }

  componentWillReceiveProps(props) { this.previousValue = props.html }
  previousValue = this.props.html

  handleChangeEvent = (_, editor) => {
    const html = editor.getContent()
    if (html !== this.previousValue) {
      this.props.onChange(html)
      this.previousValue = html
    }
  }

  render = () => {
    const { html, onChange, ...props } = this.props
    return (
      <div className="wysiwyg-editor">
        <div className="menubar" />
        <TinyMCE
          {...props}
          initialValue={html}
          inline
          onNodeChange={this.handleChangeEvent}
          onCut={this.handleChangeEvent}
          onKeyUp={this.handleChangeEvent}
          onPaste={this.handleChangeEvent}
        />
      </div>
    )
  }
}
