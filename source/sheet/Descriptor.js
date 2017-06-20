import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  startCase,
  toLower,
} from 'lodash'

import Editable from '../components/Editable'

export default class Descriptor extends Component {
  handleValueChange = (value) => {
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
  descriptor: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  }).isRequired,
  className: PropTypes.string,
  readonly: PropTypes.bool,

  onChange: PropTypes.func.isRequired,
  onEditEnd: PropTypes.func.isRequired,
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
