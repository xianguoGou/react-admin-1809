import { TOGGLE_GLOBAL_LOADING } from '../actions/ui'

const initialState = {
  isGlobalLoading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_GLOBAL_LOADING:
      return action.payload.status === true ? {
        ...state,
        isGlobalLoading: true
      } : {
        ...state,
        isGlobalLoading: false
      }
    default:
      return state
  }
}
