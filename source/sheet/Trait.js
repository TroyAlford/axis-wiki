import React    from 'react'
import Editable from '../components/Editable'

export default class Trait extends React.Component {
  render() {
    const { category, name, note, slug, value } = this.props

    let display = name ? name : _.startCase(_.toLower(slug));
    if (category)
      display = `${category}: ${display}`
    if (note)
      display = `${display} (${note})`

    return (
      <div className="trait">
        <Editable className="name" value={display} />
        <Editable className="value" value={value} />
      </div>
    )
  }
}

Trait.propTypes = {
  name: React.PropTypes.string,
  slug: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
}
Trait.defaultProps = {
  slug: 'new-trait',
  value: 0,
}
