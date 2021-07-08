import * as C from '../constants/constants'

const authState = {
  isLoading: false,
  isAuthenticated: null,
  error: ""
}

export default function authReducer(state = authState, action) {
  switch (action.type) {
    case C.LOGOUT_REQ:
      return { ...state, isLoading: true }

    case C.LOGOUT_REQ_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: false }

    case C.LOGOUT_REQ_FAILED:
      return { ...state, isLoading: false, isAuthenticated: true }

    case C.LOGIN_REQ:
      return { 
        ...state, 
        isLoading: true,
        error: "" 
      }

    case C.LOGIN_REQ_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      }
    case C.LOGIN_REQ_FAILED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      }
    case C.SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}