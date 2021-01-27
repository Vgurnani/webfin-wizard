import { ActionTypes } from '../actions/assessments/actionTypes'
const initialState = {
    assessmentData: {},
    loading: false,
    unsplashImages: [],
    domains: []
}
export default (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.GET_ASSESSMENT_REQUEST:
        return { ...state, loading: true };
      case ActionTypes.GET_ASSESSMENT_SUCCESS:
        return { ...state, assessmentData: action.payload, loading: false };
      case ActionTypes.GET_ASSESSMENT_FAILURE:
        return { ...state, error: action.error, loading: false };
      case ActionTypes.CREATE_ASSESSMENT_REQUEST:
        return { ...state, loading: true };
      case ActionTypes.CREATE_ASSESSMENT_SUCCESS:
        return { ...state, assessmentData: action.payload, loading: false };
      case ActionTypes.CREATE_ASSESSMENT_FAILURE:
        return { ...state, error: action.error, loading: false };
      case ActionTypes.GET_UNSPLASH_SUCCESS:
        return {...state, unsplashImages: action.payload || [], loading: false}
      case ActionTypes.GET_UNSPLASH_ERROR:
        return {...state, unsplashImages: [], loading: false}
      case ActionTypes.GET_VERIFIED_DOMAIN:
        return { ...state, domains: action.payload.domains }
      case ActionTypes.CLEAR_DOMAINS:
        return { ...state, domains: [] }
      default:
        return state;
    }
  };