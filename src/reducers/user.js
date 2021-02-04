import {ActionTypes} from '../actions/user/actionTypes'
const initialState = {
    user: {},
    sessionData: {},
    openfpmodal: false,
    loading: false
}
export default (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.LOGIN_REQUEST:
        return { ...state, loading: true };
      case ActionTypes.LOGIN_SUCCESS:
        return { ...state, user: action.payload, loading: false };
      case ActionTypes.LOGIN_FAILURE:
        return { ...state, error: action?.payload, loading: false };
      case ActionTypes.LOGOUT_SUCCESS:
        return {...state, loading: false};
      case ActionTypes.REGISTRATION_REQUEST:
        return { ...state, loading: true };
      case ActionTypes.REGISTRATION_SUCCESS:
        return { ...state, user: action.payload, loading: false };
      case ActionTypes.REGISTRATION_FAILURE:
        return { ...state, error: action.payload, loading: false };
      case ActionTypes.EMAIL_VERIFICATION_SUCCESS:
        return { ...state, success: action.payload, loading: false };
      case ActionTypes.EMAIL_VERIFICATION_FAILURE:
        return { ...state, error: action.error, loading: false };
      case ActionTypes.RESEND_CODE_SUCCESS:
        return { ...state, success: action.payload, loading: false };
      case ActionTypes.RESEND_CODE_FAILURE:
        return { ...state, error: action.error, loading: false };
      case ActionTypes.FORGET_PASSWORD_REQUEST:
        return { ...state, loading: true };
      case ActionTypes.FORGET_PASSWORD_SUCCESS:
        return { ...state, success: action.payload, loading: false, openfpmodal: action.openfpmodal };
      case ActionTypes.FORGET_PASSWORD_FAILURE:
        return { ...state, error: action?.payload, loading: false };
      case ActionTypes.GET_USER_SUCCESS:
        return { ...state, sessionData: action.payload, loading: false };
      default:
        return state;
    }
  };