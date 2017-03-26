import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux'
import thunk from 'redux-thunk'
import config from './config/reducer'
import messages from './messages/reducer'
import navigation from './navigation/reducer'
import page from './page/reducer'
import user from './user/reducer'

export default createStore(
  combineReducers({
    config,
    messages,
    navigation,
    page,
    user,
  }),
  window.InitialState || {},
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
