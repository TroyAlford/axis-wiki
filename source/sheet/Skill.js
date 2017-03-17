import React from 'react'

import { startCase, toLower } from 'lodash'
import { slugify } from '../../utility/Slugs'

import ComponentBase from '../application/ComponentBase'
import Editable from '../components/Editable'

const nameParserRegEx = new RegExp(/^(?:([a-z0-9 ]*):)?([a-z0-9 ]*)(?:\(([^(]*)\))?/mi)

export default class Skill extends ComponentBase {
  static parseName(unparsed) {
    if (typeof unparsed !== 'string' || !nameParserRegEx.test(unparsed)) {
      return { category: '', name: '', note: '' }
    }

    const [category, name, note] = nameParserRegEx.exec(unparsed).splice(1)
      .map(item => (item || '').replace(/\s{2,}/g, ' ').trim())

    return { category, name, note }
  }

  displayName(props = this.props) {
    const { skill: { category, key, name, note } } = props
    let display = startCase(toLower(name || key))
    if (category) display = `${category}: ${display}`
    if (note) display = `${display} (${note})`
    return display
  }

  render() {
    /* eslint-disable no-shadow */
    const {
      className,
      skill: { values },
    } = this.props

    const nameProps = this.props.forceNameEditing ? { editing: true } : {}

    return (
      <div className={`skill ${className}`}>
        <Editable className="name" value={this.displayName()}
          placeholder="Category: Name (Notes)"
          readonly={this.props.readonly}
          onEditEnd={(name) => {
            const parsed = Skill.parseName(name)
            const updated = {
              ...this.props.skill,
              ...parsed,
              key: slugify(parsed.name),
            }

            this.props.onChange(updated, this.props.skill)
            this.props.onEditEnd(updated, this.props.skill)
          }}
          {...nameProps}
        />
        {values.map((value, index) =>
          <Editable key={index} className={`value equals-${value}`}
            value={value} min={0} max={10}
            readonly={this.props.readonly}
            onChange={(value) => {
              const values = [...this.props.skill.values]
              if (value === values[index]) return

              values[index] = value
              this.props.onChange({
                ...this.props.skill,
                values,
              }, this.props.skill)
            }}
            onEditEnd={() => this.props.onEditEnd(this.props.skill)}
          />
        )}
      </div>
    )
  }
}

Skill.propTypes = {
  className: React.PropTypes.string,

  skill: React.PropTypes.shape({
    category: React.PropTypes.string,
    key:      React.PropTypes.string.isRequired,
    name:     React.PropTypes.string,
    note:     React.PropTypes.string,
    values:   React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  }),

  forceNameEditing: React.PropTypes.bool.isRequired,

  onChange:  React.PropTypes.func.isRequired,
  onEditEnd: React.PropTypes.func.isRequired,
}
Skill.defaultProps = {
  className: '',

  skill: {
    key:    'new-skill',
    values: [0, 1],
  },

  forceNameEditing: false,

  onChange:  () => {},
  onEditEnd: () => {},
}
