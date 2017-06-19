import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({
  className = '',
  name = '',
  size = 'default',
  onClick,
}) => (
  <span
    className={`icon is-${size} ${className}`}
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : 'inherit' }}
  ><i className={`icon-${name}`} /></span>
)

Icon.defaultProps = {
  className: undefined,
  name:      'settings',
  size:      'default',
  onClick:   undefined,
}
Icon.propTypes = {
  className: PropTypes.string,
  name:      PropTypes.string,
  size:      PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  onClick:   PropTypes.func,
}

export default Icon
