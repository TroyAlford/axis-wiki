import Cookie from 'js-cookie'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import CONFIG from '@config'
import { ANONYMOUS } from '@models/User'
import Icon from './Icon'

function asyncLoadSDK(language = 'en_US') {
  ((d, s, id) => {
    const element = d.querySelector(s)
    const fjs = element
    let js = element
    if (d.getElementById(id)) { return }
    js = d.createElement(s); js.id = id
    js.src = `//connect.facebook.net/${language}/all.js`
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')
}

const COOKIE = `fbsr_${CONFIG.facebook.appId}`

@observer export default class Facebook extends Component {
  static defaultProps = {
    className: '',
    user: {},
  }

  componentDidMount() {
    if (document.getElementById('facebook-jssdk') && window.FB) {
      return this.initializeFacebook()
    }

    window.fbAsyncInit = () => { this.initializeFacebook() }
    return asyncLoadSDK()
  }

  initializeFacebook = () => {
    const { appId, version } = CONFIG.facebook
    window.FB.init({
      appId,
      cookie: false, // disable - control this explicitly
      version, // use props-specified graph api version
      xfbml: true, // parse social plugins on page
    })
    window.FB.getLoginStatus(this.handleStatus)
  }

  handleStatus = (response) => {
    const { scope } = CONFIG.facebook
    const cookie = Cookie.get(COOKIE)
    if (cookie && response.status === 'connected') {
      // Logged in, authorized
      window.FB.api('/me/permissions', {}, ({ data }) => {
        const granted = data.filter(({ status }) => status === 'granted').map(({ permission }) => permission)

        const denied = scope.filter(s => granted.indexOf(s) === -1)
        if (denied.length) {
          window.FB.login(this.loadProfile, {
            scope: scope.join(','),
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
    const { user } = this.props

    window.FB.api('/me', { fields: CONFIG.facebook.fields }, (me) => {
      user.become(me)
      this.updateCookie()
    })
  }

  logOn = () => {
    window.FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        this.loadProfile()
      } else {
        window.FB.login(this.loadProfile, { scope: CONFIG.facebook.scope.join(',') })
      }
    })
  }

  logOff = () => {
    this.props.user.become(ANONYMOUS)
    this.removeCookie()
  }

  removeCookie = () => {
    const { user } = this.props
    if (user.id && Cookie.get(COOKIE)) {
      Cookie.remove(COOKIE, {
        domain: window.location.hostname,
        path: '/',
      })
    }
  }

  updateCookie = () => {
    const fbAuthResponse = window.FB.getAuthResponse()
    Cookie.set(COOKIE, fbAuthResponse.signedRequest, {
      domain: window.location.hostname,
      expires: fbAuthResponse.expiresIn,
      path: '/',
    })
  }

  renderAnonymous = () => (
    <button onClick={this.logOn} className="login button icon icon-facebook">Log In</button>
  )
  renderLoggedIn = () => {
    const { user } = this.props
    const { version } = CONFIG.facebook
    const imageSrc = `//graph.facebook.com/${version}/${user.id}/picture?height=36&width=36`

    return (
      <Fragment>
        <Link className="profile button" to="/profile">
          <img alt="" src={imageSrc} />
          <span className="name">{user.name}</span>
        </Link>
        <Icon name="logout" onClick={this.logOff} />
      </Fragment>
    )
  }

  render = () => {
    const { className, user } = this.props

    return (
      <div className={`fb ${className}`.trim()}>
        {user.id ? this.renderLoggedIn() : this.renderAnonymous()}
      </div>
    )
  }
}
