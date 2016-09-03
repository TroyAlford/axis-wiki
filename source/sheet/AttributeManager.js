import * as React from 'react'
import Attribute from './Attribute'
import Collection from '../../utility/Collection'
import CollectionManager from './CollectionManager'
import Section from './Section'

import { filter, includes } from 'lodash'
import math from '../mathjs'

export default class AttributeManager extends CollectionManager {
  constructor(props) {
    super(props)
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
    this.calculate()
    this.forceUpdate()

    this.collection.onChange = this.update
    this.props.onChange(this.collection.sorted)
  }

  calculate() {
    let hash = {}
    const addToHash = item => hash[item.key] = item.value

    this.collection.forEach(addToHash)

    const calculate = expression => {
      const parser = math.parser()
      const parsed = math.parse(expression)
      parsed.traverse(node => {
        if (node.type === 'SymbolNode')
          parser.set(node.name, hash[node.name] || 0)
      })
      return parser.eval(expression)
    }

    computed.forEach(item => {
      this.collection.update(
        { key: item.key },
        { value: calculate(item.calc) }
      )
    })
  }
  require() {
    const currentKeys = this.collection.keys
    filter(keys, key => !includes(currentKeys, key))
      .forEach(key => this.collection.add({ key, value: 0 }))
  }
  whitelist() {
    this.collection.remove(item => !includes(keys, item.key))
  }

  renderItem(attribute) {
    return (
      <Attribute key={attribute.id} className={attribute.key}
        attribute={attribute}
        onChange={this.handleChange}
        onEditEnd={this.handleEditEnd}
      />
    )
  }

}

// List of keys for whitelisting.
const keys = [
  'body', 'mind', 'spirit',
  'potency', 'strength', 'intellect', 'confidence',
  'reflex', 'agility', 'acuity', 'intuition',
  'resilience', 'fitness', 'focus', 'devotion',
  'size', 'natural_armor', 'might', 'toughness',
  'armor'
]

const computed = [
  { key: 'body', calc: 'round((agility + fitness + strength) / 3, 0)' },
  { key: 'might', calc: 'round((strength + fitness) / 2, 0) + size' },
  { key: 'mind', calc: 'round((acuity + focus + intellect) / 3, 0)' },
  { key: 'potency', calc: 'round((confidence + intellect + strength) / 3, 0)' },
  { key: 'reflex', calc: 'round((acuity + agility + intuition) / 3, 0)' },
  { key: 'resilience', calc: 'round((devotion + fitness + focus) / 3, 0)' },
  { key: 'spirit', calc: 'round((confidence + devotion + intuition) / 3, 0)' },
  { key: 'toughness', calc: 'round((strength + fitness + size) / 3, 0) + natural_armor + armor' },
]

AttributeManager.propTypes = {
  ...CollectionManager.propTypes,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
  })).isRequired,
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
  })).isRequired,
}
AttributeManager.defaultProps = {
  ...CollectionManager.defaultProps,
  headline: 'Attributes',
  settings: {
    template: {
      key: 'new-attribute',
      value: 0,
    },
    orderBy: attribute => keys.indexOf(attribute.key)
  }
}
