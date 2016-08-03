import _             from 'lodash'
import React         from 'react'
import ComponentBase from '../application/ComponentBase'
import Editable      from '../components/Editable'

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
    let display = _.startCase(_.toLower(name || key))
    if (category) display = `${category}: ${display}`
    if (note) display = `${display} (${note})`
    return display
  }

  handleNameChange(displayName) {
    this.props.onChange({
      ...this.props.skill,
      ...Skill.parseName(displayName),
    })
  }

  handleValueChange(index, value) {
    let values = this.props.skill.values
    values[index] = value

    this.props.onChange({
      ...this.props.skill,
      values
    })
  }

  render() {
    const {
      className,
      skill: { values }
    } = this.props

    return (
      <div className={`skill ${className}`}>
        <Editable className="name" onChange={this.handleNameChange}
          value={this.displayName()}
        />
      {values.map((value, index) =>
        <Editable key={index} className="value"
          value={value} min={1} max={10}
          onChange={this.handleValueChange.bind(this, index)}
        />
      )}
      </div>
    )
  }
}

Skill.propTypes = {
  className: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
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
  skill: {
    key: 'new-skill',
    values: [1, 1],
  },
}
