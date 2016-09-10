import { connect } from 'react-redux'
import ComponentBase from '../application/ComponentBase'
import Icon from '../components/Icon'

import { loadProfile, saveProfile, setProfile, setLoggedOff } from '../redux/user/actions'

import { facebook as config } from '../config.json'
import { facebook as defaults } from '../defaults.json'

class Facebook extends ComponentBase {
  constructor(props) {
    super(props);
    this.config = { ...defaults, ...config }
    this.fb_initialized = false
  }

  componentDidMount() {
    if (window.FB)
      this.initializeFacebook()
    else
      window.fbAsyncInit = this.initializeFacebook.bind(this)
  }

  initializeFacebook() {
    FB.Event.subscribe('auth.statusChange', this.handleStatusChange)

    FB.init({
      appId   : this.config.application_id,
      cookie  : true,   // allows server to access the session
      status  : true,   // check login status on init
      version : 'v2.5', // use graph api v2.5
      xfbml   : true,   // parse social plugins on page
      frictionlessRequests: true
    })
    this.fb_initialized = true

    FB.getLoginStatus(this.handleStatusChange)
  }

  handleStatusChange(response) {
    let { dispatch } = this.props

    if (response.status === 'connected') // Logged in & authorized
      dispatch(loadProfile())
    else if (response.status === 'not_authorized') // Logged in to FB, not authorized
      dispatch(setLoggedOff())
    else // User is not logged in to FB
      dispatch(setLoggedOff())
  }

  attemptLogin() {
    if (FB.getAccessToken())
      this.props.dispatch(loadProfile())
    else
      FB.login()
  }

  render() {
    const { dispatch } = this.props

    return (
      <div className={`fb level ${this.props.className}`}>
      { this.props.anonymous
        ? <a href="#" className="login button level-item icon icon-facebook"
             onClick={this.attemptLogin}>Log In</a>
        : <div className="level-item mini profile">
            { this.props.picture.data && <img src={this.props.picture.data.url} width="20px" /> }
            <span>{this.props.name}</span>
          </div>
      }
      { !this.props.anonymous &&
        <a href="#" className="logout button level-item icon icon-facebook"
           onClick={() => dispatch(setLoggedOff())}>Log Out</a>
      }
      </div>
    )
  }
}

export default connect(
  state => state.user
)(Facebook)
