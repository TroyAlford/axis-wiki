import { 
  applyMiddleware, 
  combineReducers, 
  createStore 
}                  from 'redux'
import thunk       from 'redux-thunk'
import application from './application'
import article     from './article'
import search      from './search'
import user        from './user'

export default createStore(
  combineReducers({
    application,
    article,
    search,
    user
  }), 
  applyMiddleware(thunk)
);