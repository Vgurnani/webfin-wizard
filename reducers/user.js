import {ActionTypes} from '../actions/user/actionTypes'
const initialState = {
    user: {},
    loading: false
}
export default (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.LOGIN_REQUEST:
        return { ...state, loading: true };
      case ActionTypes.LOGIN_SUCCESS:
        return { ...state, user: action.payload, loading: false };
      case ActionTypes.LOGIN_FAILURE:
        return { ...state, error: action.payload.error, loading: false };

      case ActionTypes.REGISTRATION_REQUEST:
        return { ...state, loading: true };
      case ActionTypes.REGISTRATION_SUCCESS:
        return { ...state, user: action.payload, loading: false };
      case ActionTypes.REGISTRATION_FAILURE:
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };