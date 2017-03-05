import ComponentBase from '../application/ComponentBase'
import Cookie from 'js-cookie'

function asyncLoadSDK(language = 'en_US') {
  ((d, s, id) => {
    const element = d.getElementsByTagName(s)[0];
    const fjs = element;
    let js = element;
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = `//connect.facebook.net/${language}/all.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}

export default class Facebook extends ComponentBase {
  constructor(props) {
    super(props)

    const { config: { app_id } } = props
    this.state = { cookieName: `fbsr_${app_id}` }
  }
  componentWillReceiveProps(props) {
    const { config: { app_id } } = props
    this.setState({ cookieName: `fbsr_${app_id}` })
  }

  componentDidMount() {
    if (document.getElementById('facebook-jssdk') && window.FB) {
      return this.initializeFacebook()
    }

    window.fbAsyncInit = () => { this.initializeFacebook() }
    asyncLoadSDK()
  }

  initializeFacebook() {
    const { version, config: { app_id } } = this.props
    FB.init({
      appId:  app_id,
      cookie: false, // disable - control this explicitly
      xfbml:  true, // parse social plugins on page
      version, // use props-specified graph api version
    })
    FB.getLoginStatus(this.handleStatus)
  }

  handleStatus(response) {
    const cookie = Cookie.get(this.state.cookieName)
    if (cookie && response.status === 'connected') {
      // Logged in, authorized
      this.loadProfile()
    } else {
      // Not authorized, or not logged in to FB
      this.logOff()
    }
  }

  loadProfile() {
    FB.api('/me', { fields: this.props.fields }, (me) => {
      this.props.onUserLoaded(me)
      this.updateCookie()
    })
  }

  logOn() {
    FB.getLoginStatus(response => {
      if (response.status === 'connected')
        this.loadProfile()
      else
        FB.login(this.loadProfile)
    })
  }

  logOff() {
    this.removeCookie()
    this.props.onLoggedOff()
  }

  removeCookie() {
    const cookieName = `fbsr_${this.props.config.app_id}`
    if (this.props.user.id && Cookie.get(cookieName)) {
      Cookie.remove(cookieName, {
        domain: window.location.hostname,
        path: '/',
      })
    }
  }

  updateCookie() {
    const fbAuthResponse = FB.getAuthResponse()
    const cookieName = `fbsr_${this.props.config.app_id}`
    Cookie.set(cookieName, fbAuthResponse.signedRequest, {
      domain: window.location.hostname,
      expires: fbAuthResponse.expiresIn,
      path: '/',
    })
  }

  render() {
    const { className, config, dispatch, user, version } = this.props
    const anonymous = !Boolean(user.id)

    return (
      <div className={`fb level ${className}`}>
      { anonymous ? [
        <a href="#" key="link"
           className="login button level-item icon icon-facebook"
           onClick={this.logOn}>Log In</a>
      ] : [
        <img key="picture" src={`//graph.facebook.com/${version}/${user.id}/picture?height=24&width=24`} />,
        <a href="#" key="link"
           className="logout button level-item icon icon-facebook"
           onClick={this.logOff}>
          Log Out
        </a>
      ]}
      </div>
    )
  }
}

Facebook.propTypes = {
  fields: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  version: React.PropTypes.string.isRequired,

  onAuthResponse: React.PropTypes.func.isRequired,
  onLoggedOff: React.PropTypes.func.isRequired,
  onUserLoaded: React.PropTypes.func.isRequired,
}
Facebook.defaultProps = {
  fields: ['id', 'email', 'name', 'picture'],
  version: 'v2.8',

  onAuthResponse: (authResponse) => {},
  onLoggedOff: () => {},
  onUserLoaded: (user) => {},
}
