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
  get editor() {
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

  render() {
    const value = this.current,
      readonly = this.readonly,
      editor = this.editor,
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
          <input type="checkbox" checked={!!value} disabled={readonly}
                 onChange={this.setValue.bind(this, !value)} />
        : editor === 'slider' ?
          <input type="range" disabled={readonly}
            value={value} step={this.props.step || 0}
            min={this.props.min || 0} max={this.props.max || 100}
          />
        : editor === 'multiline' ?
          readonly || !editing ?
            <span>{this.props.value.split('\n').map(
              (line, index) => <p key={index}>{line}</p>
            )}</span>
          : <textarea cols={value.split('\n').length}>{value}</textarea>
        : editor === 'number' && editing ?
          <input type="number" value={value} step={this.props.step || 0}
                 min={this.props.min || 0} max={this.props.max || 100}
          />
        : readonly || !editing ?
          // Read-Only or not-editing defaults to text in a SPAN
          <span>{this.props.value}</span>
          // The Editing default is to render a normal INPUT[type=text]
        : <input type="text" value={value} onChange={this.handleChange} />
      }
      </div>
    )
  }
}

Editable.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  onChanging: React.PropTypes.func.isRequired,
}
Editable.defaultProps = {
  onChange: () => true,
  onChanging: () => true,
}
