import { filter, find, isEqual, pick, sum } from 'lodash'

import * as React from 'react'
import ComponentBase from '../application/ComponentBase'
import ArmorManager from '../sheet/ArmorManager'
import AttributeManager from '../sheet/AttributeManager'
import DescriptorManager from '../sheet/DescriptorManager'
import JsonFormatter from '../sheet/JsonFormatter'
import Portrait from '../sheet/Portrait'
import Section from '../sheet/Section'
import SheetHeader from '../sheet/SheetHeader'
import SkillManager from '../sheet/SkillManager'
import TraitManager from '../sheet/TraitManager'
import WeaponManager from '../sheet/WeaponManager'
import WoundTracker from '../sheet/WoundTracker'

const propsToExtract = [
  'image', 'name', 'xp', 'rp',
  'armor', 'attributes', 'descriptors',
  'traits', 'skills', 'weapons', 'wounds',
]

const defaultState = {
  name: 'Unnamed Character',

  rp: 0,
  xp: 0,

  wounds: {
    light: 0,
    deep:  0,
  },

  armor:       [],
  attributes:  [],
  descriptors: [],
  skills:      [],
  traits:      [],
  weapons:     [],
}

export default class Sheet extends ComponentBase {
  constructor(props) {
    super(props)
    this.state = { ...defaultState, ...pick(props, propsToExtract) }
    this.formatter = { cleansed: {}, json: '{}' }
  }

  componentWillReceiveProps(props) {
    const state = { ...defaultState, ...pick(props, propsToExtract) }
    if (!isEqual(this.state, state)) {
      this.setState(state)
    }
  }

  handleChange(key, value) {
    if (!isEqual(this.state[key], value)) {
      this.props.onChange({
        ...this.state,
        [key]: value,
      })
    }
  }

  render() {
    const armorValue = sum(filter(this.state.armor, { equipped: true }).map(armor =>
      Math.round(sum(armor.values) / armor.values.length, 0)
    ))
    const resilienceAttr = find(this.state.attributes, { key: 'resilience' })
    const resilience = resilienceAttr ? resilienceAttr.value : 0

    return (
      <div className="sheet page">
        <SheetHeader readonly={this.props.readonly}
          name={this.state.name}
          xp={this.state.xp} rp={this.state.rp}
          onChange={values => this.props.onChange({ ...this.state, ...values })}
          attributes={this.state.attributes}
          skills={this.state.skills}
          traits={this.state.traits}
        />
        <div className="columns">
          <div className="column is-one-third rows">
            <Portrait url={this.state.image}
              onChange={image => this.handleChange('image', image)}
            />
            <WoundTracker
              onChange={wounds => this.handleChange('wounds', wounds)}
              resilience={resilience} wounds={this.props.wounds}
            />
          </div>
          <div className="column">
            <DescriptorManager readonly={this.props.readonly}
              items={this.state.descriptors}
              onChange={c => this.handleChange('descriptors', c.items)}
            />
            <AttributeManager
              armor={armorValue} readonly={this.props.readonly}
              items={this.state.attributes}
              onChange={c => this.handleChange('attributes', c.items)}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <TraitManager readonly={this.props.readonly}
              items={this.state.traits}
              onChange={c => this.handleChange('traits', c.items)}
            />
          </div>
          <div className="column">
            <SkillManager readonly={this.props.readonly}
              items={this.state.skills}
              onChange={c => this.handleChange('skills', c.items)}
            />
          </div>
        </div>
        <Section className="Equipment">
          <div className="columns">
            <div className="column">
              <WeaponManager readonly={this.props.readonly}
                items={this.state.weapons}
                onChange={c => this.handleChange('weapons', c.items)}
              />
            </div>
            <div className="column">
              <ArmorManager readonly={this.props.readonly}
                items={this.state.armor}
                onChange={c => this.handleChange('armor', c.items)}
              />
            </div>
          </div>
        </Section>
        <JsonFormatter {...this.state}
          ref={(self) => { this.formatter = self }}
        />
      </div>
    )
  }
}

Sheet.propTypes = {
  name: React.PropTypes.string.isRequired,

  rp: React.PropTypes.number.isRequired,
  xp: React.PropTypes.number.isRequired,

  wounds: React.PropTypes.shape({
    light: React.PropTypes.number.isRequired,
    deep:  React.PropTypes.number.isRequired,
  }),

  armor:       React.PropTypes.array.isRequired,
  attributes:  React.PropTypes.array.isRequired,
  descriptors: React.PropTypes.array.isRequired,
  skills:      React.PropTypes.array.isRequired,
  traits:      React.PropTypes.array.isRequired,
  weapons:     React.PropTypes.array.isRequired,

  readonly: React.PropTypes.bool.isRequired,

  onChange: React.PropTypes.func.isRequired,
}
Sheet.defaultProps = {
  ...defaultState,

  readonly: false,

  onChange: () => {},
}
