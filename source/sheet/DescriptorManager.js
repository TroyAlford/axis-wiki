import * as React from 'react'
import Collection from '../../utility/Collection'
import CollectionManager from './CollectionManager'
import Descriptor from './Descriptor'
import { filter, includes, isEqual, orderBy } from 'lodash'

export default class DescriptorManager extends CollectionManager {
  constructor(props) {
    super(props)
    this.update()
  }
  componentWillReceiveProps(newProps) {
    this.collection = new Collection(newProps.items, this.settings)
    this.collection.onChange = this.update

    this.update()
  }

  update() {
    const before = [...this.collection.items]
    this.collection.onChange = null

    this.require()
    this.whitelist()

    this.collection.onChange = this.update
  }

  require() {
    const currentKeys = this.collection.keys
    const missingKeys = filter(keys, key => !includes(currentKeys, key))
    const missingItems = missingKeys.map(key => ({ key, value: '' }))
    this.collection.addAll(missingItems)
  }
  whitelist() {
    this.collection.remove(item => !includes(keys, item.key))
  }

  renderItem(descriptor) {
    return (
      <Descriptor key={descriptor.id} descriptor={descriptor}
        onChange={super.handleChange.bind(this)}
        onEditEnd={super.handleEditEnd.bind(this)}
      />
    )
  }
}

// Sorted list of keys, used in whitelisting and also
// as a sort-order for display purposes.
export const keys = [
  'homeland', 'height', 'eyes',
  'race',     'weight', 'hair',
  'concept',  'gender', 'age',
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
  allowAdd: false,
  title: 'Descriptors',
  settings: {
    template: {
      key: 'new-descriptor',
      value: '',
    },
    orderBy: list => orderBy(list, item => keys.indexOf(item.key))
  }
}
