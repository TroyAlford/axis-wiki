import React from 'react'
import Icon from '@components/Icon'
import noop from '@utils/noop'

const Tab = ({ caption = '', children, icon = '', onClick = noop, onRemoveClick = noop, removable = false }) => (
  <div className="tab" onClick={onClick}>
    {icon && <Icon name={icon} />}
    {caption && <div className="caption">{caption}</div>}
    {removable && <Icon name="remove is-small" onClick={onRemoveClick} />}
    {children}
  </div>
)

Tab.displayName = 'Tab'
export default Tab
