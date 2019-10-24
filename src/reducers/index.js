import { combineReducers } from 'redux'
import user from './user'
import ui from './ui'
import notifications from './notifications'

export default combineReducers({
  user,
  ui,
  notifications
})
