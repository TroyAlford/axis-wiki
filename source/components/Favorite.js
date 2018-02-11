import React, { Component } from 'react'
import Icon from './Icon'

import { setFavorite } from '../redux/page/actions-article'

export default class Favorite extends Component {
  static defaultProps = {
    className: undefined,
    value: false,
  }

  handleClick = () => {
    const { slug, value } = this.props
    this.props.dispatch(setFavorite({ slug, value: !value }))
  }
  render() {
    const { className, value, ...props } = this.props
    return (
      <Icon
        className={['favorite', className].filter(Boolean).join(' ')}
        name={value ? 'favorite-on' : 'favorite-off'}
        onClick={this.handleClick}
        {...props}
      />
    )
  }
}
