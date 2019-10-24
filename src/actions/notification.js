import { getNotifications } from '../requests'

export const CHANGE_NOTIFICATION_READ_STATUS = 'CHANGE_NOTIFICATION_READ_STATUS'
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS'
export const MARK_ALL_NOTIFICATIONS_AS_READ = 'MARK_ALL_NOTIFICATIONS_AS_READ'
export const TOGGLE_NOTIFICATIONS_LOADING = 'TOGGLE_NOTIFICATIONS_LOADING'

export const changeNotificationReadStatus = (id) => {
  return {
    type: CHANGE_NOTIFICATION_READ_STATUS,
    payload: {
      id
    }
  }
}

export const markALlNotificationsAsRead = () => {
  return {
    type: MARK_ALL_NOTIFICATIONS_AS_READ
  }
}

const toggleNotificationsLoading = (status) => {
  return {
    type: TOGGLE_NOTIFICATIONS_LOADING,
    payload: {
      status
    }
  }
}


const setNotifications = (notifications) => {
  return {
    type: SET_NOTIFICATIONS,
    payload: {
      notifications
    }
  }
}

export const getNotificationsAction = () => {
  return dispatch => {
    dispatch(toggleNotificationsLoading(true))
    getNotifications()
      .then(res => {
        dispatch(toggleNotificationsLoading(false))
        if (res.data.code === 200) {
          dispatch(setNotifications(res.data.data))
        }
      })
  }
}
