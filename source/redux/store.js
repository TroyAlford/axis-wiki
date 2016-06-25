import { 
  applyMiddleware, 
  combineReducers, 
  createStore 
}                  from 'redux'
import thunk       from 'redux-thunk'
import application from './application/reducer'
import article     from './article/reducer'
import media       from './media/reducer'
import messages    from './messages/reducer'
import search      from './search/reducer'
import user        from './user/reducer'

export default createStore(
  combineReducers({
    application,
    article,
    media,
    messages,
    search,
    user
  }), 
  applyMiddleware(thunk)
);
