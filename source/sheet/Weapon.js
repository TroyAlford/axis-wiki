import * as React from 'react'

import { startCase, sum, toLower } from 'lodash'
import Slug from '../../utility/Slugs'

import Editable from '../components/Editable'

export default class Weapon extends React.Component {
  render() {
    const { equipped, key, name, values } = this.props.weapon,
      display = name ? name : startCase(toLower(key))
    return (
      <div className="weapon">
        <Editable className="equipped" value={!!equipped}
          readonly={this.props.readonly}
          onChange={equipped => {
            if (equipped === this.props.weapon.equipped) return;
            this.props.onChange({
              ...this.props.weapon,
              equipped,
            }, this.props.weapon)
          }}
        />
        <Editable className="name" value={display}
          readonly={this.props.readonly}
          onChange={name => {
            if (name === this.props.weapon.name) return;
            this.props.onChange({
              ...this.props.weapon,
              name, key: Slug(name),
            }, this.props.weapon)
          }}
        />
      {values.map((value, index) =>
        <Editable key={index} className="value" value={value}
          readonly={this.props.readonly}
          onChange={value => {
            if (value === this.props.weapon.values[index]) return;
            const values = [...this.props.weapon.values]
            values[index] = value

            this.props.onChange({
              ...this.props.weapon,
              values,
            }, this.props.weapon)
          }}
        />
      )}
      </div>
    )
  }
}

Weapon.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  weapon: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    equipped: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string,
    values: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  }),
}
Weapon.defaultProps = {
  onChange: () => {},
  weapon: {
    key: 'new-weapon',
    equipped: false,
    values: [0, 0, 0],
  },
}
