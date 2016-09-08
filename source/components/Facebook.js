import { connect } from 'react-redux'
import ComponentBase from '../application/ComponentBase'
import Icon from '../components/Icon'

import {
  setAnonymous,
  logoff,
  logon,
  updateUserInfo
} from '../redux/user/actions'

import { facebook as config } from '../config.json'
import { facebook as defaults } from '../defaults.json'

class Facebook extends ComponentBase {
  constructor(props) {
    super(props);
    this.config = { ...defaults, ...config }
  }

  componentDidMount() {
    if (!window.FB) return;
    FB.Event.subscribe('auth.statusChange', this.handleStatusChange);

    window.fbAsyncInit = (() => {
      FB.init({
        appId   : this.config.application_id,
        cookie  : true,   // allows server to access the session
        status  : true,   // check login status on init
        version : 'v2.5', // use graph api v2.5
        xfbml   : true,   // parse social plugins on page
        frictionlessRequests: true
      });

      FB.getLoginStatus(this.handleStatusChange)
    }).bind(this)
  }

  handleStatusChange(response) {
    let { dispatch } = this.props

    if (response.status === 'connected') // Logged in & authorized
      dispatch(logon())
    else if (response.status === 'not_authorized') // Logged in to FB, not authorized
      dispatch(logoff())
    else // User is not logged in to FB
      dispatch(anonymousUser())
  }

  render() {
    return (
      <div className={`fb level ${this.props.className}`}>
      { this.props.anonymous
        ? <a href="#" className="login button level-item icon icon-facebook"
             onClick={() => this.props.dispatch(logon())}>Log In</a>
        : <div className="level-item mini profile">
            { this.props.picture.data && <img src={this.props.picture.data.url} width="20px" /> }
            <span>{this.props.name}</span>
          </div>
      }
      { !this.props.anonymous &&
        <a href="#" className="logout button level-item icon icon-facebook"
           onClick={e => { this.props.dispatch(logoff())}}>Log Out</a>
      }
      </div>
    )
  }
}

export default connect(
  state => state.user
)(Facebook)
