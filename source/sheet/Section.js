import * as React from 'react'

export default class Section extends React.Component {
  render() {
    const headers = this.props.headers.map((item, index) =>
      <div key={index} className="section-heading">{item}</div>
    )
    const classes = ['section', this.props.className]
    if (typeof this.props.title === 'string')
      classes.push(this.props.title)

    return (
      <div className={classes.join(' ')}>
        {this.props.title && <div className="title">{this.props.title}</div>}
        {headers.length !== 0 && <div className="section-header">{headers}</div>}
        {this.props.children}
      </div>
    )
  }
}

Section.propTypes = {
  className: React.PropTypes.string,
  headers: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
  ]),
  onChange: React.PropTypes.func,
}
Section.defaultProps = {
  className: '',
  headers: [],
  onChange: () => {},
}
