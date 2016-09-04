import * as React from 'react'
import CollectionManager from './CollectionManager'
import Weapon from './Weapon'

export default class WeaponManager extends CollectionManager {
  renderItem(weapon) {
    return (
      <Weapon key={weapon.id} weapon={weapon}
        onChange={super.handleChange.bind(this)}
        onEditEnd={super.handleEditEnd.bind(this)}
      />
    )
  }
}

WeaponManager.propTypes = {
  ...CollectionManager.propTypes,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    equipped: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string,
    values: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  })).isRequired,
}
WeaponManager.defaultProps = {
  ...CollectionManager.defaultProps,
  title: 'Weapons',
  headers: ['Use', 'Name', 'Dmg', 'Rng', 'Hit'],
  settings: {
    template: {
      key: 'new-weapon',
      values: [0, 0, 0],
    },
    orderBy: weapon => [!weapon.equipped, weapon.name]
  }
}
