import * as React from 'react'
import CollectionManager from './CollectionManager'
import Icon from '../components/Icon'
import Section from './Section'
import Skill from './Skill'
import { orderBy } from 'lodash'

export default class SkillManager extends CollectionManager {
  renderItem(skill) {
    return (
      <Skill key={skill.id} skill={skill}
        readonly={this.props.readonly}
        onChange={super.handleChange.bind(this)}
        onEditEnd={super.handleEditEnd.bind(this)}
      />
    )
  }
}

SkillManager.propTypes = {
  ...CollectionManager.propTypes,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    category: React.PropTypes.string,
    name: React.PropTypes.string,
    note: React.PropTypes.string,
    values: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  })).isRequired,
}
SkillManager.defaultProps = {
  ...CollectionManager.defaultProps,
  title: 'Skills',
  headers: ['Name', 'Th', 'Ms', '', 'Name', 'Th', 'Ms'],
  settings: {
    template: {
      key: 'new-skill',
      values: [0, 1],
    },
    orderBy: list => {
      let i = 0
      const sortedByName = orderBy(list, skill => [
        skill.category || '',
        skill.name || skill.key || '',
        skill.note || ''
      ].join('').toLowerCase())

      return orderBy(sortedByName,
        skill => i++ % Math.ceil(list.length / 2)
      )
    },
  }
}
