import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {
  deleteSheet,
  loadSheet,
  loadedSheet,
  saveSheet
} from '../redux/sheet/actions'
import {
  differenceBy,
  filter,
  find,
  flatten,
  flow,
  map,
  orderBy,
  reduce,
  reject,
  sortBy,
  startCase,
  sum,
  sumBy,
  uniqBy,
} from 'lodash'
import { slugify } from '../../utility/Slugs'

import * as React from 'react'
import ComponentBase from '../application/ComponentBase'
import math from '../mathjs'

import Armor from '../sheet/Armor'
import Attribute from '../sheet/Attribute'
import Descriptor from '../sheet/Descriptor'
import Section from '../sheet/Section'
import SheetHeader from '../sheet/SheetHeader'
import Skill from '../sheet/Skill'
import Trait from '../sheet/Trait'
import Weapon from '../sheet/Weapon'

const keyObjects = collection => map(collection, (el, id) => ({ id, ...el }));
const createRange = (low, high) => low > high ? [] :
  Array.apply(null, Array(Math.abs(high - low) + 1))
       .map((discard, n) => n + low)

class Sheet extends ComponentBase {
  constructor(props) {
    super(props)
    this._attributes = null
    this.recalculate = true

    const { params: { slug, ownerId } } = this.props
    if (this.props.slug !== slug)
      this.props.dispatch(loadSheet(slug, ownerId))

    this.state = {
      attributes: [],
      armor: keyObjects(this.props.armor || []),
      descriptors: this.props.descriptors || [],
      skills: keyObjects(this.props.skills || []),
      traits: keyObjects(this.props.traits || []),
      weapons: keyObjects(this.props.weapons || []),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.recalculate = true
    this.setState({
      attributes: [],
      armor: keyObjects(nextProps.armor || []),
      descriptors: nextProps.descriptors || [],
      slug: nextProps.slug || this.props.params.slug,
      skills: keyObjects(nextProps.skills || []),
      traits: keyObjects(nextProps.traits || []),
      weapons: keyObjects(nextProps.weapons || []),
    })

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

  calc(expression, attributes) {
    let hash = {};
    let attrs = attributes || this._attributes;

    attrs.forEach(attr => { hash[attr.key] = attr.value })

    const parser = math.parser()
    const parsed = math.parse(expression)
    parsed.traverse(node => {
      if (node.type === 'SymbolNode')
        parser.set(node.name, attributes[node.name] || 0)
    })
    return parser.eval(expression)
  }

  attributes() {
    if (!this.recalculate && this._attributes !== null)
      return this._attributes;

    this.recalculate = false

    let attributes = uniqBy([
      { key: 'armor', calc: '',
        value: flow([
          array => filter(array, { equipped: true }),
          array => map(array, armor => Math.round(sum(armor.values) / armor.values.length, 0)),
          array => sum(array)
        ])(this.state.armor)
      },
      { key: 'body', calc: 'round((agility + fitness + strength) / 3, 0)' },
      { key: 'might', calc: 'round((strength + fitness) / 2, 0) + size' },
      { key: 'mind', calc: 'round((acuity + focus + intellect) / 3, 0)' },
      { key: 'potency', calc: 'round((confidence + intellect + strength) / 3, 0)' },
      { key: 'reflex', calc: 'round((acuity + agility + intuition) / 3, 0)' },
      { key: 'resilience', calc: 'round((devotion + fitness + focus) / 3, 0)' },
      { key: 'spirit', calc: 'round((confidence + devotion + intuition) / 3, 0)' },
      { key: 'toughness', calc: 'round((strength + fitness + size) / 3, 0) + natural_armor + armor' },
      ...differenceBy(this.props.attributes, this.state.attributes, 'key'),
      ...this.state.attributes,
    ], 'key')

    const calc = this.calc
    attributes.filter(attr => !!attr.calc).forEach(attr => {
      attr.value = calc(attr.calc, attributes)
    })

    return this._attributes = attributes
  }
  attribute(key) {
    return find(this.attributes(), { key }) || { key, value: 0 }
  }
  descriptor(key) {
    return find(this.state.descriptors, { key }) || { key, value: '' }
  }

  bindAttribute(name, className = '', readonly = false) {
    return (
      <Attribute attribute={this.attribute(name)} className={className}
        onChange={this.handleAttributeChange} readonly={readonly}
      />
    )
  }
  handleAttributeChange(attribute) {
    this.recalculate = true
    this.setState({ attributes: [
      ...this.state.attributes.filter(attr => attr.key !== attribute.key),
      attribute
    ]})
  }
  bindDescriptor(name, className = '', readonly = false) {
    return (
      <Descriptor descriptor={this.descriptor(name)} className={className}
        onChange={this.handleDescriptorChange} readonly={readonly}
      />
    )
  }
  handleDescriptorChange(descriptor) {
    this.setState({ descriptors: [
      ...this.state.descriptors.filter(desc => desc.key !== descriptor.key),
      descriptor,
    ]})
  }
  handleArmorChange(armor) {
    this.recalculate = true
    this.setState({ armor: [
      ...this.state.armor.filter(el => el.id !== armor.id),
      { ...armor, key: slugify(armor.name) },
    ]})
  }
  handleSkillChange(skill) {
    this.setState({ skills: [
      ...this.state.skills.filter(el => el.id !== skill.id),
      { ...skill, key: slugify(skill.name) },
    ]})
  }
  handleTraitChange(trait) {
    this.setState({ traits: [
      ...this.state.traits.filter(el => el.id !== trait.id),
      { ...trait, key: slugify(trait.name) },
    ]})
  }
  handleWeaponChange(weapon) {
    this.recalculate = true
    this.setState({ weapons: [
      ...this.state.weapons.filter(el => el.id !== weapon.id),
      { ...weapon, key: slugify(weapon.name) },
    ]})
  }

  render() {
    const characterName = startCase(this.props.slug),
    armor = flow([
      array => orderBy(array, ['equipped', 'name'], ['desc', 'asc']),
      array => map(array, armor =>
        <Armor key={armor.id} armor={armor}
          onChange={this.handleArmorChange}
        />
      )
    ])(this.state.armor),
    skills = flow([
      array => sortBy(array, skill => [
        skill.category || '',
        skill.name || skill.key,
        skill.note || ''
      ].join('').toLowerCase()),
      array => map(array, skill =>
        <Skill key={skill.id} skill={skill}
          onChange={this.handleSkillChange}
        />
      )
    ])(this.state.skills),
    traits = flow([
      array => sortBy(array, trait => [
        trait.category || '',
        trait.name || trait.key,
        trait.note || ''
      ].join('').toLowerCase()),
      array => map(array, trait =>
        <Trait key={trait.id} trait={trait}
          onChange={this.handleTraitChange}
        />
      )
    ])(this.state.traits),
    weapons = flow([
      array => orderBy(array, ['equipped', 'name'], ['desc', 'asc']),
      array => map(array, weapon =>
        <Weapon key={weapon.id} weapon={weapon}
          onChange={this.handleWeaponChange}
        />
      )
    ])(this.state.weapons)

    return (
      <div className="sheet page">
        <SheetHeader
          name={characterName}
          xp={this.descriptor('current_xp').value || 0}
          rp={this.descriptor('rp').value || 0}
          power={this.calculate_power()} />
        <div className="columns">
        {typeof this.descriptor('image').value === 'string' &&
          <div className="portrait column is-one-third">
            <img className="portrait" src={this.descriptor('image').value} />
          </div>}
          <div className="column">
            <Section className="Descriptors">
              {this.bindDescriptor('player')}
              {this.bindDescriptor('height')}
              {this.bindDescriptor('eyes')}
              {this.bindDescriptor('homeland')}
              {this.bindDescriptor('weight')}
              {this.bindDescriptor('hair')}
              {this.bindDescriptor('race')}
              {this.bindDescriptor('gender')}
              {this.bindDescriptor('age')}
            </Section>
            <Section name="Attributes">
              <div className="placeholder attribute"></div>
              {this.bindAttribute('body', 'th', true)}
              {this.bindAttribute('mind', 'th', true)}
              {this.bindAttribute('spirit', 'th', true)}

              {this.bindAttribute('potency', 'th', true)}
              {this.bindAttribute('strength')}
              {this.bindAttribute('intellect')}
              {this.bindAttribute('confidence')}

              {this.bindAttribute('reflex', 'th', true)}
              {this.bindAttribute('agility')}
              {this.bindAttribute('acuity')}
              {this.bindAttribute('intuition')}

              {this.bindAttribute('resilience', 'th', true)}
              {this.bindAttribute('fitness')}
              {this.bindAttribute('focus')}
              {this.bindAttribute('devotion')}
            </Section>
            <Section className="Combat">
              {this.bindAttribute('size')}
              {this.bindAttribute('natural_armor')}
              {this.bindAttribute('might', '', true)}
              {this.bindAttribute('toughness', '', true)}
            </Section>
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <Section name="Traits"
              header={['Name', 'Cost']}>
              {traits}
            </Section>
          </div>
          <div className="column">
            <Section name="Skills">
              <div className="columns">
                <div className="column is-half">
                  <Section header={['Name', 'Th', 'Ms']}>
                    {skills.slice(0, Math.ceil(skills.length / 2))}
                  </Section>
                </div>
                <div className="column is-half">
                  <Section header={['Name', 'Th', 'Ms']}>
                    {skills.slice(Math.ceil(skills.length / 2))}
                  </Section>
                </div>
              </div>
            </Section>
          </div>
        </div>
        <Section name="Equipment">
          <div className="columns">
            <div className="column">
              <Section className="Weapons"
                header={['Use', 'Weapon', 'Dmg', 'Rng', 'Hit']}>
                {weapons}
              </Section>
            </div>
            <div className="column">
              <Section className="Armor"
                header={['Use', 'Armor', 'Head', 'Arms', 'Hand', 'Body', 'Legs', 'Feet', 'Avg']}>
                {armor}
              </Section>
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
