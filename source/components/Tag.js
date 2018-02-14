import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@components/Icon'
import noop from '@utils/noop'

export default class Tag extends Component {
  static defaultProps = {
    className: 'icon-tag',
    linkTo: undefined,
    onClickRemove: noop,
    removable: false,
    tag: '',
  }

  handleClickRemove = () => this.props.onClickRemove(this.props.tag)

  render = () => {
    const { className, removable, linkTo, tag } = this.props

    const classNames = [
      'tag',
      className,
      removable ? 'removable' : '',
    ].filter(Boolean)

    return (
      <span className={classNames.join(' ')}>
        {linkTo ? <Link to={linkTo}>{tag}</Link> : <span>{tag}</span>}
        {removable && <Icon name="remove" onClick={this.handleClickRemove} />}
      </span>
    )
  }
}
