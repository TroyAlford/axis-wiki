import _                  from 'lodash'
import ComponentBase      from '../application/ComponentBase'
import ConfigJSON         from '../../config/config.json'

export default class Facebook extends ComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.config = _.merge({
      facebook: {
        application_id: '',
        permissions: "public_profile,email"
      }
    }, ConfigJSON);
  }

  componentDidMount() {
    FB.Event.subscribe('auth.statusChange', this.handleStatusChange);
    FB.init({
      appId   : this.config.facebook.application_id,
      cookie  : true,   // allows server to access the session
      status  : true,   // check login status on init
      version : 'v2.5', // use graph api v2.5
      xfbml   : true    // parse social plugins on page
    });
  }

  handleUserChange(user) {
    this.setState({ user: user });
    if (this.onUserChange) this.onUserChange(user);
  }
  handleStatusChange(response) {
    if (response.status !== 'connected')
      return this.handleUserChange(null);

    FB.api('/me', { fields: 'name,email,picture.width(250)' }, (response => {
      this.handleUserChange(response);
    }).bind(this));
  }

  render() {
    let settings_link = !this.state.user ? '' :
      <a href="/profile" className="navbar-item">
        {this.state.user.name}
      </a>;

    return (
      <div className="navbar-right">
        {settings_link}
        <div 
          className="fb-login-button navbar-item"
          data-auto-logout-link="true"
          data-show-faces="false" 
          data-size="medium"
          scope={this.config.facebook.permissions}
        ></div>
      </div>
    );
  }
}