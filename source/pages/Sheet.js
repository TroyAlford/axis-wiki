import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {
  deleteSheet,
  loadSheet,
  loadedSheet,
  saveSheet
} from '../redux/sheet/actions'
import {
  flatten,
  flow,
  map,
  reduce,
  reject,
  startCase,
  sumBy,
} from 'lodash'

import * as React from 'react'
import ComponentBase from '../application/ComponentBase'

import Armor from '../sheet/Armor'
import ArmorManager from '../sheet/ArmorManager'
import Attribute from '../sheet/Attribute'
import AttributeManager from '../sheet/AttributeManager'
import Descriptor from '../sheet/Descriptor'
import DescriptorManager from '../sheet/DescriptorManager'
import Section from '../sheet/Section'
import SkillManager from '../sheet/SkillManager'
import SheetHeader from '../sheet/SheetHeader'
import Skill from '../sheet/Skill'
import Trait from '../sheet/Trait'
import TraitManager from '../sheet/TraitManager'
import Weapon from '../sheet/Weapon'
import WeaponManager from '../sheet/WeaponManager'

const createRange = (low, high) => low > high ? [] :
  Array.apply(null, Array(Math.abs(high - low) + 1))
       .map((discard, n) => n + low)

class Sheet extends ComponentBase {
  constructor(props) {
    super(props)

    const { params: { slug, ownerId } } = this.props
    if (this.props.slug !== slug)
      this.props.dispatch(loadSheet(slug, ownerId))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slug !== this.props.slug // New Article is loading
      && nextProps.slug !== nextProps.params.slug) { // & the page location doesn't show it
      let path = this.props.route.path.split('/')
      path.pop()
      path.push(nextProps.slug)
      browserHistory.replace(path.join('/'))
    }

    if (this.props.params.slug !== nextProps.params.slug) {
      this.props.dispatch(loadSheet(nextProps.params.slug, nextProps.params.ownerId))
    }
  }

  componentDidUpdate() {
    this.handleChange('armor', this.armorManager.collection)
  }

  calculate_power() {
    let power = 0

    const attribute_values = flow([
      array => reject(array, attr => attr.hasOwnProperty('calc')),
      array => reject(array, { key: 'natural_armor' }),
      array => reject(array, { key: 'size' }),
      array => map(array, attr => createRange(1, attr.value)),
      array => flatten(array)
    ])(this.attributes())

    power += reduce(attribute_values, (sum, value) =>
      sum + (value === 1 ? 5 : Math.pow(value, 3))
    )

    const skill_values = flow([
      array => map(array, skill => [
        ...createRange(1, skill.values[0]),
        ...createRange(2, skill.values[1]),
      ]),
      array => flatten(array)
    ])(this.state.skills)

    power += reduce(skill_values, (sum, value) =>
      sum + Math.pow(value, 2)
    )

    power += sumBy(this.state.traits, 'value')

    return power
  }

  handleChange(type, collection) {
    const attributes = this.attributeManager.collection

    switch (type) {
      case 'armor':
        return attributes.update({ key: 'armor' },
          { value: this.armorManager.getEquippedValue() }
        )
    }
  }

  render() {
    const characterName = startCase(this.props.slug)
    const armor = { key: 'armor', value: this.equippedArmorValue || 0 }
    const image = find(this.props.descriptors, { key: 'image' })
    const imageUrl = image && image.value ? image.value : ''

    return (
      <div className="sheet page">
        {false && <SheetHeader
          name={characterName}
          xp={this.descriptor('current_xp').value || 0}
          rp={this.descriptor('rp').value || 0}
          power={this.calculate_power()} />}
        <div className="columns">
          <div className="portrait column is-one-third">
            <div className="portrait" style={{
              backgroundImage: `url(${imageUrl})`
            }}></div>
          </div>
          <div className="column">
            <DescriptorManager items={this.props.descriptors}
              ref={self => this.descriptorManager = self}
            />
            <AttributeManager items={this.props.attributes}
              ref={self => this.attributeManager = self}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <TraitManager items={this.props.traits}
              ref={self => this.traitManager = self}
            />
          </div>
          <div className="column">
            <SkillManager items={this.props.skills}
              ref={self => this.skillManager = self}
            />
          </div>
        </div>
        <Section className="Equipment">
          <div className="columns">
            <div className="column">
              <WeaponManager items={this.props.weapons}
                ref={self => this.weaponManager = self}
              />
            </div>
            <div className="column">
              <ArmorManager items={this.props.armor}
                ref={self => this.armorManager = self}
                onChange={this.handleChange.bind(this, 'armor')}
              />
            </div>
          </div>
        </Section>
      </div>
    );
  }
}

Sheet.propTypes = {
  armor: React.PropTypes.array.isRequired,
  attributes: React.PropTypes.array.isRequired,
  descriptors: React.PropTypes.array.isRequired,
  ownerId: React.PropTypes.string,
  skills: React.PropTypes.array.isRequired,
  slug: React.PropTypes.string,
  traits: React.PropTypes.array.isRequired,
  weapons: React.PropTypes.array.isRequired,
}
Sheet.defaultProps = {
  armor: [],
  attributes: [],
  descriptors: [],
  ownerId: undefined,
  skills: [],
  slug: undefined,
  traits: [],
  weapons: [],
}

export default connect(
  state => state.sheet
)(Sheet);
