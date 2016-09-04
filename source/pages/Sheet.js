import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {
  deleteSheet,
  loadSheet,
  loadedSheet,
  saveSheet
} from '../redux/sheet/actions'
import {
  find,
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

    this.sheetHeader.props.name = this.getName(nextProps.descriptors)
  }

  componentDidMount() {
    this.handleChange('armor', this.armorManager.collection)
  }
  componentDidUpdate() {
    this.handleChange('armor', this.armorManager.collection)
  }

  handleChange(type, collection) {
    if (!this.armorManager || !this.attributeManager ||
        !this.skillManager || !this.traitManager ||
        !this.weaponManager || !this.sheetHeader)
      return;

    const header = this.sheetHeader
    const armor = this.armorManager.collection
    const attributes = this.attributeManager.collection
    const skills = this.skillManager.collection
    const traits = this.traitManager.collection
    const weapons = this.weaponManager.collection

    switch (type) {
      case 'armor':
        return attributes.update({ key: 'armor' },
          { value: this.armorManager.getEquippedValue() }
        )
    }
  }

  getName(descriptors = this.props.descriptors) {
    const descriptor = find(descriptors, { key: 'name' })
    return (descriptor && descriptor.value !== '')
      ? descriptor.value
      : startCase(this.props.slug)
  }
  getImageUrl() {
    const image = find(this.props.descriptors, { key: 'image' })
    return image ? image.value : ''
  }

  render() {
    return (
      <div className="sheet page">
        <SheetHeader
          name={this.getName()}
          xp={0}
          rp={0}
          power={0}
          ref={self => this.sheetHeader = self}
        />
        <div className="columns">
          <div className="column is-one-third">
            <Section name="Portrait">
              <div className="portrait frame">
                <div className="portrait display" style={{
                  backgroundImage: `url(${this.getImageUrl()})`
                }}></div>
              </div>
            </Section>
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
