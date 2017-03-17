import * as React from 'react'

import { startCase, toLower } from 'lodash'
import { slugify } from '../../utility/Slugs'

import ComponentBase from '../application/ComponentBase'
import Editable from '../components/Editable'

const nameParserRegEx = new RegExp(/^(?:([a-z0-9 ]*):)?([a-z0-9 ]*)(?:\(([^(]*)\))?/mi)

export default class Trait extends ComponentBase {
  static parseName(unparsed) {
    if (typeof unparsed !== 'string' || !nameParserRegEx.test(unparsed)) {
      return { category: '', name: '', note: '' }
    }

    const [category, name, note] = nameParserRegEx.exec(unparsed).splice(1)
      .map(item => (item || '').replace(/\s{2,}/g, ' ').trim())

    return { category, name, note }
  }

  displayName(props = this.props) {
    const { trait: { category, key, name, note } } = props
    let display = startCase(toLower(name || key))
    if (category) display = `${category}: ${display}`
    if (note) display = `${display} (${note})`
    return display
  }

  render() {
    const {
      className,
      trait: { value },
    } = this.props

    const nameProps = this.props.forceNameEditing ? { editing: true } : {}

    return (
      <div className={`trait ${className}`}>
        <Editable className="name" value={this.displayName()}
          placeholder="Category: Name (Notes)"
          readonly={this.props.readonly}
          onEditEnd={(name) => {
            const parsed = Trait.parseName(name)
            const updated = {
              ...this.props.trait,
              ...parsed, key: slugify(parsed.name),
            }

            this.props.onChange(updated, this.props.trait)
            this.props.onEditEnd(updated, this.props.trait)
          }}
          {...nameProps}
        />
        <Editable className="value" value={value}
          readonly={this.props.readonly}
          onChange={value => {
            if (value === this.props.trait.value) return;

            this.props.onChange({
              ...this.props.trait,
              value,
            }, this.props.trait)
          }}
          onEditEnd={() => this.props.onEditEnd(this.props.trait)}
        />
      </div>
    )
  }
}

Trait.propTypes = {
  className: React.PropTypes.string,
  forceNameEditing: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired,
  trait: React.PropTypes.shape({
    category: React.PropTypes.string,
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    note: React.PropTypes.string,
    value: React.PropTypes.number.isRequired,
  })
}
Trait.defaultProps = {
  className: '',
  forceNameEditing: false,
  onChange: () => {},
  trait: {
    key: 'new-trait',
    value: 0,
  },
}
