import * as React from 'react'
import AceEditor from 'react-ace'

import brace from 'brace'
import 'brace/mode/html'
import 'brace/theme/chrome'
import 'brace/ext/searchbox'

export default class HtmlEditor extends React.Component {
  constructor(props) {
    super(props)
    this.options = {
      ...HtmlEditor.defaultProps.options,
      ...this.props.options,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.options = {
      ...HtmlEditor.defaultProps.options,
      ...this.props.options,
    }
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
        showGutter={true}
        tabSize={2}
        theme="chrome"
        value={this.props.html}
        width="100%" height="100%"
      />
    )
  }
}

HtmlEditor.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  readonly: React.PropTypes.bool.isRequired,
}
HtmlEditor.defaultProps = {
  onChange: value => {},
  options: {
    displayIndentGuides: true,
    enableMultiselect: true,
    highlightActiveLine: true,
    highlightSelectedWord: true,
    showInvisibles: true,
    showPrintMargin: false,
    wrap: true,
  },
  readonly: false,
}
