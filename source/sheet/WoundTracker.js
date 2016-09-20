import * as React from 'react'
import ComponentBase from '../application/ComponentBase'
import Editable from '../components/Editable'
import Section from './Section'

export default class WoundTracker extends ComponentBase {
  constructor(props) {
    super(props)
    const { light_wounds, deep_wounds } = props
    this.state = { light_wounds, deep_wounds }
  }
  componentWillReceiveProps(nextProps) {
    const { light_wounds, deep_wounds } = nextProps
    this.setState({ light_wounds, deep_wounds })
  }

  handleChange(updated) {
    const { light_wounds, deep_wounds } = this.state
    this.props.onChange({
      light_wounds, deep_wounds,
      ...updated
    })
  }

  penalty() {
    return this.state.light_wounds + (this.state.deep_wounds * 2)
  }

  render() {
    const { light_wounds, deep_wounds } = this.state
    const { readonly } = this.props
    const penalty = this.penalty()

    return (
      <Section className="WoundTracker">
        <div className="row">
          <span>Light</span>
          <span>Deep</span>
          <span>Penalty</span>
        </div>
        <div className="row">
          <Editable readonly={readonly} value={light_wounds}
            onChange={light_wounds => this.handleChange({ light_wounds })}
          />
          <Editable readonly={readonly} value={deep_wounds}
            onChange={deep_wounds => this.handleChange({ deep_wounds })}
          />
          <Editable readonly={true} value={penalty} />
        </div>
      </Section>
    )
  }
}

WoundTracker.propTypes = {
  light_wounds: React.PropTypes.number.isRequired,
  deep_wounds: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  readonly: React.PropTypes.bool.isRequired,
}
WoundTracker.defaultProps = {
  light_wounds: 0,
  deep_wounds: 0,
  onChange: () => {},
  readonly: false,
}
