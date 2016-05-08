import _                  from 'lodash'
import ComponentBase      from '../application/ComponentBase'
import XHR                from '../helpers/XHR'

import Attribute          from '../sheet/Attribute'
import AttributesSection  from '../sheet/AttributesSection'
import Section            from '../sheet/Section'

export default class Sheet extends ComponentBase {
  constructor(props) {
    super(props);
    this.state = this.example_sheet;
    this.attrs = {}
  }

  get example_sheet() {
    return require('../../config/example_sheet.json');
  }

  attr(name) {
    if (Object.keys(this.attrs).length == 0)
      [
        { name: "image_url", value: this.state.image_url },
        ...this.state.demographics, 
        ...this.state.attributes, 
        ...this.state.traits,
        ...this.state.skills
      ].forEach(attr => this.attrs[attr.name] = attr);
    return this.attrs[name];
  }

  render() {
    return (
      <div className="sheet page">
        <div className="columns">
          {this.state.image_url
          ? <div className="column is-one-third">
              <img className="portrait" src={this.state.image_url} />
            </div>
          : ''}
          <div className="column">
            <Section name="Demographics" attrs={this.state.demographics} />
            <AttributesSection attrs={this.state.attributes} />
            <div className="attributes">
              <Attribute attr={this.attr('size')} />
              <Attribute attr={this.attr('natural_armor')} />
              <Attribute attr={{
                name: 'Might',
                value: Math.round(
                  this.attr('size').value + (
                    this.attr('strength').value + this.attr('fitness').value
                  ) / 2
                )
              }} />
              <Attribute attr={{ 
                name: 'Toughness',
                value: Math.round(
                  this.attr('natural_armor').value + 
                  (_.sumBy(this.state.armor, 'value') / this.state.armor.length) +
                  (this.attr('strength').value + this.attr('fitness').value + this.attr('size').value) / 3
                )
              }} />
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <Section name="Traits" header={['Name', 'Cost']} 
                     attrs={this.state.traits} 
            />
          </div>
          <div className="column">
            <Section name="Skills">
              <div className="columns">
                <div className="column is-half">
                  <Section 
                    header={['Name', 'Th', 'Ms']}
                    attrs={this.state.skills.slice(0, Math.ceil(this.state.skills.length / 2))} 
                  />
                </div>
                <div className="column is-half">
                  <Section 
                    header={['Name', 'Th', 'Ms']}
                    attrs={this.state.skills.slice(Math.ceil(this.state.skills.length / 2 + 1))} 
                  />
                </div>
              </div>
            </Section>
          </div>
        </div>
        <Section name="Equipment">
          <div className="columns">
            <div className="column">
              <Section
                header={['Weapon', 'Dmg', 'Range', 'Hit']}
                attrs={this.state.weapons}
              />
            </div>
            <div className="column">
              <Section
                header={['Armor', 'Head', 'Arms', 'Hand', 'Body', 'Legs', 'Feet', 'Avg']}
                attrs={this.state.armor}
              />
            </div>
          </div>
        </Section>
      </div>
    );
  }
}