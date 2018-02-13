import React from 'react'
import { Link } from 'react-router-dom'
import noop from '@utils/noop'

const Tag = ({ className = 'icon-tag', linkTo, onClickRemove = noop, removable = false, tag = '' }) => (
  <span className={`tag ${className} ${removable || ''}`.replace(/[ ]{2}/g, ' ').trim()}>
    {linkTo ? <Link to={linkTo}>{tag}</Link> : <span>{tag}</span>}
    {removable && <span className="remove" onClick={onClickRemove} />}
  </span>
)

Tag.displayName = 'Tag'
export default Tag
