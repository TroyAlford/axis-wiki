import _         from 'lodash'
import math      from 'mathjs'
import React     from 'react'
import ComponentBase from '../application/ComponentBase'

import Armor     from '../sheet/Armor'
import Attribute from '../sheet/Attribute'
import Section   from '../sheet/Section'
import Skill     from '../sheet/Skill'
import Trait     from '../sheet/Trait'
import Weapon    from '../sheet/Weapon'

export default class Sheet extends ComponentBase {
  constructor(props) {
    super(props)
    this._attributes = null
    this.recalculate = true
    this.state = {
      armor: this.props.armor || [],
      attributes: [],
      weapons: this.props.weapons || [],
      skills: this.props.skills || [],
      traits: this.props.traits || [],
    }
  }

  calc(expression, attributes) {
    let hash = {};
    let attrs = attributes || this._attributes;

    attrs.forEach(attr => { hash[attr.key] = attr.value })

    return math.parse(expression).compile().eval(hash)
  }

  attributes() {
    if (!this.recalculate && this._attributes !== null)
      return this._attributes;

    this.recalculate = false
    let armor_attribute = { key: 'armor', calc: '' }
    let equipped_armor = _.filter(this.state.armor, { equipped: true })
    armor_attribute.value = !equipped_armor.length ? 0 :
      _.sum(equipped_armor.map(armor => Array.isArray(armor.value)
        ? Math.round(_.sum(armor.value) / armor.value.length, 0)
        : armor.value
      ))

    let attributes = _([
      armor_attribute,
      { key: 'body', calc: 'round((agility + fitness + strength) / 3, 0)' },
      { key: 'might', calc: 'round((strength + fitness) / 2, 0) + size' },
      { key: 'mind', calc: 'round((acuity + focus + intellect) / 3, 0)' },
      { key: 'potency', calc: 'round((confidence + intellect + strength) / 3, 0)' },
      { key: 'reflex', calc: 'round((acuity + agility + intuition) / 3, 0)' },
      { key: 'resilience', calc: 'round((devotion + fitness + focus) / 3, 0)' },
      { key: 'spirit', calc: 'round((confidence + devotion + intuition) / 3, 0)' },
      { key: 'toughness', calc: 'round((strength + fitness + size) / 3, 0) + natural_armor + armor' },
      ...this.state.attributes,
      ...this.props.attributes,
    ]).uniqBy('key').value()

    const calc = this.calc
    _.filter(attributes, 'calc').forEach(attribute => {
      if (attribute.value === undefined)
        attribute['value'] = calc(attribute.calc, attributes)
    })

    return this._attributes = attributes
  }
  attribute(key) {
    return _.find(this.attributes(), { key }) || { key, value: 0 }
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

  render() {
    const { armor, traits, weapons } = this.state,
    skills = this.state.skills.map((skill, index) =>
      <Skill key={index} slug={skill.key} values={skill.value}
             name={name} category={skill.category} note={skill.note}
      />
    )

    return (
      <div className="sheet page">
        <div className="columns">
        {typeof this.attribute('image').value === 'string' &&
          <div className="portrait column is-one-third">
            <img className="portrait" src={this.attribute('image').value} />
          </div>}
          <div className="column">
            <div className="Demographics section">
              <div className="name">Demographics</div>
              <div className="attributes">
                {this.bindAttribute('player', 'cols-2')}
                {this.bindAttribute('height')}
                {this.bindAttribute('eyes')}
                {this.bindAttribute('homeland', 'cols-2')}
                {this.bindAttribute('weight')}
                {this.bindAttribute('hair')}
                {this.bindAttribute('race')}
                {this.bindAttribute('gender')}
                {this.bindAttribute('age')}
                {this.bindAttribute('skin')}
              </div>
            </div>
            <div className="Attributes section">
              <div className="name">Attributes</div>
              <div className="attributes">
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
              </div>
            </div>
            <div className="attributes">
              {this.bindAttribute('size')}
              {this.bindAttribute('natural_armor')}
              {this.bindAttribute('might', '', true)}
              {this.bindAttribute('toughness', '', true)}
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <Section name="Traits" header={['Name', 'Cost']}>
            {traits.map((trait, index) =>
              <Trait key={index} slug={trait.key} value={trait.value}
                name={trait.name} category={trait.category} note={trait.note}
              />
            )}
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
              <Section header={['Weapon', 'Dmg', 'Rng', 'Hit']}>
              {weapons.map((entry, index) =>
                <Weapon key={index} name={entry.name} values={entry.value} />
              )}
              </Section>
            </div>
            <div className="column">
              <Section className="Armor" header={['Armor', 'Head', 'Arms', 'Hand', 'Body', 'Legs', 'Feet', 'Avg']}>
                {armor.map((entry, index) =>
                  <Armor key={index} equipped={!!entry.equipped} name={entry.name} values={entry.value} />
                )}
              </Section>
            </div>
          </div>
        </Section>
      </div>
    );
  }
}

const example = require('../../example_sheet.json')

Sheet.propTypes = {
  armor:      React.PropTypes.array.isRequired,
  attributes: React.PropTypes.array.isRequired,
  weapons:    React.PropTypes.array.isRequired,
  traits:     React.PropTypes.array.isRequired,
  skills:     React.PropTypes.array.isRequired,
}
Sheet.defaultProps = {
  armor: [],
  attributes: [],
  weapons: [],
  traits: [],
  skills: [],
  ...example,
}
