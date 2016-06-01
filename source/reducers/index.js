import { 
  applyMiddleware, 
  combineReducers, 
  createStore 
}                  from 'redux'
import thunk       from 'redux-thunk'
import application from '../reducers/application'
import article     from '../reducers/article'
import messages    from '../reducers/messages'
import search      from '../reducers/search'
import user        from '../reducers/user'

export default createStore(
  combineReducers({
    application,
    article,
    messages,
    search,
    user
  }), 
  applyMiddleware(thunk)
);