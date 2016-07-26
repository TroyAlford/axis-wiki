import React    from 'react'
import Editable from '../components/Editable'
import sum      from 'lodash/sum'

export default class Armor extends React.Component {
  handleValueChange(index, event) {
    console.log(event)
  }

  render() {
    const { name, values } = this.props
    let simple = typeof this.props.values === 'number'
    let average = simple ? values : Math.round(sum(values) / values.length, 0)
    return (
      <div className="armor">
        <Editable className="equipped" readonly value={this.props.equipped} />
        <Editable className="name" value={name} />
      {simple ? null : values.map((value, index) =>
        <Editable key={index} className="value" value={value}
          onChange={this.handleValueChange.bind(this, index)}
        />
      )}
        <span className="average">{average}</span>
      </div>
    )
  }
}

Armor.propTypes = {
  equipped: React.PropTypes.bool.isRequired,
  name: React.PropTypes.string.isRequired,
  values: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.number),
    React.PropTypes.number,
  ]).isRequired,
}
Armor.defaultProps = {
  equipped: false,
  name: 'Generic Armor',
  values: [0,0,0,0,0,0],
}
