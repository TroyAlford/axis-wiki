import * as React from 'react'

import { startCase, sum, toLower } from 'lodash'
import Slug from '../../utility/Slugs'

import Editable from '../components/Editable'

export default class Armor extends React.Component {
  render() {
    const { equipped, key, name, values } = this.props.armor,
      average = Math.round(sum(values) / values.length, 0),
      display = name ? name : startCase(toLower(key))

    return (
      <div className="armor">
        <Editable className="equipped" value={!!equipped}
          readonly={this.props.readonly}
          onChange={equipped => {
            if (equipped === this.props.armor.equipped) return;
            this.props.onChange({
              ...this.props.armor,
              equipped,
            }, this.props.armor)
          }}
        />
        <Editable className="name" value={display}
          readonly={this.props.readonly}
          onChange={name => {
            if (name === this.props.armor.name) return;
            this.props.onChange({
              ...this.props.armor,
              name, key: Slug(name),
            }, this.props.armor)
          }}
        />
      {values.map((value, index) =>
        <Editable key={index} className="value" value={value}
          readonly={this.props.readonly}
          onChange={value => {
            if (value === this.props.armor.values[index]) return;
            const values = [...this.props.armor.values]
            values[index] = value

            this.props.onChange({
              ...this.props.armor,
              values,
            }, this.props.armor)
          }}
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
