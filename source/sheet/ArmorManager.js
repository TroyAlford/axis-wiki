import * as React from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'lodash'
import CollectionManager from './CollectionManager'
import Armor from './Armor'
import Icon from '../components/Icon'

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
  items: PropTypes.arrayOf(PropTypes.shape({
    key:      PropTypes.string.isRequired,
    equipped: PropTypes.bool.isRequired,
    name:     PropTypes.string,
    values:   PropTypes.arrayOf(PropTypes.number).isRequired,
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
