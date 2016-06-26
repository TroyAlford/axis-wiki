import React from 'react' // Must be imported for Jest Tests
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
    if (type !== undefined && _.includes(types, type)) return type;

    if (typeof value === 'string')
      return value.includes('\n') ? 'multiline' : 'text'

    if (typeof value === 'boolean') return 'boolean'
    if (typeof value === 'number') return 'number'
    if (Array.isArray(value)) return 'dropdown'

    return 'text'
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const
      value = this.dirty && this.state.value || this.props.value,
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
                 onChange={this.handleChange} />
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
        : readonly || !editing ? // All other types display as text
          <span>{this.props.value}</span>
        : <input type="text" value={value}/>
        // Default case - render a normal textbox
      }
      </div>
    )
  }
}
