import * as React from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/html'
import 'brace/ext/searchbox'

export default class HtmlEditor extends React.Component {
  constructor(props) {
    super(props)
    this.options = {
      ...HtmlEditor.defaultProps.options,
      ...props.options,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.options = {
      ...HtmlEditor.defaultProps.options,
      ...nextProps.options,
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
        showGutter
        tabSize={2}
        theme="chrome"
        value={this.props.html}
        width="100%" height="100%"
      />
    )
  }
}

HtmlEditor.propTypes = {
  html:     React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  readonly: React.PropTypes.bool.isRequired,

  options: React.PropTypes.shape({
    displayIndentGuides:   React.PropTypes.bool,
    enableMultiselect:     React.PropTypes.bool,
    highlightActiveLine:   React.PropTypes.bool,
    highlightSelectedWord: React.PropTypes.bool,
    showInvisibles:        React.PropTypes.bool,
    showPrintMargin:       React.PropTypes.bool,
    wrap:                  React.PropTypes.bool,
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
