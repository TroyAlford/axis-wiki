import ComponentBase from '../application/ComponentBase'
import Editable      from '../components/Editable'
import * as React         from 'react'
import startCase     from 'lodash/startCase'
import toLower       from 'lodash/toLower'

const nameParserRegEx = new RegExp(/^(?:([a-z0-9 ]*):)?([a-z0-9 ]*)(?:\(([a-z0-9 ]*)\))?/mi)

export default class Trait extends ComponentBase {
  static parseName(name) {
    if (typeof name !== 'string' || !nameParserRegEx.test(name))
      return { category: '', name: '', note: '' }

    let split = nameParserRegEx.exec(name).splice(1)
      .map(item => (item || '').replace(/\s{2,}/g, ' ').trim())

    return {
      category: split[0],
      name: split[1],
      note: split[2],
    }
  }

  displayName(props = this.props) {
    const { trait: { category, key, name, note } } = props
    let display = startCase(toLower(name || key))
    if (category) display = `${category}: ${display}`
    if (note) display = `${display} (${note})`
    return display
  }
  handleValueChange(value) {
    this.props.onChange({
      ...this.props.trait,
      value
    })
  }

  handleNameChange(displayName) {
    this.props.onChange({
      ...this.props.trait,
      ...Trait.parseName(displayName),
    })
  }

  render() {
    const {
      className,
      trait: { value }
    } = this.props

    return (
      <div className={`trait ${className}`}>
        <Editable className="name" onChange={this.handleNameChange}
          value={this.displayName()}
        />
        <Editable className="value" value={value}
          onChange={this.handleValueChange}
        />
      </div>
    )
  }
}

Trait.propTypes = {
  className: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  trait: React.PropTypes.shape({
    category: React.PropTypes.string,
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    note: React.PropTypes.string,
    value: React.PropTypes.number.isRequired,
  })
}
Trait.defaultProps = {
  className: '',
  onChange: () => {},
  trait: {
    key: 'new-trait',
    value: 0,
  },
}
