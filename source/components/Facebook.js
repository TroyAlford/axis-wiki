import Cookie from 'js-cookie'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import Icon from './Icon'

function asyncLoadSDK(language = 'en_US') {
  ((d, s, id) => {
    const element = d.getElementsByTagName(s)[0]
    const fjs = element
    let js = element
    if (d.getElementById(id)) { return }
    js = d.createElement(s); js.id = id
    js.src = `//connect.facebook.net/${language}/all.js`
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')
}

function goToProfile() {
  browserHistory.push('/profile')
}

export default class Facebook extends Component {
  constructor(props) {
    super(props)

    const { config: { appId } } = props
    this.state = { cookieName: `fbsr_${appId}` }
  }

  componentDidMount() {
    if (document.getElementById('facebook-jssdk') && window.FB) {
      return this.initializeFacebook()
    }

    window.fbAsyncInit = () => { this.initializeFacebook() }
    return asyncLoadSDK()
  }

  componentWillReceiveProps(props) {
    const { config: { appId } } = props
    this.setState({ cookieName: `fbsr_${appId}` })
  }

  initializeFacebook = () => {
    const { version, config: { appId } } = this.props
    window.FB.init({
      appId,
      cookie: false, // disable - control this explicitly
      xfbml:  true, // parse social plugins on page
      version, // use props-specified graph api version
    })
    window.FB.getLoginStatus(this.handleStatus)
  }

  handleStatus = (response) => {
    const cookie = Cookie.get(this.state.cookieName)
    if (cookie && response.status === 'connected') {
      // Logged in, authorized
      window.FB.api('/me/permissions', {}, ({ data }) => {
        const granted = data.filter(
          ({ status }) => status === 'granted'
        ).map(({ permission }) => permission)

        const denied = this.props.scope.filter(scope => granted.indexOf(scope) === -1)
        if (denied.length) {
          window.FB.login(this.loadProfile, {
            scope:     this.props.scope.join(','),
            auth_type: 'rerequest',
          })
        } else {
          this.loadProfile()
        }
      })
    } else {
      // Not authorized, or not logged in to FB
      this.logOff()
    }
  }

  loadProfile = () => {
    window.FB.api('/me', { fields: this.props.fields }, (me) => {
      this.props.onUserLoaded(me)
      this.updateCookie()
    })
  }

  logOn = () => {
    window.FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        this.loadProfile()
      } else {
        window.FB.login(this.loadProfile, {
          scope: this.props.scope.join(','),
        })
      }
    })
  }

  logOff = () => {
    this.removeCookie()
    this.props.onLoggedOff()
  }

  removeCookie = () => {
    const cookieName = `fbsr_${this.props.config.appId}`
    if (this.props.user.id && Cookie.get(cookieName)) {
      Cookie.remove(cookieName, {
        domain: window.location.hostname,
        path:   '/',
      })
    }
  }

  updateCookie = () => {
    const fbAuthResponse = window.FB.getAuthResponse()
    const cookieName = `fbsr_${this.props.config.appId}`
    Cookie.set(cookieName, fbAuthResponse.signedRequest, {
      domain:  window.location.hostname,
      expires: fbAuthResponse.expiresIn,
      path:    '/',
    })
  }

  render() {
    const { className, user, version } = this.props
    const anonymous = !(user.id)
    const imageSrc = [
      '//graph.facebook.com',
      version, user.id,
      'picture?height=24&width=24',
    ].join('/')

    return (
      <div className={`fb ${className}`}>
        { anonymous ? (
          <button onClick={this.logOn} className="login button icon icon-facebook">Log In</button>
        ) : [
          <button key="profile" className="profile button" onClick={goToProfile}>
            <img key="picture" alt="" src={imageSrc} />
            {user.name}
          </button>,
          <Icon key="icon" name="logout" onClick={this.logOff} />,
        ]}
      </div>
    )
  }
}

Facebook.propTypes = {
  fields:  PropTypes.arrayOf(PropTypes.string).isRequired,
  scope:   PropTypes.arrayOf(PropTypes.string).isRequired,
  version: PropTypes.string.isRequired,

  onAuthResponse: PropTypes.func.isRequired,
  onLoggedOff:    PropTypes.func.isRequired,
  onUserLoaded:   PropTypes.func.isRequired,
}
Facebook.defaultProps = {
  fields:  ['id', 'email', 'gender', 'locale', 'name', 'picture'],
  scope:   ['public_profile', 'email'],
  version: 'v2.9',

  onAuthResponse: (authResponse) => {}, // eslint-disable-line no-unused-vars
  onLoggedOff:    () => {},
  onUserLoaded:   (user) => {}, // eslint-disable-line no-unused-vars
}
