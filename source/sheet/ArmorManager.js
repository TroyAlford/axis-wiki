import * as React from 'react'
import CollectionManager from './CollectionManager'
import Armor from './Armor'
import { orderBy, sum } from 'lodash'

export default class ArmorManager extends CollectionManager {
  renderItem(armor) {
    return (
      <Armor key={armor.id} armor={armor}
        onChange={super.handleChange.bind(this)}
        onEditEnd={super.handleEditEnd.bind(this)}
      />
    )
  }
}

ArmorManager.propTypes = {
  ...CollectionManager.propTypes,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    equipped: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string,
    values: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  })).isRequired,
}
ArmorManager.defaultProps = {
  ...CollectionManager.defaultProps,
  title: 'Armor',
  headers: ['Use', 'Armor', 'Head', 'Arms', 'Hand', 'Body', 'Legs', 'Feet', 'Avg'],
  settings: {
    template: {
      key: 'new-armor',
      values: [0, 0, 0, 0, 0, 0]
    },
    orderBy: list => orderBy(list, armor => [!armor.equipped, armor.name])
  }
}
