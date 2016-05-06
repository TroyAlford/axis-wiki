import { combineReducers } from 'redux'
import application         from './application'
import page                from './page'

export default combineReducers({
  application,
  page
})