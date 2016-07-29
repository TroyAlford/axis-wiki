import React         from 'react'
import ComponentBase from '../application/ComponentBase'
import Editable      from '../components/Editable'
import sum           from 'lodash/sum'

export default class Armor extends ComponentBase {
  setEquipped(equipped) {
    let { key, name, values } = this.props.armor
    this.props.onChange({ key, equipped, name, values })
  }
  handleValueChange(index, value) {
    let { equipped, key, name, values } = this.props.armor

    values[index] = value;
    this.props.onChange({ key, equipped, name, values })
  }

  render() {
    const { equipped, name, values } = this.props.armor,
      average = Math.round(sum(values) / values.length, 0)
    return (
      <div className="armor">
        <Editable className="equipped" value={!!equipped}
          onChange={this.setEquipped.bind(this, !equipped)}
        />
        <Editable className="name" value={name} />
      {values.map((value, index) =>
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
  armor: React.PropTypes.shape({
    equipped: React.PropTypes.bool.isRequired,
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    values: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
}
Armor.defaultProps = {
  armor: {
    equipped: false,
    key: 'generic-armor',
    name: 'Generic Armor',
    values: [0,0,0,0,0,0],
  },
  onChange: () => {},
}
