import * as React from 'react'
import ComponentBase from '../application/ComponentBase'
import Editable from '../components/Editable'
import {
  filter, flatten, flow, includes,
  map, omit, pick, sum,
} from 'lodash'

export default class SheetHeader extends ComponentBase {
  constructor(props) {
    super(props)
    this.state = pick(props, ['name', 'xp', 'rp'])
  }
  componentWillReceiveProps(nextProps) {
    const state = pick(nextProps, ['name', 'xp', 'rp'])
    this.setState(state)
  }

  calculatePower() {
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
      array => map(array, attr => this.createRange(1, attr.value)),
      array => flatten(array),
      array => map(array, value => value === 1 ? 5 : Math.pow(value, 3)),
      array => sum(array),
    ])(this.props.attributes)
  }
  calculateSkills() {
    return flow([
      array => map(array, skill => [
        ...this.createRange(1, skill.values[1]),
        ...this.createRange(2, skill.values[0]),
      ]),
      array => flatten(array),
      array => map(array, value =>
        value === 1 ? 2 : Math.pow(value, 2)
      ),
      array => sum(array),
    ])(this.props.skills)
  }
  calculateTraits() {
    return flow([
      array => map(array, trait => trait.value),
      array => sum(array)
    ])(this.props.traits)
  }

  createRange(low, high) {
    return low > high ? [] :
      Array.apply(null, Array(Math.abs(high - low) + 1))
           .map((discard, n) => n + low)
  }

  handleChange(key, value) {
    this.props.onChange(omit({
      ...this.props,
      [key]: value
    }, ['onChange']))
  }

  render() {
    return (
      <div className="sheet-header">
        <Editable className="CharacterName" readonly={this.props.readonly}
          onChange={name => this.handleChange('name', name)}
          value={this.state.name}
        />
        <span className="name">Experience: </span>
        <Editable className="xp" readonly={this.props.readonly}
          onChange={xp => this.handleChange('xp', xp)}
          value={this.state.xp}
        />
        <span className="name">RP Points: </span>
        <Editable className="rp" readonly={this.props.readonly}
          onChange={rp => this.handleChange('rp', rp)}
          value={this.state.rp}
        />
        <span className="name">Total Power: </span>
        <div className="power">{this.calculatePower()}</div>
      </div>
    )
  }
}

SheetHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  attributes: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.number.isRequired,
  })).isRequired,
  skills: React.PropTypes.arrayOf(React.PropTypes.shape({
    values: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  })).isRequired,
  traits: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.number.isRequired,
  })).isRequired,

  rp: React.PropTypes.number.isRequired,
  xp: React.PropTypes.number.isRequired,

  readonly: React.PropTypes.bool.isRequired,

  onChange: React.PropTypes.func.isRequired,
}
SheetHeader.defaultProps = {
  name: 'Unnamed Character',
  attributes: [],
  skills: [],
  traits: [],

  rp: 0,
  xp: 0,

  readonly: false,

  onChange: () => {},
}
