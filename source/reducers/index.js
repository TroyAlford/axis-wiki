import { 
  applyMiddleware, 
  combineReducers, 
  createStore 
}                          from 'redux'
import thunk               from 'redux-thunk'
import application         from './application'
import article             from './article'

export default createStore(
  combineReducers({
    application,
    article
  }), 
  applyMiddleware(thunk)
);