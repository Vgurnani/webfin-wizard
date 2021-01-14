import { ActionTypes } from './actionTypes'
import { getData } from '../../lib/api'
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
        getData(`/assessment`).then((response)=>{
            const result  = response.data
            const niches = result.niches.map((item) => ({label: item.label,value: item.id.toString(),imgUrl: item.icon}))
            const colorPalette = result.pallete.map((item) => ({label: item.label,value: item.id.toString(),colors: item.colours.split(',')}))
            const fonts = result.fonts.map((item) => ({label: item.label,value: item.id.toString()}))
            dispatch(getAssessmentSuccess({niches, colorPalette,fonts}))
        }).catch((error) => {
            dispatch(getAssessmentFailure(error.message))
        })
    };
};