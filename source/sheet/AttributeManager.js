import * as React from 'react'
import Attribute from './Attribute'
import Collection from '../../utility/Collection'
import CollectionManager from './CollectionManager'
import Section from './Section'

import { cloneDeep, filter, includes, isEqual, orderBy } from 'lodash'
import math from '../mathjs'

export default class AttributeManager extends CollectionManager {
  update() {
    this.collection.onChange = null

    this.require()
    this.whitelist()
    this.calculate()

    this.collection.onChange = this.handleCollectionChange.bind(this)
  }

  calculate() {
    let hash = {}
    const addToHash = item => hash[item.key] = item.value

    this.collection.forEach(addToHash)

    const calc = expression => {
      const parser = math.parser()
      const parsed = math.parse(expression)
      parsed.traverse(node => {
        if (node.type === 'SymbolNode')
          parser.set(node.name, hash[node.name] || 0)
      })
      parser.set('armor', this.props.armor)

      return parser.eval(expression)
    }

    computed.forEach(item => {
      this.collection.update({ key: item.key },
        { value: calc(item.calc), calculated: true }
      )
    })
  }
  require() {
    const currentKeys = this.collection.keys
    const missingKeys = filter(keys, key => !includes(currentKeys, key))
    const missingItems = missingKeys.map(key => ({ key, value: 0 }))
    this.collection.addAll(missingItems)
  }
  whitelist() {
    this.collection.remove(item => !includes(keys, item.key))
  }

  renderItem(attribute) {
    return (
      <Attribute key={attribute.id} className={attribute.key}
        readonly={this.props.readonly || attribute.calculated}
        attribute={attribute}
        onChange={super.handleChange.bind(this)}
        onEditEnd={super.handleEditEnd.bind(this)}
      />
    )
  }

  render() {
    this.update()
    return super.render()
  }

}

// List of keys for whitelisting.
export const keys = [
  'body', 'mind', 'spirit',
  'potency', 'strength', 'intellect', 'confidence',
  'reflex', 'agility', 'acuity', 'intuition',
  'resilience', 'fitness', 'focus', 'devotion',
  'size', 'natural_armor', 'might', 'toughness',
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
  armor: React.PropTypes.number.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
  })).isRequired,
}
AttributeManager.defaultProps = {
  ...CollectionManager.defaultProps,
  allowAdd: false,
  armor: 0,
  title: 'Attributes',
  settings: {
    template: {
      key: 'new-attribute',
      value: 0,
    },
    orderBy: list => orderBy(list, item => keys.indexOf(item.key))
  }
}
