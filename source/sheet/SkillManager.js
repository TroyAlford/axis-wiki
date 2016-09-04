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
  render() {
    let i = 0, items = this.collection.items,
      skills = orderBy(
        items, skill => i++ % Math.ceil(items.length / 2)
      )

    return (
      <Section name={this.props.headline} header={this.props.headers}>
      {skills.map(skill =>
        <Skill key={skill.id} skill={skill}
          onChange={super.handleChange.bind(this)}
          onEditEnd={super.handleEditEnd.bind(this)}
        />
      )}
      </Section>
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
    value: React.PropTypes.number.isRequired,
  })).isRequired,
}
SkillManager.defaultProps = {
  ...CollectionManager.defaultProps,
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
