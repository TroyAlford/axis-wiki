import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Icon from './Icon'

import { setFavorite } from '../redux/page/actions-article'

class Favorite extends Component {
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
        onClick={this.handleClick} {...props}
      />
    )
  }
}

Favorite.defaultProps = {
  className: undefined,
  value:     false,
}
Favorite.propTypes = {
  className: PropTypes.string,
  dispatch:  PropTypes.func.isRequired,
  slug:      PropTypes.string.isRequired,
  value:     PropTypes.bool,
}

export default connect(
  state => ({
    slug:  state.page.slug,
    value: state.page.isFavorite,
  })
)(Favorite)
