import * as React from 'react'

import {
  startCase,
  sum,
  toLower
} from 'lodash'
import Slug from '../../utility/Slugs'

import ComponentBase from '../application/ComponentBase'
import Editable from '../components/Editable'

export default class Armor extends ComponentBase {
  setEquipped(equipped) {
    this.props.onChange({
      ...this.props.armor,
      equipped
    }, this.props.armor)
  }
  handleNameChange(name) {
    this.props.onChange({
      ...this.props.armor,
      name,
      key: Slug(name)
    }, this.props.armor)
  }
  handleValueChange(index, value) {
    let { values } = this.props.armor
    values[index] = value;

    this.props.onChange({
      ...this.props.armor,
      values
    }, this.props.armor)
  }

  render() {
    const { equipped, key, name, values } = this.props.armor,
      average = Math.round(sum(values) / values.length, 0),
      display = name ? name : startCase(toLower(key))

    return (
      <div className="armor">
        <Editable className="equipped" value={!!equipped}
          onChange={this.setEquipped.bind(this, !equipped)}
        />
        <Editable className="name" value={display}
          onChange={this.handleNameChange.bind(this)}
        />
      {values.map((value, index) =>
        <Editable key={index} className="value" value={value}
          onChange={this.handleValueChange.bind(this, index)}
        />
      )}
        <div className="average value">
          <span>{average}</span>
        </div>
      </div>
    )
  }
}

Armor.propTypes = {
  armor: React.PropTypes.shape({
    equipped: React.PropTypes.bool.isRequired,
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    values: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
}
Armor.defaultProps = {
  armor: {
    equipped: false,
    key: 'generic-armor',
    values: [0,0,0,0,0,0],
  },
  onChange: () => {},
}
