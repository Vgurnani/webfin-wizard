import {reset} from 'redux-form';
import { NOTIFICATION_TYPES } from '../../constants/app';
import { notification } from '../../services/notification';
import axiosInstance from '../../services/api';
import { 
    getAssessmentRequest,
    getAssessmentSuccess,
    getAssessmentFailure,
    createAssessmentRequest,
    createAssessmentSuccess,
    createAssessmentFailure

} from '../../actions/assessments'
export const getAssessment = (data) => {
    return (dispatch) => {
        dispatch(getAssessmentRequest())
        axiosInstance.get(`/assessment`).then((response)=>{
            const result  = response.data.data
            const niches = result.niches.map((item) => ({label: item.label,value: item.id.toString(),icon: item.icon}))
            const colorPalette = result.pallete.map((item) => ({label: item.label,value: item.id.toString(),colors: item.colours.split(',')}))
            const fonts = result.fonts.map((item) => ({label: item.label,value: item.id.toString()}))
            dispatch(getAssessmentSuccess({niches, colorPalette,fonts}))
        }).catch((error) => {
            notification(NOTIFICATION_TYPES.ERROR, 'Something went wrong')
            dispatch(getAssessmentFailure(error?.response?.data?.message))
        })
    };
};


export const createAssessment = (data) => {
    return (dispatch) => {
        
        dispatch(createAssessmentRequest())
        axiosInstance.post(`/assessment`, data).then((response)=>{
            notification(NOTIFICATION_TYPES.SUCCESS, 'Create Assessment Successfully');
            localStorage.clear();
            dispatch(reset('assessmentForm'))
            dispatch(createAssessmentSuccess(response.data))
        }).catch((error) => {
            notification(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message)
            dispatch(createAssessmentFailure(error?.response?.data?.message))
        })
    };
};