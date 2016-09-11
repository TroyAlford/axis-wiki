import ComponentBase from '../application/ComponentBase'
import Cookie from 'js-cookie'
import Icon from '../components/Icon'
import { connect } from 'react-redux'
import { loadProfile, saveProfile, setProfile, setLoggedOff } from '../redux/user/actions'

import { facebook as config } from '../config.json'
import { facebook as defaults } from '../defaults.json'

window.Cookie = Cookie

class Facebook extends ComponentBase {
  constructor(props) {
    super(props);
    this.config = { ...defaults, ...config }
  }

  componentDidMount() {
    if (window.FB)
      this.initializeFacebook()
    else
      window.fbAsyncInit = this.initializeFacebook.bind(this)
  }

  initializeFacebook() {
    FB.init({
      appId   : this.config.application_id,
      cookie  : false,  // allows server to access the session
      status  : true,   // check login status on init
      version : 'v2.5', // use graph api v2.5
      xfbml   : true,   // parse social plugins on page
      frictionlessRequests: true
    })
  }

  handleStatusChange(response) {
    let { dispatch } = this.props

    if (response.status === 'connected') { // Logged in & authorized
      this.setCookie()
      dispatch(loadProfile())
    } else { // Not authorized, or not logged in to FB
      this.removeCookie()
      dispatch(setLoggedOff())
    }
  }

  logOn() {
    if (!FB.getAccessToken())
      FB.login(this.handleStatusChange)
    else
      FB.getLoginStatus(this.handleStatusChange)
  }
  logOff() {
    this.removeCookie()
    this.props.dispatch(setLoggedOff())
  }

  setCookie() {
    const fbAuthResponse = FB.getAuthResponse()
    const cookieName = `fbsr_${this.config.application_id}`
    Cookie.set(cookieName, fbAuthResponse.signedRequest, {
      domain: window.location.hostname,
      expires: fbAuthResponse.expiresIn,
      path: '/',
    })
  }

  removeCookie() {
    const cookieName = `fbsr_${this.config.application_id}`
    if (this.props.id && Cookie.get(cookieName))
      Cookie.remove(cookieName, {
        domain: window.location.hostname, path: '/'
      })
  }

  render() {
    const { dispatch } = this.props

    return (
      <div className={`fb level ${this.props.className}`}>
      { this.props.anonymous
        ? <a href="#" className="login button level-item icon icon-facebook"
             onClick={this.logOn}>Log In</a>
        : <div className="level-item mini profile">
            { this.props.picture.data && <img src={this.props.picture.data.url} width="20px" /> }
            <span>{this.props.name}</span>
          </div>
      }
      { !this.props.anonymous &&
        <a href="#" className="logout button level-item icon icon-facebook"
           onClick={this.logOff}>Log Out</a>
      }
      </div>
    )
  }
}

export default connect(
  state => state.user
)(Facebook)
