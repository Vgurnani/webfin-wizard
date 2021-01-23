import {reset} from 'redux-form';
import { NOTIFICATION_TYPES, MESSAGE } from '../../constants/app';
import { notification } from '../../services/notification';
import axiosInstance from '../../services/api';
import unsplashClient from '../../services/unsplashClient';
// import Router from 'next/router';
import { ROUTES } from '../../constants/appRoutes';

import {
    getAssessmentRequest,
    getAssessmentSuccess,
    getAssessmentFailure,
    createAssessmentRequest,
    createAssessmentSuccess,
    createAssessmentFailure,
    getUnsplashSuccess

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
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG)
            dispatch(getAssessmentFailure(error?.response?.data?.message))
        })
    };
};


export const createAssessment = (data) => {
    return (dispatch) => {

        dispatch(createAssessmentRequest())
        axiosInstance.post(`/assessment`, data).then((response)=>{
            notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.CREATE_ASSESSMENT);
            localStorage.clear();
            dispatch(reset('assessmentForm'))
            dispatch(createAssessmentSuccess(response.data))
            // Router.push(ROUTES.DASHBOARD)
        }).catch((error) => {
            notification(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message)
            dispatch(createAssessmentFailure(error?.response?.data?.message))
            // Router.push(ROUTES.ASSESSMENT)
        })
    };
};


export const getUnsplash = (url,query) => {
    return async (dispatch) => {
       const result = await  unsplashClient.search.getPhotos({
        query: query,
        page: 1,
        perPage: 20
       })
       dispatch(getUnsplashSuccess(result?.response?.results))
    };
};


