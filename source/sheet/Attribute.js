import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  startCase,
  toLower,
} from 'lodash'

import Editable from '../components/Editable'

export default class Attribute extends Component {
  handleValueChange = (value) => {
    this.props.onChange({
      ...this.props.attribute,
      value,
    }, this.props.attribute)
  }

  render() {
    const {
      attribute: { key, name, value },
      className,
      readonly,
    } = this.props

    const display = name || startCase(toLower(key))

    return (
      <div className={`attribute ${className}`}>
        <Editable className="name" value={display} readonly />
        <Editable className="value" value={value} min={-10} max={10}
          readonly={readonly} onChange={this.handleValueChange}
        />
      </div>
    )
  }
}

Attribute.propTypes = {
  attribute: PropTypes.shape({
    key:   PropTypes.string.isRequired,
    name:  PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  }).isRequired,
  className: PropTypes.string,
  onChange:  PropTypes.func.isRequired,
  readonly:  PropTypes.bool,
}
Attribute.defaultProps = {
  attribute: {
    key:   'new-attribute',
    value: 0,
  },
  className: '',
  onChange:  () => {},
  readonly:  false,
}
