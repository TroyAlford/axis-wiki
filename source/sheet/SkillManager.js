import React from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'lodash'
import CollectionManager from './CollectionManager'
import Skill from './Skill'

export default class SkillManager extends CollectionManager {
  renderItem(skill) {
    return (
      <Skill key={skill.id} skill={skill}
        forceNameEditing={!skill.key}
        readonly={this.props.readonly}
        onChange={super.handleChange.bind(this)}
        onEditEnd={super.handleEditEnd.bind(this)}
      />
    )
  }
}

SkillManager.propTypes = {
  ...CollectionManager.propTypes,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    category: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
}
SkillManager.defaultProps = {
  ...CollectionManager.defaultProps,
  title: 'Skills',
  headers: ['Name', 'Th', 'Ms', '', 'Name', 'Th', 'Ms'],
  settings: {
    template: {
      key: '',
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
