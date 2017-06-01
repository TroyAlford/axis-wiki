import React from 'react'
import PropTypes from 'prop-types'

export default class Section extends React.Component {
  render() {
    const headers = this.props.headers.map((header, index) => {
      const title = typeof header === 'string' ? header : ''
      const classes = [title, 'heading']

      return (
        <div key={index} className={classes.join(' ')}>
          {header}
        </div>
      )
    })

    const title = typeof this.props.title === 'string' ? this.props.title : ''
    const classes = [title, 'section', this.props.className]

    return (
      <div className={classes.join(' ')}>
        {this.props.title && <div className="title">{this.props.title}</div>}
        {headers.length !== 0 && <div className="header">{headers}</div>}
        {this.props.children}
      </div>
    )
  }
}

Section.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  headers: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ])).isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
}
Section.defaultProps = {
  className: '',
  headers: [],
}
