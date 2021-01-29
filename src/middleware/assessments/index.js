import {reset} from 'redux-form';
import { NOTIFICATION_TYPES, MESSAGE } from '../../constants/app';
import { notification } from '../../services/notification';
import axiosInstance from '../../services/api';
import unsplashClient from '../../services/unsplashClient';
import { ROUTES } from '../../constants/appRoutes';
import history  from '../../utils/history'
import { removeItem, setItem } from '../../utils/cache';
import { dataURLtoFile , uId, getUser } from '../../utils/helpers'
import axios from 'axios';
import {
    getAssessmentRequest,
    getAssessmentSuccess,
    getAssessmentFailure,
    createAssessmentRequest,
    createAssessmentSuccess,
    createAssessmentFailure,
    getUnsplashSuccess,
    getVerifiedDomainSuccess,
    getVerifiedDomainRequest,
    getVerifiedDomainError

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
    return async (dispatch) => {
        dispatch(createAssessmentRequest())
        if(data.logoUrl){
            const file = dataURLtoFile(data.logoUrl,uId()+'.png')
            const result =  await axiosInstance.get('/generate')
            const formData = new FormData();
            formData.append('file',file)
            const finalResult = result.status === 200 ? await axios.put(result.data.signedUrl,file,{
                headers: {
                    'Content-Type': file.type,
                    'Access-Control-Allow-Origin': '*'
                }}) : null
        }
        axiosInstance.post(`/assessment`, data).then((response)=>{
            notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.CREATE_ASSESSMENT);
            const user= getUser();
            user['test'] = true
            setItem('user', user)
            removeItem('assessmentForm')
            dispatch(reset('assessmentForm'))
            dispatch(createAssessmentSuccess(response.data))
            history.push(ROUTES.DASHBOARD)
        }).catch((error) => {
            notification(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message)
            dispatch(createAssessmentFailure(error?.response?.data?.message))
            history.push(ROUTES.ASSESSMENT)
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


export const getVerifiedDomain = (name) => {
    return (dispatch) => {
        dispatch(getVerifiedDomainRequest())
        axiosInstance.get(`/check-domain?name=${name}`).then((response)=>{
            dispatch(getVerifiedDomainSuccess(response.data))
        }).catch((error) => {
            dispatch(getVerifiedDomainError(error))
        })
    };
}