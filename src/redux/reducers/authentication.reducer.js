import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false, loggingIn: false };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.SIGNUP_REQUEST:
      return {
        signingIn: true,
        user: action.user
      };
    case userConstants.SIGNUP_SUCCESS:
      return {
        signedUp: true,
        user: action.user
      };
    case userConstants.SIGNUP_FAILURE:
      return {};
    case userConstants.RESETPWD_REQUEST:
      return {
        resettingPwd: true,
        user: action.user
      };
    case userConstants.RESETPWD_SUCCESS:
      return {
        resetPwd: true,
        user: action.user
      };
    case userConstants.RESETPWD_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}