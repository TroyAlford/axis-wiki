import React    from 'react'
import Editable from '../components/Editable'

const nameParserRegEx = new RegExp(/^(?:([a-z0-9 ]*):)?([a-z0-9 ]*)(?:\(([a-z0-9 ]*)\))?/mi)

export default class Skill extends React.Component {
  static parseName(name) {
    if (typeof name !== 'string' || !Attribute.splitter.test(name))
      return name

    let split = nameParserRegEx.exec(name).splice(1)
    return split.map(item => (item || '').replace(/\s{2,}/g, ' ').trim())
  }

  render() {
    const { category, name, note, slug, value } = this.props

    let display = name ? name : _.startCase(_.toLower(slug));
    if (category)
      display = `${category}: ${display}`
    if (note)
      display = `${display} (${note})`

    return (
      <div className="skill">
        <Editable className="name" value={display} />
      {this.props.values.map((value, index) =>
        <Editable key={index} className="value" value={value} />
      )}
      </div>
    )
  }
}

Skill.propTypes = {
  name: React.PropTypes.string,
  slug: React.PropTypes.string.isRequired,
  value: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
}
Skill.defaultProps = {
  slug: 'new-skill',
  value: [0,0],
}
