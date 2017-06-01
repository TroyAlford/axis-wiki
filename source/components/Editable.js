import React from 'react'
import PropTypes from 'prop-types'

import {
  difference,
  includes,
} from 'lodash'

export default class Editable extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.state = {
      editing: props.editing || false,
      value:   undefined,
    }

    this.focusOnEditor = (self) => {
      if (self && typeof self.focus === 'function')
        self.focus()

      this.editor = self
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleContainerFocus = this.handleContainerFocus.bind(this)
    this.handleKeys = this.handleKeys.bind(this)
    this.saveAndStopEditing = this.saveAndStopEditing.bind(this)
    this.setValue = this.setValue.bind(this)
    this.toggleEditing = this.toggleEditing.bind(this)
  }

  componentWillReceiveProps() {
    this.setState({ value: undefined })
  }

  setValue(value) {
    const current = this.current
    if (this.props.readonly || current === value) return; // Don't send false updates.
    if (this.props.onChanging(value, current) === false) return;
    this.setState({ value })
    this.props.onChange(value, current)
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
    return this.state.value !== undefined &&
           this.state.value !== this.props.value
  }
  get editorType() {
    let { type, value } = this.props
    const types = [
      'text', 'multiline', // Strings
      'boolean',           // Checkboxes
      'number', 'slider'   // Numbers
    ]
    if (type !== undefined && includes(types, type)) return type

    if (typeof value === 'string')
      return value.includes('\n') ? 'multiline' : 'text'

    if (typeof value === 'boolean') return 'boolean'
    if (typeof value === 'number') return 'number'

    return 'text'
  }

  handleChange(event) {
    let value = event.target.value
    switch (this.editorType) {
      case 'slider':
      case 'number':
        if (value === '') value = 0
        value = parseInt(value)
        if (isNaN(value)) value = this.current
        if (this.props.min !== undefined && value < this.props.min)
          value = this.props.min
        if (this.props.max !== undefined && value > this.props.max)
          value = this.props.max
    }
    this.setValue(value)
  }
  handleKeys(event) {
    const { target, key, ctrlKey, metaKey } = event
    switch (key) {
      case 'Escape':
        this.setState({
          editing: false,
          value: undefined
        })
        break;
      case 'Enter':
        if (target.nodeName !== 'TEXTAREA' || ctrlKey || metaKey) {
          this.saveAndStopEditing(event)
        }
        break;
    }
  }
  toggleEditing() {
    const editing = !this.state.editing
    this.setState({ editing })
    if (editing)
      this.props.onEditStart(this.current, this.props.value)
    else
      this.props.onEditEnd(this.current, this.props.value)
  }
  saveAndStopEditing(event) {
    this.handleChange(event)
    this.toggleEditing()
  }

  handleContainerFocus(ev) {
    if (this.readonly) return
    if (!this.editing)
      this.toggleEditing()
  }

  render() {
    this.editor = null

    const currentValue = this.current
    const readonly = this.readonly
    const editor = this.editorType
    const editing = this.editing
    const classes = difference([
      'editable',
      editing ? 'editing' : '',
      this.props.className || '',
      readonly ? 'readonly' : '',
      this.dirty ? 'dirty' : '',
    ], [''])

    const props = {}
    if (!readonly && !editing) {
      props.tabIndex = "0"
      props.onFocus = this.handleContainerFocus
    }

    return (
      <div className={classes.join(' ')} {...props}>{
        editor === 'boolean' ?
          <input type="checkbox"
            checked={!!currentValue} disabled={readonly}
            onChange={this.setValue.bind(this, !currentValue)}
          />
        : editor === 'slider' ?
          <input type="range" disabled={readonly}
            value={currentValue} step={this.props.step || 1}
            min={this.props.min || 0} max={this.props.max || 100}
            onChange={this.handleChange} onBlur={this.saveAndStopEditing}
            ref={this.focusOnEditor}
          />
        : editor === 'multiline' ?
          readonly || !editing ?
            <span>{currentValue.split('\n').map(
              (line, index) => <p key={index}>{line}</p>
            )}</span>
          : <textarea cols={currentValue.split('\n').length}
              onBlur={this.saveAndStopEditing}
              onChange={this.handleChange}
              onKeyDown={this.handleKeys}
              placeholder={this.props.placeholder}
              ref={this.focusOnEditor}
            >{currentValue}</textarea>
        : editor === 'number' && editing ?
          <input type="number" value={currentValue} step={this.props.step || 1}
            min={this.props.min} max={this.props.max}
            onBlur={this.saveAndStopEditing}
            onChange={this.handleChange}
            onFocus={event => event.target.select()}
            onKeyDown={this.handleKeys}
            placeholder={this.props.placeholder}
            ref={this.focusOnEditor}
          />
        : readonly ?
          // Read-Only or not-editing defaults to text in a SPAN
          <span>{currentValue}</span>
        : !editing ?
          <span onClick={this.toggleEditing}>{currentValue}</span>
          // The Editing default is to render a normal INPUT[type=text]
        : <input type="text" value={currentValue} ref={this.focusOnEditor}
            onBlur={this.saveAndStopEditing}
            onChange={this.handleChange}
            onFocus={event => event.target.select()}
            onKeyDown={this.handleKeys}
            placeholder={this.props.placeholder}
          />
      }
      </div>
    )
  }
}

Editable.propTypes = {
  className:   PropTypes.string,
  max:         PropTypes.number,
  min:         PropTypes.number,
  onChange:    PropTypes.func.isRequired,
  onChanging:  PropTypes.func.isRequired,
  onEditStart: PropTypes.func.isRequired,
  onEditEnd:   PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value:       PropTypes.any,
}
Editable.defaultProps = {
  className:   '',
  max:         undefined,
  min:         undefined,
  onChange:    () => true,
  onChanging:  () => true,
  onEditStart: () => true,
  onEditEnd:   () => true,
  placeholder: '',
  value:       null,
}
