import { ActionTypes } from '../actions/assessments/actionTypes'
const initialState = {
    assessmentData: {},
    loading: false,
    domainLoading: false,
    unsplashImages: [],
    domains: [],
    unsplashLoading: false
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
        return { ...state, error: action.error, loading: false ,updateAssessmentLoader: false };
    case ActionTypes.GET_UNSPLASH_REQUEST:
        return { ...state , unsplashLoading: true ,unsplashImages: [] }
    case ActionTypes.GET_UNSPLASH_SUCCESS:
        return { ...state, unsplashImages: action.payload || [], unsplashLoading: false }
    case ActionTypes.GET_UNSPLASH_ERROR:
        return { ...state, unsplashImages: [], unsplashLoading: false }
    case ActionTypes.GET_VERIFIED_DOMAIN:
        return { ...state, domains: action.payload.domains, domainLoading: false }
    case ActionTypes.GET_VERIFIED_DOMAIN_REQUEST:
        return { ...state, domainLoading: true }
    case ActionTypes.UPDATE_ASSESSMENT_REQUEST:
        return { ...state, updateAssessmentLoader: true }
    case ActionTypes.UPDATE_ASSESSMENT_SUCCESS:
        return { ...state, updateAssessmentLoader: false }
    case ActionTypes.GET_VERIFIED_DOMAIN_ERROR:
        return { ...state, domains: [], domainLoading: false }
    case ActionTypes.CLEAR_DOMAINS:
        return { ...state, domains: [] }
    case ActionTypes.GET_NICHE_SUGGESTION_REQUEST:
        return { ...state, nicheLoading: true }
    case ActionTypes.GET_NICHE_SUGGESTION:
        return { ...state, customNiches: action.payload.niches, nicheLoading: false }
    case ActionTypes.GET_NICHE_SUGGESTION_ERROR:
        return { ...state, nicheLoading: false }
    default:
        return state;
    }
};