import * as React from 'react'
import AceEditor from 'react-ace'
import PropTypes from 'prop-types'

import 'brace/mode/html'
import 'brace/theme/chrome'
import 'brace/ext/searchbox'

export default class HtmlEditor extends React.Component {
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
        mode="html"
        name="html"
        onChange={this.props.onChange}
        readOnly={this.props.readonly}
        setOptions={this.options}
        showGutter
        tabSize={2}
        theme="chrome"
        value={this.props.html}
        width="100%" height="100%"
        ref={this.setEditor}
      />
    )
  }
}

HtmlEditor.propTypes = {
  html:     PropTypes.string,
  onChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool.isRequired,

  options: PropTypes.shape({
    displayIndentGuides:   PropTypes.bool,
    enableMultiselect:     PropTypes.bool,
    highlightActiveLine:   PropTypes.bool,
    highlightSelectedWord: PropTypes.bool,
    showInvisibles:        PropTypes.bool,
    showPrintMargin:       PropTypes.bool,
    wrap:                  PropTypes.bool,
  }),
}
HtmlEditor.defaultProps = {
  html:     '',
  onChange: () => {},
  readonly: false,

  options: {
    displayIndentGuides:   true,
    enableMultiselect:     true,
    highlightActiveLine:   true,
    highlightSelectedWord: true,
    showInvisibles:        true,
    showPrintMargin:       false,
    wrap:                  true,
  },
}
