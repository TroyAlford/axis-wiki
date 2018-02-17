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
    let text = tag.slice(0, 10)
    if (text !== tag) text += '…'

    return (
      <span className={classNames.join(' ')}>
        {linkTo
          ? <Link className="link" to={linkTo}>{text}</Link>
          : <span className="text">{text}</span>
        }
        {removable && <Icon name="remove" onClick={this.handleClickRemove} />}
      </span>
    )
  }
}
