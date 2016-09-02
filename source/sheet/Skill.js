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

  handleEditEnd() {
    this.props.onEditEnd(this.props.skill)
  }

  handleNameChange(displayName) {
    const parsed = Skill.parseName(displayName)
    this.props.onChange({
      ...this.props.skill,
      ...parsed,
      key: Slug(parsed.name)
    }, this.props.skill)
  }

  handleValueChange(index, value) {
    let values = this.props.skill.values
    values[index] = value

    this.props.onChange({
      ...this.props.skill,
      values
    }, this.props.skill)
  }

  render() {
    const {
      className,
      skill: { values }
    } = this.props

    return (
      <div className={`skill ${className}`}>
        <Editable className="name" value={this.displayName()}
          onChange={this.handleNameChange}
          onEditEnd={this.handleEditEnd}
        />
      {values.map((value, index) =>
        <Editable key={index} className="value"
          value={value} min={1} max={10}
          onChange={this.handleValueChange.bind(this, index)}
          onEditEnd={this.handleEditEnd}
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
