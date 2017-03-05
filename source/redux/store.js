import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux'
import thunk from 'redux-thunk'
import article from './article/reducer'
import config from './config/reducer'
import media from './media/reducer'
import messages from './messages/reducer'
import navigation from './navigation/reducer'
import page from './page/reducer'
import search from './search/reducer'
import sheet from './sheet/reducer'
import user from './user/reducer'

export default createStore(
  combineReducers({
    article,
    config,
    media,
    messages,
    navigation,
    page,
    search,
    sheet,
    user,
  }),
  window.InitialState || {},
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
