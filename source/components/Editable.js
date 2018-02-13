import React from 'react'
import bound from '../../utility/bound'

const noop = () => { }

const TYPES = [
  // Strings
  'text', 'multiline',
  // Checkboxes
  'boolean',
  // Numbers
  'number', 'slider',
]

export default class Editable extends React.Component {
  static defaultProps = {
    className: '',
    forceEditMode: false,
    max: undefined,
    min: undefined,
    onChange: noop,
    onEditStart: noop,
    onEditEnd: noop,
    placeholder: '',
    readonly: false,
    step: 1,
    type: undefined,
    value: '',
  }

  state = {
    editing: false,
    resetValue: this.props.value,
  }

  get editing() {
    return this.props.forceEditMode || this.state.editing
  }

  getEditorType = () => {
    const { value } = this.props
    let { type } = this.props

    if (type !== undefined && TYPES.includes(type)) return type

    type = typeof value
    if (type === 'string') return value.includes('\n') ? 'multiline' : 'text'
    if (['boolean', 'number'].includes(type)) return type

    return 'text'
  }
  resetChanges = () => {
    this.props.onChange(this.state.resetValue, this.props.value)
    this.handleToggleEditing()
  }

  createRefWithAutoFocus = (editor) => {
    this.editor = editor
    if (!editor) return

    if (typeof editor.focus === 'function') editor.focus()
    if (this.props.forceEditMode && typeof editor.setSelectionRange === 'function') {
      editor.setSelectionRange(editor.value.length, editor.value.length)
    }
  }

  handleChange = ({ target }) => {
    const { min, max } = this.props
    let { value } = target

    // eslint-disable-next-line default-case
    switch (this.getEditorType()) {
      case 'slider':
      case 'number':
        value = parseInt(value || 0, 10)
        // eslint-disable-next-line prefer-destructuring
        if (Number.isNaN(value)) value = this.props.value
        value = bound(value, { min, max })
    }
    this.props.onChange(value, this.state.resetValue)
  }
  handleKeys = (event) => {
    const { target, key, ctrlKey, metaKey } = event

    if (key === 'Escape') this.resetChanges()
    if (key === 'Enter') {
      if (target.nodeName !== 'TEXTAREA' || ctrlKey || metaKey) {
        this.handleToggleEditing()
      }
    }
  }
  handleReceivingFocus = () => {
    if (this.props.readonly) return
    if (!this.state.editing) this.handleToggleEditing()
  }
  handleToggleEditing = () => {
    if (this.props.readonly) return

    const editing = !this.editing

    this.setState({ editing, resetValue: this.props.value }, () => {
      if (this.state.editing) {
        this.props.onEditStart()
      } else {
        this.props.onEditEnd()
      }
    })
  }

  selectOnFocus = event => event.target.select()
  toggleBoolean = () => {
    this.props.onEditStart()
    this.props.onChange(!this.props.value, this.props.value)
    this.props.onEditEnd()
  }

  renderBoolean = () => (
    <input
      type="checkbox"
      checked={Boolean(this.props.value)}
      disabled={this.props.readonly}
      onChange={this.toggleBoolean}
    />
  )
  renderMultiline = () => {
    if (!this.editing) {
      const lines = (this.props.value || this.props.placeholder).split('\n')
      const paragraphs = lines.map((line, index) =>
        <p key={index}>{line}</p>
      )
      const className = ['multiline', this.props.value ? '' : 'placeholder'].join(' ').trim()
      return <div className={className} onClick={this.handleToggleEditing}>{paragraphs}</div>
    }

    return (
      <textarea
        disabled={this.props.readonly}
        onBlur={this.handleToggleEditing}
        onChange={this.handleChange}
        onFocus={this.selectOnFocus}
        onKeyDown={this.handleKeys}
        placeholder={this.props.placeholder}
        ref={this.createRefWithAutoFocus}
        rows={this.props.value.split('\n').length}
        value={this.props.value}
      />
    )
  }
  renderNumber = () => {
    if (!this.editing) return this.renderStatic()

    return (
      <input
        type="number"
        disabled={this.props.readonly}
        max={this.props.max}
        min={this.props.min}
        onBlur={this.handleToggleEditing}
        onChange={this.handleChange}
        onFocus={this.selectOnFocus}
        onKeyDown={this.handleKeys}
        placeholder={this.props.placeholder}
        ref={this.createRefWithAutoFocus}
        step={this.props.step}
        value={this.props.value}
      />
    )
  }
  renderSlider = () => (
    <input
      type="range"
      disabled={this.props.readonly}
      max={this.props.max}
      min={this.props.min}
      onBlur={this.handleToggleEditing}
      onChange={this.handleChange}
      ref={this.createRefWithAutoFocus}
      step={this.props.step}
      value={this.props.value}
    />
  )
  renderText = () => {
    if (!this.editing) return this.renderStatic()

    return (
      <input
        type="text"
        disabled={this.props.readonly}
        onBlur={this.handleToggleEditing}
        onChange={this.handleChange}
        onFocus={this.selectOnFocus}
        onKeyDown={this.handleKeys}
        placeholder={this.props.placeholder}
        ref={this.createRefWithAutoFocus}
        value={this.props.value}
      />
    )
  }
  renderStatic = () => {
    const showPlaceholder = this.props.placeholder && !this.props.value
    const className = showPlaceholder ? 'placeholder' : ''
    return (
      <span className={className} onClick={this.handleToggleEditing}>
        {showPlaceholder ? this.props.placeholder : this.props.value}
      </span>
    )
  }

  renderEditor = () => {
    switch (this.getEditorType()) {
      case 'boolean':
        return this.renderBoolean()
      case 'slider':
        return this.renderSlider()
      case 'multiline':
        return this.renderMultiline()
      case 'number':
        return this.renderNumber()
      default:
        return this.renderText()
    }
  }
  render = () => {
    const { className, readonly } = this.props

    const classes = [
      'editable',
      this.editing ? 'editing' : '',
      className || '',
      readonly ? 'readonly' : '',
    ].filter(Boolean)

    let props = {}
    if (!readonly && !this.editing) {
      props = { tabIndex: '0', onFocus: this.handleReceivingFocus }
    }

    return (
      <div className={classes.join(' ')} {...props}>
        {this.renderEditor()}
      </div>
    )
  }
}
