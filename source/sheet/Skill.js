import _        from 'lodash'
import React    from 'react'
import Editable from '../components/Editable'

const nameParserRegEx = new RegExp(/^(?:([a-z0-9 ]*):)?([a-z0-9 ]*)(?:\(([a-z0-9 ]*)\))?/mi)

export default class Skill extends React.Component {
  static parseName(name) {
    if (typeof name !== 'string' || !nameParserRegEx.test(name))
      return name

    let split = nameParserRegEx.exec(name).splice(1)
    return split.map(item => (item || '').replace(/\s{2,}/g, ' ').trim())
  }

  render() {
    const {
      className,
      skill: { category, key, name, note, values }
    } = this.props

    let display = name ? name : _.startCase(_.toLower(key));
    if (category)
      display = `${category}: ${display}`
    if (note)
      display = `${display} (${note})`

    return (
      <div className={`skill ${className}`}>
        <Editable className="name" value={display} />
      {values.map((value, index) =>
        <Editable key={index} className="value" value={value} />
      )}
      </div>
    )
  }
}

Skill.propTypes = {
  className: React.PropTypes.string,
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
  skill: {
    key: 'new-skill',
    category: undefined,
    name: 'New Skill',
    note: undefined,
    values: [0, 0],
  },
}
