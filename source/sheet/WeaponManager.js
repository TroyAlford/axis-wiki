import React from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'lodash'
import CollectionManager from './CollectionManager'
import Icon from '../components/Icon'
import Weapon from './Weapon'

export default class WeaponManager extends CollectionManager {
  constructor(props) {
    super(props)
    this.handleChange = super.handleChange.bind(this)
    this.handleEditEnd = super.handleEditEnd.bind(this)
  }
  renderItem(weapon) {
    return (
      <Weapon key={weapon.id} weapon={weapon}
        forceNameEditing={!weapon.key}
        readonly={this.props.readonly}
        onChange={this.handleChange}
        onEditEnd={this.handleEditEnd}
      />
    )
  }
}

WeaponManager.propTypes = {
  ...CollectionManager.propTypes,
  items: PropTypes.arrayOf(PropTypes.shape({
    key:      PropTypes.string.isRequired,
    equipped: PropTypes.bool.isRequired,
    name:     PropTypes.string,
    values:   PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
}
WeaponManager.defaultProps = {
  ...CollectionManager.defaultProps,
  title: [
    <Icon key="icon" name="weapon" />,
    'Weapons',
  ],
  headers:  ['Use', 'Name', 'Dmg', 'Rng', 'Hit'],
  settings: {
    template: {
      key:      '',
      equipped: false,
      values:   [0, 0, 0],
    },
    orderBy: list => orderBy(list, weapon => [!weapon.equipped, weapon.name]),
  },
}
