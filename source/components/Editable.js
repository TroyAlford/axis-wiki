import React from 'react' // Must be imported for Jest Tests
import includes from 'lodash/includes'
import xor from 'lodash/xor'

export default class Editable extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.state = {
      editing: props.editing || false,
      value: undefined
    }

    this.focusOnEditor = focusOnEditor.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeys = this.handleKeys.bind(this)
    this.setValue = this.setValue.bind(this)
    this.toggleEditing = this.toggleEditing.bind(this)
  }

  get current() {
    if (this.readonly) return this.props.value
    if (this.dirty) return this.state.value
    return this.props.value
  }
  get original() { return this.props.value }
  get editing() {
    return !this.props.readonly &&
            this.props.editing || this.state.editing === true
  }
  get readonly() {
    return this.props.readonly === true
  }
  get dirty() {
    return this.state.value !== undefined
  }
  get editorType() {
    let { type, value } = this.props
    const types = [
      'text', 'multiline', // Strings
      'dropdown',          // Arrays
      'boolean',           // Checkboxes
      'number', 'slider'   // Numbers
    ]
    if (type !== undefined && includes(types, type)) return type

    if (typeof value === 'string')
      return value.includes('\n') ? 'multiline' : 'text'

    if (typeof value === 'boolean') return 'boolean'
    if (typeof value === 'number') return 'number'
    if (Array.isArray(value)) return 'dropdown'

    return 'text'
  }

  setValue(value) {
    let current = this.current
    if (this.props.onChanging(current, value) === false) return;
    this.setState({ value })
    this.props.onChange(current, value)
  }
  handleChange(event) {
    this.setValue(event.target.value)
  }
  handleKeys(event) {
    const { target, key } = event
    switch (key) {
      case 'Escape':
        this.setState({ value: null })
        this.toggleEditing()
        break;
      case 'Enter':
        if (target.nodeName !== 'TEXTAREA') {
          this.toggleEditing()
        }
    }
    // console.log(target.nodeName, key, event)
  }
  toggleEditing() {
    this.setState({ editing: !this.state.editing })
  }

  render() {
    this.editor = null

    const value = this.current,
      readonly = this.readonly,
      editor = this.editorType,
      editing = this.editing,
      classes = xor([
        'editable',
        this.props.className || '',
        readonly ? 'readonly' : '',
        this.dirty ? 'dirty' : ''
      ], [''])

    return (
      <div className={classes.join(' ')}>{
        editor === 'boolean' ?
          <input type="checkbox"
            checked={!!value} disabled={readonly}
            onChange={this.setValue.bind(this, !value)}
            ref={this.focusOnEditor}
          />
        : editor === 'slider' ?
          <input type="range" disabled={readonly}
            value={value} step={this.props.step || 1}
            min={this.props.min || 0} max={this.props.max || 100}
            onChange={this.handleChange} onBlur={this.toggleEditing}
            ref={this.focusOnEditor}
          />
        : editor === 'multiline' ?
          readonly || !editing ?
            <span>{this.props.value.split('\n').map(
              (line, index) => <p key={index}>{line}</p>
            )}</span>
          : <textarea cols={value.split('\n').length}
              onBlur={this.toggleEditing}
              onChange={this.handleChange}
              onKeyDown={this.handleKeys}
              ref={this.focusOnEditor}
            >{value}</textarea>
        : editor === 'number' && editing ?
          <input type="number" value={value} step={this.props.step || 1}
            min={this.props.min || 0} max={this.props.max || 100}
            onChange={this.handleChange} onBlur={this.toggleEditing}
            ref={this.focusOnEditor}
          />
        : readonly ?
          // Read-Only or not-editing defaults to text in a SPAN
          <span>{this.props.value}</span>
        : !editing ?
          <span onClick={this.toggleEditing}>{this.state.value || this.props.value}</span>
          // The Editing default is to render a normal INPUT[type=text]
        : <input type="text" value={value} ref={this.focusOnEditor}
            onBlur={this.toggleEditing}
            onChange={this.handleChange}
            onKeyDown={this.handleKeys}
          />
      }
      </div>
    )
  }
}

function focusOnEditor(self) {
  if (self) self.focus()
  this.editor = self;
}

Editable.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  onChanging: React.PropTypes.func.isRequired,
}
Editable.defaultProps = {
  onChange: () => true,
  onChanging: () => true,
}
