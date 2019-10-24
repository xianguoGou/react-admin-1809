import {
  login as loginRequest,
  checkToken
} from '../requests'
export const CHANGE_USER_NAME = 'CHANGE_USER_NAME'
export const CHANGE_USER_NAME_ASYNC = 'CHANGE_USER_NAME_ASYNC'
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT = 'LOGOUT'

export const changeUserName = () => {
  return {
    type: CHANGE_USER_NAME
  }
}


export const logout = () => {
  return {
    type: LOGOUT
  }
}

// export const changeUserNameAsync = name => dispatch => {
//   // 请求开始
//   setTimeout(() => {
//     // 请求结束
//     dispatch({
//       type: CHANGE_USER_NAME
//     })
//   }, 2000)
// }

export const changeUserNameAsync = (name) => {
  return (dispatch) => {
    // 请求开始
    setTimeout(() => {
      // 请求结束
      dispatch(changeUserName())
    }, 2000)
  }
}

const loginStart = () => ({
  type: LOGIN_START
})

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: {
    user
  }
})
const loginFailed = () => ({
  type: LOGIN_FAILED
})

export const loginAction = params => dispatch => {
  dispatch(loginStart())
  loginRequest(params)
    .then(res => {
      if(res.data.code === 200) {
        dispatch(loginSuccess(res.data.data))
      }
    })
}

export const checkTokenAction = () => dispatch => {
  const { authorationToken: token } = JSON.parse(window.localStorage.getItem('superAdminInfo')) || {}
  if (!token) {
    return
  }
  dispatch(loginStart())
  checkToken(token)
    .then(res => {
      if(res.data.code === 200) {
        dispatch(loginSuccess({
          isLoginning: false,
          hasLogin: true,
          authorationToken: res.data.data.token
        }))
      } else {
        dispatch(loginFailed())
      }
    })
}
