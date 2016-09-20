import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { filter, find, isEqual, pick, sum } from 'lodash'

import * as React from 'react'
import ComponentBase from '../application/ComponentBase'
import Armor from '../sheet/Armor'
import ArmorManager from '../sheet/ArmorManager'
import Attribute from '../sheet/Attribute'
import AttributeManager from '../sheet/AttributeManager'
import Descriptor from '../sheet/Descriptor'
import DescriptorManager from '../sheet/DescriptorManager'
import JsonFormatter from '../sheet/JsonFormatter'
import Section from '../sheet/Section'
import SheetHeader from '../sheet/SheetHeader'
import Skill from '../sheet/Skill'
import SkillManager from '../sheet/SkillManager'
import Trait from '../sheet/Trait'
import TraitManager from '../sheet/TraitManager'
import Weapon from '../sheet/Weapon'
import WeaponManager from '../sheet/WeaponManager'
import WoundTracker from '../sheet/WoundTracker'

const propsToExtract = [
  'name', 'xp', 'rp',
  'armor', 'attributes', 'descriptors',
  'traits', 'skills', 'weapons'
]

export default class Sheet extends ComponentBase {
  constructor(props) {
    super(props)
    this.state = { ...defaultState, ...pick(props, propsToExtract) }
    this.formatter = { cleansed: {}, json: '{}' }
  }

  componentWillReceiveProps(props) {
    const state = { ...defaultState, ...pick(props, propsToExtract) }
    if (!isEqual(this.state, state))
      this.setState(state)
  }

  getImageUrl() {
    const image = find(this.props.descriptors, { key: 'image' })
    return image ? image.value : ''
  }

  handleChange(key, value) {
    if (!isEqual(this.state[key], value)) {
      this.props.onChange({
        ...this.state,
        [key]: value,
      })
    }
  }
  handleHeaderChange(values) {
    // this.setState(values)
    this.props.onChange({
      ...this.state,
      ...values,
    })
  }

  render() {
    const armorValue = sum(filter(this.state.armor, { equipped: true }).map(armor =>
      Math.round(sum(armor.values) / armor.values.length, 0)
    ))

    return (
      <div className="sheet page">
        <SheetHeader readonly={this.props.readonly}
          name={this.state.name}
          xp={this.state.xp} rp={this.state.rp}
          onChange={this.handleHeaderChange}
          attributes={this.state.attributes}
          skills={this.state.skills}
          traits={this.state.traits}
        />
        <div className="columns">
          <div className="column is-one-third rows">
            <Section title="Portrait">
              <div className="portrait frame">
                <div className="portrait display" style={{
                  backgroundImage: `url(${this.getImageUrl()})`
                }}></div>
              </div>
            </Section>
            <WoundTracker
              light_wounds={this.state.light_wounds}
              deep_wounds={this.state.deep_wounds}
              onChange={values => this.setState(values)}
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
          ref={self => this.formatter = self}
        />
      </div>
    )
  }
}

const defaultState = {
  name: 'Unnamed Character',
  armor: [],
  attributes: [],
  descriptors: [],
  skills: [],
  traits: [],
  weapons: [],
}

Sheet.propTypes = {
  name: React.PropTypes.string.isRequired,
  armor: React.PropTypes.array.isRequired,
  attributes: React.PropTypes.array.isRequired,
  descriptors: React.PropTypes.array.isRequired,
  skills: React.PropTypes.array.isRequired,
  traits: React.PropTypes.array.isRequired,
  weapons: React.PropTypes.array.isRequired,

  readonly: React.PropTypes.bool.isRequired,

  onChange: React.PropTypes.func.isRequired,
}
Sheet.defaultProps = {
  ...defaultState,

  readonly: false,

  onChange: () => {},
}
