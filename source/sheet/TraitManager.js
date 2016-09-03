import * as React from 'react'
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
        onChange={this.handleChange}
        onEditEnd={this.handleEditEnd}
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
  headline: 'Traits',
  headers: ['Name', 'Cost'],
  settings: {
    template: {
      key: 'new-trait',
      value: 0,
    },
    orderBy: trait => [
      trait.category || '',
      trait.name || trait.key || '',
      trait.note || ''
    ].join('').toLowerCase(),
  }
}
