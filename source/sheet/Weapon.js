import * as React from 'react'

import {
  startCase,
  sum,
  toLower
} from 'lodash'

import Editable from '../components/Editable'

export default class Weapon extends React.Component {
  setEquipped(equipped) {
    this.props.onChange({
      ...this.props.weapon,
      equipped
    })
  }
  handleValueChange(index, value) {
    let { values }  = this.props.weapon
    values[index] = value

    this.props.onChange({
      ...this.props.weapon,
      values
    })
  }

  render() {
    const { equipped, key, name, values } = this.props.weapon,
      display = name ? name : startCase(toLower(key))
    return (
      <div className="weapon">
        <Editable className="equipped" value={!!equipped}
          onChange={this.setEquipped.bind(this, !equipped)}
        />
        <Editable className="name" value={display} />
      {values.map((value, index) =>
        <Editable key={index} className="value" value={value}
          onChange={this.handleValueChange.bind(this, index)}
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
