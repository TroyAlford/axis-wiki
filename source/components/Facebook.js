import _                        from 'lodash'
import { connect }              from 'react-redux'
import { facebook as config   } from '../config.json'
import { facebook as defaults } from '../defaults.json'

import ComponentBase            from '../application/ComponentBase'
import Icon                     from '../components/Icon'
import { Link }                 from 'react-router'

import { setAnonymous, logoff, logon, updateUserInfo } from '../redux/actions/user'

class Facebook extends ComponentBase {
  constructor(props) {
    super(props);
    this.config = Object.assign({}, config, defaults);
  }

  componentDidMount() {
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
        ? <div 
            className="fb-login-button level-item"
            data-show-faces="false" 
            data-size="medium"
            scope={this.config.permissions}
          ></div>
        : <Link to="/profile" className="level-item profile link">
            <img src={this.props.picture.data.url} width="20px" />
            <span>{this.props.name}</span>
          </Link>
      }
      </div>
    )
  }
}

export default connect(
  state => state.user
)(Facebook)
