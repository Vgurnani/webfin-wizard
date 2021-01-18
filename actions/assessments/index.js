import { ActionTypes } from './actionTypes'
import { getData, postData } from '../../lib/api'
import {reset} from 'redux-form';
import { NOTIFICATION_TYPES } from '../../constants/app';
import { notification } from '../../services/notification';

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
            const niches = result.niches.map((item) => ({label: item.label,value: item.id.toString(),icon: item.icon}))
            const colorPalette = result.pallete.map((item) => ({label: item.label,value: item.id.toString(),colors: item.colours.split(',')}))
            const fonts = result.fonts.map((item) => ({label: item.label,value: item.id.toString()}))
            dispatch(getAssessmentSuccess({niches, colorPalette,fonts}))
        }).catch((error) => {
            notification(NOTIFICATION_TYPES.ERROR, 'Something went wrong')
            dispatch(getAssessmentFailure(error.message))
        })
    };
};


export const createAssessmentRequest = () => {
    return {
        type: ActionTypes.CREATE_ASSESSMENT_REQUEST,

    };
};

export const createAssessmentSuccess = (data) => {
    return {
        type: ActionTypes.CREATE_ASSESSMENT_SUCCESS,
        payload: data,
    };
};

export const createAssessmentFailure = (error) => {
    return {
        type: ActionTypes.CREATE_ASSESSMENT_FAILURE,
        payload: error,
    };
};

export const createAssessment = (data) => {
    return (dispatch) => {
        
        dispatch(createAssessmentRequest())
        postData(`/assessment`, data).then((response)=>{
            notification(NOTIFICATION_TYPES.SUCCESS, 'Create Assessment Successfully');
            localStorage.clear();
            dispatch(reset('assessmentForm'))
            dispatch(createAssessmentSuccess(response.data))
        }).catch((error) => {
            notification(NOTIFICATION_TYPES.ERROR, error.message)
            dispatch(createAssessmentFailure(error.message))
        })
    };
};