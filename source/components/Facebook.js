import Cookie from 'js-cookie'
import React from 'react'
import ComponentBase from '../application/ComponentBase'

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

export default class Facebook extends ComponentBase {
  constructor(props) {
    super(props)

    const { config: { appId } } = props
    this.state = { cookieName: `fbsr_${appId}` }
  }
  componentWillReceiveProps(props) {
    const { config: { appId } } = props
    this.setState({ cookieName: `fbsr_${appId}` })
  }

  componentDidMount() {
    if (document.getElementById('facebook-jssdk') && window.FB) {
      return this.initializeFacebook()
    }

    window.fbAsyncInit = () => { this.initializeFacebook() }
    return asyncLoadSDK()
  }

  initializeFacebook() {
    const { version, config: { appId } } = this.props
    window.FB.init({
      appId,
      cookie: false, // disable - control this explicitly
      xfbml:  true, // parse social plugins on page
      version, // use props-specified graph api version
    })
    window.FB.getLoginStatus(this.handleStatus)
  }

  handleStatus(response) {
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

  loadProfile() {
    window.FB.api('/me', { fields: this.props.fields }, (me) => {
      this.props.onUserLoaded(me)
      this.updateCookie()
    })
  }

  logOn() {
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

  logOff() {
    this.removeCookie()
    this.props.onLoggedOff()
  }

  removeCookie() {
    const cookieName = `fbsr_${this.props.config.appId}`
    if (this.props.user.id && Cookie.get(cookieName)) {
      Cookie.remove(cookieName, {
        domain: window.location.hostname,
        path:   '/',
      })
    }
  }

  updateCookie() {
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
          <img key="picture" alt="" src={imageSrc} />,
          <button
            key="btn" onClick={this.logOff}
            className="logout button icon icon-facebook"
          >Log Out</button>,
        ]}
      </div>
    )
  }
}

Facebook.propTypes = {
  fields:  React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  scope:   React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  version: React.PropTypes.string.isRequired,

  onAuthResponse: React.PropTypes.func.isRequired,
  onLoggedOff:    React.PropTypes.func.isRequired,
  onUserLoaded:   React.PropTypes.func.isRequired,
}
Facebook.defaultProps = {
  fields:  ['id', 'email', 'gender', 'locale', 'name', 'picture'],
  scope:   ['public_profile', 'email'],
  version: 'v2.8',

  onAuthResponse: (authResponse) => {}, // eslint-disable-line no-unused-vars
  onLoggedOff:    () => {},
  onUserLoaded:   (user) => {}, // eslint-disable-line no-unused-vars
}
