import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ArticleChildren from '../components/ArticleChildren'

const horizontalText = (label, value, onChange, readOnly = false) => (
  /* eslint-disable jsx-a11y/label-has-for */
  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label>{label}</label>
    </div>
    <div className="field-body">
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input
            type="text" value={value} placeholder={label}
            onChange={onChange} readOnly={readOnly} disabled={readOnly}
            className="input"
          />
        </p>
      </div>
    </div>
  </div>
)

class Profile extends Component {
  createChangeHandler = field => ev =>
    this.setState({ [field]: ev.target.value })

  render() {
    const { name, favorites, editable } = this.props

    return (
      <div className="profile page">
        {horizontalText('Name', name, this.createChangeHandler('name'), !editable)}
        <ArticleChildren
          articles={favorites}
          caption="Favorites"
          iconName="favorite-on"
        />
      </div>
    )
  }
}

Profile.defaultProps = {
  editable:  false,
  favorites: [],
  name:      '',
}
Profile.propTypes = {
  editable:  PropTypes.bool,
  name:      PropTypes.string,
  favorites: PropTypes.arrayOf(PropTypes.string),
}

export default connect(
  state => ({
    ...state.page,
    editable: false,
    // editable: (
    //   state.user.privileges.includes('admin') ||
    //   state.user.id === state.page.id
    // ),
  })
)(Profile)
