import React from 'react'

const Icon = ({ className = '', name = 'settings', size = 'default', onClick }) => (
  <span
    className={`icon is-${size} ${className}`}
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : 'inherit' }}
  ><i className={`icon-${name}`} /></span>
)

Icon.displayName = 'Icon'
export default Icon
