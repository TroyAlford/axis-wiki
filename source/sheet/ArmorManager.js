import * as React from 'react'
import CollectionManager from './CollectionManager'
import Armor from './Armor'
import Icon from '../components/Icon'
import { orderBy, sum } from 'lodash'

export default class ArmorManager extends CollectionManager {
  renderItem(armor) {
    return (
      <Armor key={armor.id} armor={armor}
        forceNameEditing={!armor.key}
        readonly={this.props.readonly}
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
  title: [
    <Icon key="icon" name="torso" />,
    'Armor',
  ],
  headers: [
    'Use', 'Name',
    <Icon name="head" />,
    <Icon name="arm" />,
    <Icon name="torso" />,
    <Icon name="hand" />,
    <Icon name="leg" />,
    <Icon name="feet" />,
    'Avg'
  ],
  settings: {
    template: {
      key: '',
      equipped: false,
      values: [0, 0, 0, 0, 0, 0]
    },
    orderBy: list => orderBy(list, armor => [!armor.equipped, armor.name])
  }
}
