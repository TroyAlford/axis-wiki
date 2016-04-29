import ComponentBase      from '../application/ComponentBase'
import XHR                from '../helpers/XHR'

import AttributesSection  from '../sheet/AttributesSection'
import Section            from '../sheet/Section'

export default class Sheet extends ComponentBase {
  constructor(props) {
    super(props);
    this.state = this.example_sheet;
  }

  get example_sheet() {
    return require('../../config/example_sheet.json');
  }

  render() {
    return (
      <div className="sheet page">
        <div className="columns">
          {this.state.image_url
          ? <div className="column is-one-third">
              <img src={this.state.image_url} />
            </div>
          : ''}
          <div className="column">
            <Section name="Demographics" attrs={this.state.demographics} />
            <AttributesSection attrs={this.state.attributes} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <Section name="Traits" header={["Name", "Cost"]} attrs={this.state.traits} />
          </div>
          <div className="column">
            <Section name="Skills">
              <span>Some random shit goes here.</span>
            </Section>
          </div>
        </div>
      </div>
    );
  }
}