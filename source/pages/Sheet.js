import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {
  filter,
  find,
  sum,
} from 'lodash'
import {
  deleteSheet,
  loadSheet,
  loadedSheet,
  saveSheet
} from '../redux/sheet/actions'

import * as React from 'react'
import ComponentBase from '../application/ComponentBase'
import Armor from '../sheet/Armor'
import ArmorManager from '../sheet/ArmorManager'
import Attribute from '../sheet/Attribute'
import AttributeManager from '../sheet/AttributeManager'
import Descriptor from '../sheet/Descriptor'
import DescriptorManager from '../sheet/DescriptorManager'
import Section from '../sheet/Section'
import SheetHeader from '../sheet/SheetHeader'
import Skill from '../sheet/Skill'
import SkillManager from '../sheet/SkillManager'
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

    this.state = {}
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

    this.state = {}
  }

  getImageUrl() {
    const image = find(this.props.descriptors, { key: 'image' })
    return image ? image.value : ''
  }

  render() {
    const armor = this.state.armor || this.props.armor
    const armorValue = sum(filter(armor, { equipped: true }).map(armor =>
      Math.round(sum(armor.values) / armor.values.length, 0)
    ))

    return (
      <div className="sheet page">
        <SheetHeader
          name={this.state.name || this.props.name}
          onNameChange={name => this.setState({ name })}
          attributes={this.state.attributes || this.props.attributes}
          skills={this.state.skills || this.props.skills}
          traits={this.state.traits || this.props.traits}
          xp={0} rp={0}
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
            <DescriptorManager
              items={this.state.descriptors || this.props.descriptors}
              onChange={c => this.setState({ descriptors: c.items })}
            />
            <AttributeManager
              armor={armorValue}
              items={this.state.attributes || this.props.attributes}
              onChange={c => this.setState({ attributes: c.items })}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <TraitManager
              items={this.state.traits || this.props.traits}
              onChange={c => this.setState({ traits: c.items })}
            />
          </div>
          <div className="column">
            <SkillManager
              items={this.state.skills || this.props.skills}
              onChange={c => this.setState({ skills: c.items })}
            />
          </div>
        </div>
        <Section className="Equipment">
          <div className="columns">
            <div className="column">
              <WeaponManager
                items={this.state.weapons || this.props.weapons}
                onChange={c => this.setState({ weapons: c.items })}
              />
            </div>
            <div className="column">
              <ArmorManager
                items={this.state.armor || this.props.armor}
                onChange={c => this.setState({ armor: c.items })}
              />
            </div>
          </div>
        </Section>
      </div>
    );
  }
}

Sheet.propTypes = {
  name: React.PropTypes.string.isRequired,
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
  name: 'Unnamed Character',
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
