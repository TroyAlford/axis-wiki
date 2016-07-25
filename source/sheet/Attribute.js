import _        from 'lodash'
import React    from 'react'
import Editable from '../components/Editable'

export default class Attribute extends React.Component {
  parseName(name) {
    if (typeof name !== 'string' || !Attribute.splitter.test(name))
      return name

    let split = Attribute.splitter.exec(name).splice(1)
    return split.map(item => (item || '').replace(/\s{2,}/g, ' ').trim())
  }

  handleValueChange(index, event) {

  }

  render() {
    const {
      attribute: { key, name, value },
      className
    } = this.props

    let display = name ? name : _.startCase(_.toLower(key))
    let values = Array.isArray(value) ? value : [value]

    return (
      <div className={`attribute ${className || ''}`}>
        <span className="name">{display}</span>
      {values.map((value, index) =>
        <span key={index} className="value">{value}</span>
      )}
      </div>
    )
  }
}

Attribute.splitter =
  new RegExp(/^(?:([a-z0-9 ]*):)?([a-z0-9 ]*)(?:\(([a-z0-9 ]*)\))?/mi)

const T = React.PropTypes

Attribute.propTypes = {
  name: T.string.isRequired,
  slug: T.string,
  value: T.oneOfType([
    T.number, T.string,
    T.arrayOf(T.oneOfType([ T.number, T.string ]))
  ]).isRequired,
  className: T.string,
}
Attribute.defaultProps = {
  name: '',
  slug: null,
  value: '',
  className: null,
}
