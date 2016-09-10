import * as React from 'react'

import {
  startCase,
  toLower
} from 'lodash'

import ComponentBase from '../application/ComponentBase'
import Editable from '../components/Editable'

export default class Descriptor extends ComponentBase {
  handleValueChange(value) {
    let { key, name } = this.props.descriptor
    this.props.onChange(
      { key, name, value },
      this.props.descriptor,
    )
  }

  render() {
    const {
      descriptor: { key, name, value },
      className,
      readonly,
    } = this.props

    let display = name ? name : startCase(toLower(key))

    return (
      <div className={`descriptor ${className}`}>
        <Editable className="name" value={display} readonly />
        <Editable className="value" value={value} readonly={readonly}
          onEditEnd={value => {
            if (value === this.props.descriptor.value) return;
            const updated = {
              ...this.props.descriptor,
              value,
            }

            this.props.onChange(updated, this.props.descriptor)
            this.props.onEditEnd(updated, this.props.descriptor)
          }}
        />
      </div>
    )
  }
}

Descriptor.propTypes = {
  descriptor: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number,
      React.PropTypes.string,
    ]).isRequired,
  }).isRequired,
  className: React.PropTypes.string,
  readonly: React.PropTypes.bool,

  onChange: React.PropTypes.func.isRequired,
  onEditEnd: React.PropTypes.func.isRequired,
}
Descriptor.defaultProps = {
  descriptor: {
    value: 0,
  },
  className: '',
  readonly: false,

  onChange: to => {},
  onEditEnd: to => {},
}
