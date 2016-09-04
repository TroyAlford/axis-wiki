import * as React from 'react'
import CollectionManager from './CollectionManager'
import Trait from './Trait'
import { orderBy } from 'lodash'

export default class TraitManager extends CollectionManager {
  renderItem(trait) {
    return (
      <Trait key={trait.id} trait={trait}
        onChange={super.handleChange.bind(this)}
        onEditEnd={super.handleEditEnd.bind(this)}
      />
    )
  }
}

TraitManager.propTypes = {
  ...CollectionManager.propTypes,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    category: React.PropTypes.string,
    name: React.PropTypes.string,
    note: React.PropTypes.string,
    value: React.PropTypes.number.isRequired,
  })).isRequired,
}
TraitManager.defaultProps = {
  ...CollectionManager.defaultProps,
  title: 'Traits',
  headers: ['Name', 'Cost'],
  settings: {
    template: {
      key: 'new-trait',
      value: 0,
    },
    orderBy: list => orderBy(list, trait => [
      trait.category || '',
      trait.name || trait.key || '',
      trait.note || ''
    ].join('').toLowerCase()),
  }
}
