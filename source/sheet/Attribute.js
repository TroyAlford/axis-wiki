import _             from 'lodash'
import ComponentBase from '../application/ComponentBase'
import React         from 'react'
import Editable      from '../components/Editable'

export default class Attribute extends ComponentBase {
  parseName(name) {
    if (typeof name !== 'string' || !Attribute.splitter.test(name))
      return name

    let split = Attribute.splitter.exec(name).splice(1)
    return split.map(item => (item || '').replace(/\s{2,}/g, ' ').trim())
  }

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

Attribute.splitter =
  new RegExp(/^(?:([a-z0-9 ]*):)?([a-z0-9 ]*)(?:\(([a-z0-9 ]*)\))?/mi)

const T = React.PropTypes

Attribute.propTypes = {
  attribute: T.shape({
    key: T.string.isRequired,
    name: T.string,
    value: T.oneOfType([ T.number, T.string ]).isRequired,
  }).isRequired,
  className: T.string,
  onChange: T.func.isRequired,
}
Attribute.defaultProps = {
  attribute: {
    key: '',
    value: 0,
  },
  className: '',
  onChange: to => {}
}
