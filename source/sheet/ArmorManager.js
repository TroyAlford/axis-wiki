import * as React from 'react'
import CollectionManager from './CollectionManager'
import Armor from './Armor'

export default class ArmorManager extends CollectionManager {
  constructor(props) {
    super(props)
    this.handleChange = super.handleChange.bind(this)
    this.handleEditEnd = super.handleEditEnd.bind(this)
  }

  renderItem(armor) {
    return (
      <Armor key={armor.id} armor={armor}
        onChange={this.handleChange}
        onEditEnd={this.handleEditEnd}
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
  headline: 'Armor',
  headers: ['Use', 'Armor', 'Head', 'Arms', 'Hand', 'Body', 'Legs', 'Feet', 'Avg'],
  settings: {
    template: {
      key: 'new-armor',
      values: [0, 0, 0, 0, 0, 0]
    },
    orderBy: armor => [!armor.equipped, armor.name]
  }
}
