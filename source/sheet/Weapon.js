import * as React from 'react'
import PropTypes from 'prop-types'

import { startCase, toLower } from 'lodash'
import { slugify } from '../../utility/Slugs'

import Editable from '../components/Editable'

export default class Weapon extends React.Component {
  render() {
    /* eslint-disable no-shadow */
    const { equipped, key, name, values } = this.props.weapon
    const display = name || startCase(toLower(key))

    const nameProps = this.props.forceNameEditing ? { editing: true } : {}

    return (
      <div className="weapon">
        <Editable className="equipped" value={!!equipped}
          readonly={this.props.readonly}
          onChange={(equipped) => {
            if (equipped === this.props.weapon.equipped) return;
            const updated = { ...this.props.weapon, equipped }
            this.props.onChange(updated, this.props.weapon)
          }}
        />
        <Editable className="name" value={display}
          placeholder="Weapon Type/Name"
          readonly={this.props.readonly}
          onEditEnd={(name) => {
            if (name === this.props.weapon.name) return
            const updated = {
              ...this.props.weapon,
              name,
              key: slugify(name),
            }

            this.props.onChange(updated, this.props.weapon)
            this.props.onEditEnd(updated, this.props.weapon)
          }}
          {...nameProps}
        />
      {values.map((value, index) =>
        <Editable key={index} className="value" value={value}
          readonly={this.props.readonly}
          onChange={value => {
            if (value === this.props.weapon.values[index]) return;
            const values = [...this.props.weapon.values]
            values[index] = value

            const updated = { ...this.props.weapon, values }
            this.props.onChange(updated, this.props.weapon)
          }}
        />
      )}
      </div>
    )
  }
}

Weapon.propTypes = {
  forceNameEditing: PropTypes.bool,

  readonly: PropTypes.bool,

  weapon: PropTypes.shape({
    key:      PropTypes.string.isRequired,
    equipped: PropTypes.bool.isRequired,
    name:     PropTypes.string,
    values:   PropTypes.arrayOf(PropTypes.number).isRequired,
  }),

  onChange: PropTypes.func.isRequired,
}
Weapon.defaultProps = {
  forceNameEditing: false,

  readonly: false,

  weapon: {
    key:      'new-weapon',
    equipped: false,
    values:   [0, 0, 0],
  },

  onChange: () => {},
}
