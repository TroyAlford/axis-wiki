import * as React from 'react'
import CollectionManager from './CollectionManager'
import Descriptor from './Descriptor'
import { filter, includes } from 'lodash'

export default class DescriptorManager extends CollectionManager {
  constructor(props) {
    super(props)
    super.setState = this.setState.bind(this)

    this.handleChange = super.handleChange.bind(this)
    this.handleEditEnd = super.handleEditEnd.bind(this)
    this.update()
  }
  componentWillReceiveProps(newProps) {
    super.componentWillReceiveProps(newProps)
    this.update()
  }

  update() {
    this.collection.onChange = null

    this.require()
    this.whitelist()
    this.forceUpdate()

    this.collection.onChange = this.update
    this.props.onChange(this.collection.sorted)
  }

  require() {
    const currentKeys = this.collection.keys
    filter(keys, key => !includes(currentKeys, key))
      .forEach(key => this.collection.add({ key, value: '' }))
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
  headline: 'Descriptors',
  settings: {
    template: {
      key: 'new-descriptor',
      value: '',
    },
    orderBy: descriptor => keys.indexOf(descriptor.key)
  }
}
