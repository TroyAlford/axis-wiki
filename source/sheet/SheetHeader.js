import * as React from 'react'
import ComponentBase from '../application/ComponentBase'
import Editable from '../components/Editable'
import Slug from '../../utility/Slugs'
import {
  filter,
  flatten,
  flow,
  map,
  reduce,
  reject,
  sumBy,
} from 'lodash'

export default class SheetHeader extends ComponentBase {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.name })
  }

  calculate() {
    return (
      this.calculateAttributes()
      + this.calculateSkills()
      + this.calculateTraits()
    )
  }
  calculateAttributes() {
    const attributeKeys = [
      'strength', 'intellect', 'confidence',
      'agility',  'acuity',    'intuition',
      'fitness',  'focus',     'devotion',
    ]
    return flow([
      array => filter(array, attr => includes(attributeKeys, attr.key)),
      array => map(array, attr => createRange(1, attr.value)),
      array => flatten(array),
      array => reduce(array, (sum, value) =>
        sum + (value === 1 ? 5 : Math.pow(value, 3))
      )
    ])
  }
  calculateSkills() {
    return 0
  }
  calculateTraits() {
    return 0
  }

  getName() {
    return this.state.name
  }

  render() {
    this.calculate()

    return (
      <div className="sheet-header">
        <Editable className="CharacterName"
          onChanging={proposed => Slug(proposed) !== ''}
          onChange={name => this.setState({ name })}
          value={this.state.name}
        />
        <span className="name">Experience: </span>
        <Editable className="xp" value={this.props.xp} />
        <span className="name">RP Points: </span>
        <Editable className="rp" value={this.props.rp} />
        <span className="name">Total Power: </span>
        <Editable className="power" value={this.props.power} />
      </div>
    )
  }
}

SheetHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  attributes: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
  })).isRequired,
  skills: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    values: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  })).isRequired,
  traits: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
  })).isRequired,
}
SheetHeader.defaultProps = {
  name: 'Unnamed Character',
  attributes: [],
  skills: [],
  traits: [],
}
