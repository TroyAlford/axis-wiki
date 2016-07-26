import React    from 'react'
import Editable from '../components/Editable'
import sum      from 'lodash/sum'

export default class Weapon extends React.Component {
  handleValueChange(index, event) {
    console.log(event)
  }

  render() {
    const { name, values } = this.props
    return (
      <div className="weapon">
        <Editable className="equipped" readonly value={this.props.equipped} />
        <Editable className="name" value={name} />
      {values.map((value, index) =>
        <Editable key={index} className="value" value={value}
          onChange={this.handleValueChange.bind(this, index)}
        />
      )}
      </div>
    )
  }
}

Weapon.propTypes = {
  equipped: React.PropTypes.bool.isRequired,
  name: React.PropTypes.string.isRequired,
  values: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.number),
    React.PropTypes.number,
  ]).isRequired,
}
Weapon.defaultProps = {
  equipped: false,
  name: 'Generic Weapon',
  values: [0,0,0],
}
