import _                        from 'lodash'
import { connect }              from 'react-redux'
import ComponentBase            from '../application/ComponentBase'
import { facebook as config   } from '../config.json'
import { facebook as defaults } from '../defaults.json'

import { logoff, logon, updateProfile } from '../actions/user'

class Facebook extends ComponentBase {
  constructor(props) {
    super(props);
    this.config = Object.assign({}, config, defaults);
  }

  componentDidMount() {
    FB.Event.subscribe('auth.statusChange', this.handleStatusChange);
    FB.init({
      appId   : this.config.application_id,
      cookie  : true,   // allows server to access the session
      status  : true,   // check login status on init
      version : 'v2.5', // use graph api v2.5
      xfbml   : true    // parse social plugins on page
    });
    if ("" === FB.getUserID())
      this.props.dispatch(logoff());
    else
      this.loadProfile();
  }

  loadProfile() {
    FB.api('/me', { fields: 'name,email,picture.width(250)' }, (response => {
      let { id, email, name, picture } = response;
      this.props.dispatch(updateProfile({ id, email, name, picture }));
    }).bind(this));
  }

  handleStatusChange(response) {
    if (response.status == 'connected')
      this.props.dispatch(logoff())
    else
      this.props.dispatch(logon())
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
        : <a href="/profile" className="navbar-item">
            {this.props.name}
          </a>
      }
      </div>
    );
  }
}

export default connect(
  state => state.user
)(Facebook)
