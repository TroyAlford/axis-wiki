import _                  from 'lodash'
import React              from 'react'

import ConfigJSON         from '../../config/config.json'

export default class Facebook extends React.Component {
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

    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    FB.Event.subscribe('auth.statusChange', this.handleStatusChange);

    let fb = this.config.facebook;
    window.fbAsyncInit = function() {
      FB.init({
        appId   : fb.application_id,
        cookie  : true,   // allows server to access the session
        status  : true,   // check login status on init
        version : 'v2.5', // use graph api v2.5
        xfbml   : true    // parse social plugins on page
      });
    }
  }

  handleStatusChange(response) {
    if (response.status !== 'connected')
      return this.setState({ user: null });

    let self = this;
    FB.api('/me', response => {
      self.setState({ user: response })
    });
  }

  render() {
    console.log(this.state.user);
    let settings_link = !this.state.user ? '' :
      <a href="/settings" className="navbar-item button is-small">
        <span className="icon icon-settings">
          {this.state.user.name}
        </span>
      </a>;

    return (
      <div className="navbar-right">
        {settings_link}
        <div 
          className="fb-login-button navbar-item"
          data-auto-logout-link="true"
          data-scope={this.config.facebook.permissions}
          data-show-faces="false" 
          data-size="medium" 
        ></div>
      </div>
    );
  }
}