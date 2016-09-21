import * as React from 'react'
import ComponentBase from '../application/ComponentBase'
import Editable from '../components/Editable'
import Section from './Section'

export default class WoundTracker extends ComponentBase {
  handleChange(updated) {
    this.props.onChange({ ...this.props.wounds, ...updated })
  }

  render() {
    const { wounds: { light, deep }, readonly, resilience } = this.props
    const penalty = light + (deep * 2)

    const classes = ['WoundTracker']
    if (penalty >= resilience)
      classes.push('is-critical')
    else if (penalty >= Math.ceil(resilience / 2))
      classes.push('is-severe')
    else if (penalty > 0)
      classes.push('is-damaged')

    return (
      <Section className={classes.join(' ')}>
        <div className="row">
          <span>Light<br/>Wounds</span>
          <span>Deep<br/>Wounds</span>
          <span>Wound<br/>Penalty</span>
        </div>
        <div className="row">
          <Editable readonly={readonly} value={light} min={0}
            onChange={light => this.handleChange({ light })}
          />
          <Editable readonly={readonly} value={deep} min={0}
            onChange={deep => this.handleChange({ deep })}
          />
          <Editable readonly={true} value={penalty} />
        </div>
      </Section>
    )
  }
}

WoundTracker.propTypes = {
  resilience: React.PropTypes.number.isRequired,
  wounds: React.PropTypes.shape({
    light: React.PropTypes.number.isRequired,
    deep: React.PropTypes.number.isRequired,
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  readonly: React.PropTypes.bool.isRequired,
}
WoundTracker.defaultProps = {
  resilience: 0,
  wounds: {
    light: 0,
    deep: 0,
  },
  onChange: () => {},
  readonly: false,
}
