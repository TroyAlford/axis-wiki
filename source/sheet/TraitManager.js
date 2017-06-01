import React from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'lodash'
import CollectionManager from './CollectionManager'
import Trait from './Trait'

export default class TraitManager extends CollectionManager {
  constructor(props) {
    super(props)
    this.handleChange = super.handleChange.bind(this)
    this.handleEditEnd = super.handleEditEnd.bind(this)
  }
  renderItem(trait) {
    return (
      <Trait key={trait.id} trait={trait}
        forceNameEditing={!trait.key}
        readonly={this.props.readonly}
        onChange={this.handleChange}
        onEditEnd={this.handleEditEnd}
      />
    )
  }
}

TraitManager.propTypes = {
  ...CollectionManager.propTypes,
  items: PropTypes.arrayOf(PropTypes.shape({
    key:      PropTypes.string.isRequired,
    category: PropTypes.string,
    name:     PropTypes.string,
    note:     PropTypes.string,
    value:    PropTypes.number.isRequired,
  })).isRequired,
}
TraitManager.defaultProps = {
  ...CollectionManager.defaultProps,
  title:    'Traits',
  headers:  ['Name', 'Cost'],
  settings: {
    template: {
      key:   '',
      value: 0,
    },
    orderBy: list => orderBy(list, trait => [
      trait.category || '',
      trait.name || trait.key || '',
      trait.note || '',
    ].join('').toLowerCase()),
  },
}
