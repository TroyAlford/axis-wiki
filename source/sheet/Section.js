import * as React from 'react'

export default class Section extends React.Component {
  render() {
    const headers = this.props.header.map((item, index) =>
      <div key={index} className="section-heading">{item}</div>
    )
    return (
      <div className={`${this.props.name} section ${this.props.className}`}>
        {this.props.name && <div className="name">{this.props.name}</div>}
        {headers.length !== 0 && <div className="section-header">{headers}</div>}
        {this.props.children}
      </div>
    )
  }
}

Section.propTypes = {
  className: React.PropTypes.string,
  header: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
}
Section.defaultProps = {
  className: '',
  header: [],
  name: '',
  onChange: () => {},
}
