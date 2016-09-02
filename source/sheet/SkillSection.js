import * as React from 'react'
import Collection from '../../utility/Collection'
import ComponentBase from '../application/ComponentBase'
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

export default class SkillSection extends ComponentBase {
  constructor(props) {
    super(props)
    this.collection = new Collection(props.skills, collectionSettings)
    this.collection.onChange = this.handleCollectionChange
  }
  componentWillReceiveProps(newProps) {
    this.collection = new Collection(newProps.skills, collectionSettings)
  }

  handleCollectionChange() {
    this.forceUpdate()
    this.props.onChange()
  }

  handleChange(updated, previous) {
    this.collection.update(previous.id, {
      ...updated,
      id: previous.id
    })
    this.forceUpdate()
  }
  handleEditEnd(skill) {
    if (skill.key === '') {
      this.collection.remove({ id: skill.id })
      this.forceUpdate()
    }
  }

  render() {
    let i = 0, { sorted } = this.collection,
      skills = orderBy(
        sorted,
        skill => i++ % Math.ceil(sorted.length / 2)
      )

    return (
      <Section name="Skills" header={['Name', 'Th', 'Ms', 'Name', 'Th', 'Ms']}>
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

SkillSection.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  skills: React.PropTypes.array.isRequired,
}
SkillSection.defaultProps = {
  onChange: () => {},
  skills: [],
}
