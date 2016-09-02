import * as React from 'react'
import CollectionManager from './CollectionManager'
import Section from './Section'
import Skill from './Skill'

import { orderBy } from 'lodash'

const collectionSettings = {
  template: {
    key: 'new-skill',
    values: [1, 1],
  },
  orderBy: skill => [
    skill.category || '',
    skill.name || skill.key || '',
    skill.note || ''
  ].join('').toLowerCase(),
}

export default class SkillManager extends CollectionManager {
  constructor(props) {
    super(props)
    this.handleChange = super.handleChange.bind(this)
    this.handleEditEnd = super.handleEditEnd.bind(this)
  }

  render() {
    let i = 0, { sorted } = this.collection,
      skills = orderBy(
        sorted,
        skill => i++ % Math.ceil(sorted.length / 2)
      )

    return (
      <Section name={this.props.headline} header={this.props.headers}>
      {skills.map(skill =>
        <Skill key={skill.id} skill={skill}
          onChange={this.handleChange}
          onEditEnd={this.handleEditEnd}
        />
      )}
      </Section>
    )
  }
}

SkillManager.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    category: React.PropTypes.string,
    name: React.PropTypes.string,
    note: React.PropTypes.string,
    value: React.PropTypes.number.isRequired,
  })).isRequired,
}
SkillManager.defaultProps = {
  headline: 'Skills',
  headers: ['Name', 'Th', 'Ms', 'Name', 'Th', 'Ms'],
  settings: {
    template: {
      key: 'new-skill',
      values: [1, 1],
    },
    orderBy: skill => [
      skill.category || '',
      skill.name || skill.key || '',
      skill.note || ''
    ].join('').toLowerCase(),
  }
}
