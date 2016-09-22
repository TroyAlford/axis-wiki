import * as React from 'react'
import CollectionManager from './CollectionManager'
import Icon from '../components/Icon'
import Weapon from './Weapon'
import { orderBy } from 'lodash'

export default class WeaponManager extends CollectionManager {
  renderItem(weapon) {
    return (
      <Weapon key={weapon.id} weapon={weapon}
        forceNameEditing={!weapon.key}
        readonly={this.props.readonly}
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
  title: [
    <Icon key="icon" name="weapon" />,
    'Weapons',
  ],
  headers: ['Use', 'Name', 'Dmg', 'Rng', 'Hit'],
  settings: {
    template: {
      key: '',
      equipped: false,
      values: [0, 0, 0],
    },
    orderBy: list => orderBy(list, weapon => [!weapon.equipped, weapon.name])
  }
}
