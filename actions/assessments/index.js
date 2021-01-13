import { ActionTypes } from './actionTypes'
import { getData } from '../../lib/api'
import { colorPalette,kindOfBuild,fontStyle  } from '../../components/assessment/constants'
export const getAssessmentRequest = () => {
    return {
        type: ActionTypes.GET_ASSESSMENT_REQUEST,

    };
};
export const getAssessmentSuccess = (data) => {
    return {
        type: ActionTypes.GET_ASSESSMENT_SUCCESS,
        payload: data,
    };
};
export const getAssessmentFailure = (error) => {
    return {
        type: ActionTypes.GET_ASSESSMENT_FAILURE,
        error: error,
    };
};

export const getAssessment = (data) => {
    return (dispatch) => {
        dispatch(getAssessmentRequest())
        // getData(`/auth/login`).then((response)=>{
        //     response.data['accessToken'] = response.accessToken
        //     dispatch(loginSuccess(response.data))
        // }).catch((error) => {
        //     dispatch(loginFailure(error.message))
        // })
        dispatch(getAssessmentSuccess({colorPalette,kindOfBuild,fontStyle}))
    };
};