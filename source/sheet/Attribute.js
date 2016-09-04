import * as React from 'react'

import {
  startCase,
  toLower
} from 'lodash'

import ComponentBase from '../application/ComponentBase'
import Editable from '../components/Editable'

export default class Attribute extends ComponentBase {
  handleValueChange(value) {
    this.props.onChange({
      ...this.props.attribute,
      value
    }, this.props.attribute)
  }

  render() {
    const {
      attribute: { key, name, value },
      className,
      readonly,
    } = this.props

    let display = name ? name : startCase(toLower(key))

    return (
      <div className={`attribute ${className}`}>
        <Editable className="name" value={display} readonly />
        <Editable className="value" value={value} min={0} max={10}
          readonly={readonly} onChange={this.handleValueChange}
        />
      </div>
    )
  }
}

Attribute.propTypes = {
  attribute: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number,
      React.PropTypes.string,
    ]).isRequired,
  }).isRequired,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  readonly: React.PropTypes.bool,
}
Attribute.defaultProps = {
  attribute: {
    key: 'new-attribute',
    value: 0,
  },
  className: '',
  onChange: to => {},
  readonly: false,
}
