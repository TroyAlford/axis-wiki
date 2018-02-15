import React, { Component } from 'react'
import ReactAce from 'react-ace'
import 'brace/mode/html'
import 'brace/theme/chrome'

export default class AceEditor extends Component {
  static defaultProps = {
    editorProps: { $blockScrolling: Infinity },
    mode: 'html',
    name: 'html',
    scrollMargin: [5, 0, 5, 0],
    setOptions: {
      displayIndentGuides: true,
      enableMultiselect: true,
      highlightActiveLine: true,
      highlightSelectedWord: true,
      showInvisibles: false,
      showPrintMargin: false,
      wrap: true,
    },
    showGutter: true,
    tabSize: 2,
    theme: 'chrome',
    height: '100%',
    width: '100%',
  }

  componentDidMount = () => {
    this.editor.session.on('changeAnnotation', (_, session) => {
      const count = session.$annotations.length
      const updated = session.$annotations.filter(annotation =>
        !/doctype/i.test(annotation.text)
      )

      if (updated.length !== count) session.setAnnotations(updated)
    })
  }
  componentWillUnmount = () => { this.editor = null }

  setRef = (ace) => { this.editor = (ace || {}).editor }
  render = () => <ReactAce ref={this.setRef} {...this.props} />
}
