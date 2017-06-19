import React, { Component } from 'react'
import { connect } from 'react-redux'

class Profile extends Component {
  render() {
    return (
      <div className="profile page" />
    )
  }
}

Profile.defaultProps = {

}
Profile.propTypes = {

}

export default connect(
  state => ({
    me:   state.user,
    them: state.page,
  })
)(Profile)
