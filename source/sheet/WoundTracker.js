import React from 'react'
import PropTypes from 'prop-types'
import ComponentBase from '../application/ComponentBase'
import Editable from '../components/Editable'
import Section from './Section'

export default class WoundTracker extends ComponentBase {
  handleDeep(deep) {
    this.handleChange({ deep })
  }
  handleLight(light) {
    this.handleChange({ light })
  }
  handleChange(updated) {
    this.props.onChange({ ...this.props.wounds, ...updated })
  }

  render() {
    const { wounds: { light, deep }, readonly, resilience } = this.props
    const penalty = light + (deep * 2)

    const classes = ['WoundTracker']
    if (penalty >= resilience) {
      classes.push('is-critical')
    } else if (penalty >= Math.ceil(resilience / 2)) {
      classes.push('is-severe')
    } else if (penalty > 0) {
      classes.push('is-damaged')
    }

    return (
      <Section className={classes.join(' ')}>
        <div className="row">
          <span>Light<br />Wounds</span>
          <span>Deep<br />Wounds</span>
          <span>Wound<br />Penalty</span>
        </div>
        <div className="row">
          <Editable readonly={readonly} value={light} min={0}
            onChange={this.handleLight}
          />
          <Editable readonly={readonly} value={deep} min={0}
            onChange={this.handleDeep}
          />
          <Editable readonly value={penalty} />
        </div>
      </Section>
    )
  }
}

WoundTracker.propTypes = {
  resilience: PropTypes.number.isRequired,

  onChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool.isRequired,

  wounds: PropTypes.shape({
    light: PropTypes.number.isRequired,
    deep:  PropTypes.number.isRequired,
  }).isRequired,
}
WoundTracker.defaultProps = {
  resilience: 0,

  onChange: () => {},
  readonly: false,

  wounds: {
    light: 0,
    deep:  0,
  },
}
