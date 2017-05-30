import * as React from 'react'
import PropTypes from 'prop-types'

import { startCase, sum, toLower } from 'lodash'
import { slugify } from '../../utility/Slugs'

import Editable from '../components/Editable'

export default class Armor extends React.Component {
  render() {
    const { equipped, key, name, values } = this.props.armor,
      average = Math.round(sum(values) / values.length, 0),
      display = name ? name : startCase(toLower(key))

    const nameProps = this.props.forceNameEditing ? { editing: true } : {}

    return (
      <div className="armor">
        <Editable className="equipped" value={!!equipped}
          readonly={this.props.readonly}
          onChange={(equipped) => {
            if (equipped === this.props.armor.equipped) return;
            const updated = { ...this.props.armor, equipped }
            this.props.onChange(updated, this.props.armor)
          }}
        />
        <Editable className="name" value={display}
          placeholder="Armor Type/Name"
          readonly={this.props.readonly}
          onEditEnd={name => {
            if (name === this.props.armor.name) return
            const updated = {
              ...this.props.armor,
              key: slugify(name),
              name,
            }
            this.props.onChange(updated, this.props.armor)
            this.props.onEditEnd(updated, this.props.armor)
          }}
          {...nameProps}
        />
      {values.map((value, index) =>
        <Editable key={index} className="value" value={value}
          readonly={this.props.readonly}
          onChange={value => {
            if (value === this.props.armor.values[index]) return;
            const values = [...this.props.armor.values]
            values[index] = value

            const updated = { ...this.props.armor, values }
            this.props.onChange(updated, this.props.armor)
          }}
        />
      )}
        <div className="average value">
          <span>{average}</span>
        </div>
      </div>
    )
  }
}

Armor.propTypes = {
  armor: PropTypes.shape({
    equipped: PropTypes.bool.isRequired,
    key:      PropTypes.string.isRequired,
    name:     PropTypes.string,
    values:   PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  forceNameEditing: PropTypes.bool,

  onChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool,
}
Armor.defaultProps = {
  armor: {
    equipped: false,
    key:      'generic-armor',
    values:   [0, 0, 0, 0, 0, 0],
  },
  forceNameEditing: false,

  onChange: () => {},
  readonly: false,
}
