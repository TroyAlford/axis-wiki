import { 
  applyMiddleware, 
  combineReducers, 
  createStore 
}                  from 'redux'
import thunk       from 'redux-thunk'
import application from './application'
import article     from './article'
import user        from './user'

export default createStore(
  combineReducers({
    application,
    article,
    user
  }), 
  applyMiddleware(thunk)
);