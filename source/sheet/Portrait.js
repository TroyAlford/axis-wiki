import * as React from 'react'
import PropTypes from 'prop-types'
import ComponentBase from '../application/ComponentBase'
import Editable from '../components/Editable'
import Section from './Section'

export default class Portrait extends ComponentBase {
  constructor(props) {
    super(props)
    this.state = { editing: false }
  }
  toggleEditing() {
    this.setState({ editing: !this.state.editing })
  }

  render() {
    return (
      <Section title="Portrait">
        <div className="portrait frame" onClick={this.toggleEditing}>
      {this.state.editing
        ? <Editable editing={true} value={this.props.url}
            onEditEnd={value => {
              this.props.onChange(value)
              this.setState({ editing: false })
            }}
          />
        : <div className="portrait display" style={{
            backgroundImage: `url(${this.props.url})`
          }}></div>
      }
        </div>
      </Section>
    )
  }
}

Portrait.propTypes = {
  url: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
Portrait.defaultProps = {
  url: '',
  onChange: () => {},
}
