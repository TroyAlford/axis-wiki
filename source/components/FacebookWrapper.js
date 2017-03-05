import { connect } from 'react-redux'
import { setProfile, setLoggedOff, updateProfile } from '../redux/user/actions'
import Facebook from './Facebook'

export default connect(
  state => ({
    config: state.config.facebook,
    user: state.user,
  }),
  dispatch => ({
    onLoggedOff: () => dispatch(setLoggedOff()),
    onUserLoaded: user => dispatch(setProfile(user)),
  }),
)(Facebook)
