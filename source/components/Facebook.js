import _                        from 'lodash'
import { connect }              from 'react-redux'
import { facebook as config   } from '../config.json'
import { facebook as defaults } from '../defaults.json'

import ComponentBase            from '../application/ComponentBase'
import Icon                     from '../components/Icon'
import { Link }                 from 'react-router'

import { logoff, logon, updateUserInfo } from '../redux/actions/user'

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

  loadProfile() {
    FB.api('/me', { fields: 'name,email,picture.width(250)' }, (response => {
      let { id, email, name, picture } = response;
      this.props.dispatch(updateUserInfo({ id, email, name, picture }));
    }).bind(this));
  }

  handleStatusChange(response) {
    if (response.status === 'connected')
      this.loadProfile()
    else
      this.props.dispatch(logoff())
  }

  render() {
    return (
      <div className="navbar-right">
      { this.props.anonymous
        ? <div 
            className="fb-login-button navbar-item"
            data-show-faces="false" 
            data-size="medium"
            scope={this.config.permissions}
          ></div>
        : <Link to="/profile" className="navbar-item profile link">
            <img src={this.props.picture.data.url} width="24px" />
            <span>{this.props.name}</span>
          </Link>
      }
      </div>
    );
  }
}

export default connect(
  state => state.user
)(Facebook)
