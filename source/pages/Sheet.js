import _         from 'lodash'
import math      from 'mathjs'
import React     from 'react'
import ComponentBase from '../application/ComponentBase'

import Armor     from '../sheet/Armor'
import Attribute from '../sheet/Attribute'
import Section   from '../sheet/Section'
import Skill     from '../sheet/Skill'
import Weapon    from '../sheet/Weapon'

export default class Sheet extends ComponentBase {
  constructor(props) {
    super(props);
    this._attributes = null
    this.recalculate = true
    this.state = {
      armor: [],
      attributes: [],
      weapons: [],
      merits: [],
      skills: [],
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
    let attributes = _([
      { key: 'armor', calc: '',
        value: _.filter(this.state.armor, { equipped: true })
          .map(armor => Array.isArray(armor.value)
            ? Math.round(_.sum(armor.value) / armor.length, 0)
            : armor.value
          )
      },
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

  render() {
    const { armor, merits, skills, weapons } = this.state,
      attributes = this.attributes(),
      skills_l = skills.slice(0, Math.ceil(skills.length / 2)),
      skills_r = skills.slice(Math.ceil(skills.length / 2) + 1)

    return (
      <div className="sheet page">
        <div className="columns">
        {typeof this.attribute('image').value === 'string' &&
          <div className="column is-one-third">
            <img className="portrait" src={this.attribute('image').value} />
          </div>}
          <div className="column">
            <div className="Demographics section">
              <div className="name section-header">Demographics</div>
              <div className="attributes">
                <Attribute className="cols-2" attribute={this.attribute('player')} />
                <Attribute attribute={this.attribute('height')} />
                <Attribute attribute={this.attribute('eyes')} />
                <Attribute className="cols-2" attribute={this.attribute('homeland')} />
                <Attribute attribute={this.attribute('weight')} />
                <Attribute attribute={this.attribute('hair')} />
                <Attribute attribute={this.attribute('race')} />
                <Attribute attribute={this.attribute('gender')} />
                <Attribute attribute={this.attribute('age')} />
                <Attribute attribute={this.attribute('skin')} />
              </div>
            </div>
            <div className="Attributes section">
              <div className="name">Attributes</div>
              <div className="attributes">
                <div className="placeholder attribute"></div>
                <Attribute className="th" attribute={this.attribute('body')} />
                <Attribute className="th" attribute={this.attribute('mind')} />
                <Attribute className="th" attribute={this.attribute('spirit')} />

                <Attribute className="th" attribute={this.attribute('potency')} />
                <Attribute attribute={this.attribute('strength')} />
                <Attribute attribute={this.attribute('intellect')} />
                <Attribute attribute={this.attribute('confidence')} />

                <Attribute className="th" attribute={this.attribute('reflex')} />
                <Attribute attribute={this.attribute('agility')} />
                <Attribute attribute={this.attribute('acuity')} />
                <Attribute attribute={this.attribute('focus')} />

                <Attribute className="th" attribute={this.attribute('resilience')} />
                <Attribute attribute={this.attribute('confidence')} />
                <Attribute attribute={this.attribute('intuition')} />
                <Attribute attribute={this.attribute('devotion')} />
              </div>
            </div>
            <div className="attributes">
              <Attribute attribute={this.attribute('size')} />
              <Attribute attribute={this.attribute('natural_armor')} />
              <Attribute attribute={this.attribute('might')} />
              <Attribute attribute={this.attribute('toughness')} />
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <Section name="Traits" header={['Name', 'Cost']}
                     attrs={this.traits}
            />
          </div>
          <div className="column">
            <Section name="Skills">
              <div className="columns">
                <div className="column is-half">
                  <Section header={['Name', 'Th', 'Ms']}>
                    {skills_l.map((entry, key) => <Skill key={key} name={entry.name} value={entry.value} />)}
                  </Section>
                </div>
                <div className="column is-half">
                  <Section header={['Name', 'Th', 'Ms']}>
                    {skills_r.map((entry, key) => <Skill key={key} name={entry.name} value={entry.value} />)}
                  </Section>
                </div>
              </div>
            </Section>
          </div>
        </div>
        <Section name="Equipment">
          <div className="columns">
            <div className="column">
              <Section header={['Weapon', 'Dmg', 'Range', 'Hit']}>
                {weapons.map((entry, key) => <Weapon key={key} name={entry.name} values={entry.value} />)}
              </Section>
            </div>
            <div className="column">
              <Section header={['Armor', 'Head', 'Arms', 'Hand', 'Body', 'Legs', 'Feet', 'Avg']}>
                <span>{this.attribute('armor').value}</span>
                {armor.map((entry, key) => <Armor key={key} name={entry.name} values={entry.value} />)}
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
  merits:     React.PropTypes.array.isRequired,
  skills:     React.PropTypes.array.isRequired,
}
Sheet.defaultProps = {
  armor: [],
  attributes: [],
  weapons: [],
  merits: [],
  skills: [],
  ...example,
}
