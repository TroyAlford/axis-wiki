import React from 'react'
import noop from '@utils/noop'
import Icon from './Icon'

const Favorite = ({ onToggle = noop, value = false }) => (
  <Icon
    className="favorite"
    name={`favorite-${value ? 'on' : 'off'}`}
    onClick={onToggle}
  />
)

Favorite.displayName = 'Favorite'
export default Favorite
