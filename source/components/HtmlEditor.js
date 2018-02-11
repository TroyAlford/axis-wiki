import React, { Component } from 'react'
import AceEditor from 'react-ace'

export default class HtmlEditor extends Component {
  static defaultProps = {
    html: '',
    onChange: () => { },
    readonly: false,

    options: {
      displayIndentGuides: true,
      enableMultiselect: true,
      highlightActiveLine: true,
      highlightSelectedWord: true,
      showInvisibles: false,
      showPrintMargin: false,
      wrap: true,
    },
  }

  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.setEditor = this.setEditor.bind(this)

    this.options = {
      ...HtmlEditor.defaultProps.options,
      ...props.options,
    }
  }
  componentDidMount() {
    this.editor.session.on('changeAnnotation', (_, session) => {
      const count = session.$annotations.length
      const updated = session.$annotations.filter(annotation =>
        !/doctype/i.test(annotation.text)
      )

      if (updated.length !== count) session.setAnnotations(updated)
    })
  }
  componentWillReceiveProps(nextProps) {
    this.options = {
      ...HtmlEditor.defaultProps.options,
      ...nextProps.options,
    }
  }
  componentWillUnmount() {
    this.editor = null
  }

  setEditor(editor) {
    if (editor) this.editor = editor.editor
  }

  render() {
    return (
      <AceEditor
        editorProps={{
          $blockScrolling: Infinity, /* Disable deprecation warning */
        }}
        height="100%"
        mode="html"
        name="html"
        onChange={this.props.onChange}
        readOnly={this.props.readonly}
        ref={this.setEditor}
        scrollMargin={[5, 0, 5, 0]}
        setOptions={this.options}
        showGutter
        tabSize={2}
        theme="chrome"
        value={this.props.html}
        width="100%"
      />
    )
  }
}
