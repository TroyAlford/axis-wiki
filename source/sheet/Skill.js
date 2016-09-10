 import * as React from 'react'

import {
  startCase,
  toLower
} from 'lodash'
import Slug from '../../utility/Slugs'

import ComponentBase from '../application/ComponentBase'
import Editable from '../components/Editable'

const nameParserRegEx = new RegExp(/^(?:([a-z0-9 ]*):)?([a-z0-9 ]*)(?:\(([a-z0-9 ]*)\))?/mi)

export default class Skill extends ComponentBase {
  static parseName(name) {
    if (typeof name !== 'string' || !nameParserRegEx.test(name))
      return { category: '', name: '', note: '' }

    let split = nameParserRegEx.exec(name).splice(1)
      .map(item => (item || '').replace(/\s{2,}/g, ' ').trim())

    return {
      category: split[0],
      name: split[1],
      note: split[2],
    }
  }

  displayName(props = this.props) {
    const { skill: { category, key, name, note } } = props
    let display = startCase(toLower(name || key))
    if (category) display = `${category}: ${display}`
    if (note) display = `${display} (${note})`
    return display
  }

  render() {
    const {
      className,
      skill: { values }
    } = this.props

    return (
      <div className={`skill ${className}`}>
        <Editable className="name" value={this.displayName()}
          readonly={this.props.readonly}
          onEditEnd={name => {
            const parsed = Skill.parseName(name)
            const updated = {
              ...this.props.skill,
              ...parsed, key: Slug(parsed.name),
            }

            this.props.onChange(updated, this.props.skill)
            this.props.onEditEnd(updated, this.props.skill)
          }}
        />
      {values.map((value, index) =>
        <Editable key={index} className="value"
          value={value} min={1} max={10}
          readonly={this.props.readonly}
          onChange={value => {
            const values = [...this.props.skill.values]
            if (value === values[index]) return;

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
  onChange: React.PropTypes.func.isRequired,
  onEditEnd: React.PropTypes.func.isRequired,
  skill: React.PropTypes.shape({
    category: React.PropTypes.string,
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    note: React.PropTypes.string,
    values: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  })
}
Skill.defaultProps = {
  className: '',
  onChange: () => {},
  onEditEnd: () => {},
  skill: {
    key: 'new-skill',
    values: [1, 1],
  },
}
