import _             from 'lodash'
import ComponentBase from '../application/ComponentBase'
import React         from 'react'
import Editable      from '../components/Editable'

export default class Attribute extends ComponentBase {
  handleValueChange(value) {
    let { key, name } = this.props.attribute
    this.props.onChange({ key, name, value })
  }

  render() {
    const {
      attribute: { key, name, value },
      className
    } = this.props

    let display = name ? name : _.startCase(_.toLower(key))

    return (
      <div className={`attribute ${className}`}>
        <Editable className="name" value={display} readonly />
        <Editable className="value" value={value}
          onChange={this.handleValueChange}
          readonly={this.props.readonly}
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
      React.PropTypes.number,
      React.PropTypes.string,
    ]).isRequired,
  }).isRequired,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
}
Attribute.defaultProps = {
  attribute: {
    key: '',
    value: 0,
  },
  className: '',
  onChange: to => {}
}
