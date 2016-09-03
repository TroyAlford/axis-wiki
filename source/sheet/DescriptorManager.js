import * as React from 'react'
import CollectionManager from './CollectionManager'
import Descriptor from './Descriptor'
import { includes } from 'lodash'

export default class DescriptorManager extends CollectionManager {
  constructor(props) {
    super(props)
    super.setState = this.setState.bind(this)

    this.handleChange = super.handleChange.bind(this)
    this.handleEditEnd = super.handleEditEnd.bind(this)
    this.whitelist()
  }
  componentWillReceiveProps(newProps) {
    super.componentWillReceiveProps(newProps)
    this.whitelist()
  }

  whitelist() {
    this.collection.remove(item => !includes(keys, item.key))
  }

  renderItem(descriptor) {
    return (
      <Descriptor key={descriptor.id} descriptor={descriptor}
        onChange={this.handleChange}
        onEditEnd={this.handleEditEnd}
      />
    )
  }
}

// Sorted list of keys, used in whitelisting and also
// as a sort-order for display purposes.
const keys = [
  'player',   'height', 'eyes',
  'homeland', 'weight', 'hair',
  'race',     'gender', 'age',
]

DescriptorManager.propTypes = {
  ...CollectionManager.propTypes,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
  })).isRequired,
}
DescriptorManager.defaultProps = {
  ...CollectionManager.defaultProps,
  headline: 'Descriptors',
  settings: {
    template: {
      key: 'new-descriptor',
      value: '',
    },
    orderBy: descriptor => keys.indexOf(descriptor.key)
  }
}
