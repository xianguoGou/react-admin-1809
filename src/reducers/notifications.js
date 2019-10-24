import {
  CHANGE_NOTIFICATION_READ_STATUS,
  SET_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS_AS_READ,
  TOGGLE_NOTIFICATIONS_LOADING
} from '../actions/notification'
const initState = {
  data: [],
  isLoading: false
}

export default (state = initState, action) => {
  switch (action.type) {
    case CHANGE_NOTIFICATION_READ_STATUS:
      const data = state.data.map(item => {
        if (item.id === Number.parseInt(action.payload.id, 10)) {
          item.isRead = true
        }
        return item
      })
      return {
        ...state,
        data
      }
    case SET_NOTIFICATIONS:
      return {
        ...state,
        data: action.payload.notifications
      }
    case TOGGLE_NOTIFICATIONS_LOADING:
      return {
        ...state,
        isLoading: action.payload.status === true ? true : false
      }
    case MARK_ALL_NOTIFICATIONS_AS_READ:
      const newData = state.data.map(item => {
        item.isRead = true
        return item
      })
      return {
        ...state,
        data: newData
      }
    default:
      return state
  }
}
