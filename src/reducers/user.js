import { CHANGE_USER_NAME, LOGIN_START, LOGIN_SUCCESS, LOGOUT, LOGIN_FAILED } from '../actions/user'

const storageInfo = JSON.parse(window.localStorage.getItem('superAdminInfo')) || {}
const initState = Object.assign(
  {},
  {
    displayName: '',
    isLoginning: false,
    hasLogin: false
  },
  storageInfo
)

export default (state = initState, action) => {
  switch(action.type) {
    case CHANGE_USER_NAME:
      return {
        ...state,
        name: Math.random()
      }
    case LOGIN_START:
      return {
        ...state,
        isLoginning: true
      }
    case LOGIN_SUCCESS:
      const newState = {
        ...state,
        ...action.payload.user,
        isLoginning: false,
        hasLogin: true
      }
      window.localStorage.setItem('superAdminInfo', JSON.stringify(action.payload.user))
      return newState
    case LOGIN_FAILED:
      return {
        ...state,
        hasLogin: false,
        isLoginning: false,
      }
    case LOGOUT:
      window.localStorage.removeItem('superAdminInfo')
      return {
        ...state,
        hasLogin: false
      }
    default:
      return state
  }
}
