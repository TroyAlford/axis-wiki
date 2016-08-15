import ComponentBase from '../application/ComponentBase'
import Editable      from '../components/Editable'
import * as React         from 'react'
import startCase     from 'lodash/startCase'
import toLower       from 'lodash/toLower'

export default class Descriptor extends ComponentBase {
  handleValueChange(value) {
    let { key, name } = this.props.descriptor
    this.props.onChange({ key, name, value })
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
        <Editable className="value" value={value}
          onChange={this.handleValueChange}
          readonly={readonly}
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
  onChange: React.PropTypes.func.isRequired,
  readonly: React.PropTypes.bool,
}
Descriptor.defaultProps = {
  descriptor: {
    value: 0,
  },
  className: '',
  onChange: to => {},
  readonly: false,
}
