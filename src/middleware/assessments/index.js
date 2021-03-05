import { reset } from 'redux-form';
import { NOTIFICATION_TYPES, MESSAGE } from '../../constants/app';
import { notification } from '../../services/notification';
import axiosInstance from '../../services/api';
import unsplashClient from '../../services/unsplashClient';
import { ROUTES } from '../../constants/appRoutes';
import { getCurrentUser } from 'middleware/auth'
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
    getVerifiedDomainError,
    updateAssessmentSuccess,
    getUnsplashRequest,
    updateAssessmentRequest,
    getNicheSuggestionRequest,
    getNicheSuggestionSuccess,
    getNicheSuggestionError

} from '../../actions/assessments'

export const siteBuild = (id) => {
    return() => {
        axiosInstance.put(`/user/site/${ id }/publish`).then(()=>{
        }).catch(()=>{
        })
    }
}
export const getAssessment = () => {
    return (dispatch) => {
        dispatch(getAssessmentRequest())
        axiosInstance.get('/assessment').then((response)=>{
            const result  = response.data.data
            const niches = result.niches.map((item) => ({ label: item.label,value: item.id.toString(),icon: item.icon }))
            dispatch(getAssessmentSuccess({ niches }))
        }).catch((error) => {
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG)
            dispatch(getAssessmentFailure(error?.response?.data?.message))
        })
    };
};

export const imageUpload = async(domain,type,file) => {
    const result =  await axiosInstance.get(`/generate?domain=${ domain }&type=${ type }`)
    if([ 200,203 ].includes(result.status)){
        try{
            const finalResult = await axios.put(result.data.signedUrl,file,{
                headers: {
                    'Content-Type': file.type,
                    'Access-Control-Allow-Origin': '*'
                } })
            if([ 200,203 ].includes(finalResult.status)){
                return result.data.path
            }
        }catch(error){
            return null
        }
    }
    return null
}

export const createAssessment = (data) => {
    return async (dispatch) => {
        dispatch(createAssessmentRequest())
        if(data.logoUrl){
            const file = dataURLtoFile(data.logoUrl,uId()+'.png')
            data[ 'logoUrl' ] = await imageUpload(data.domain,'logo',file);
        }
        if(data.coverImage){
            const file = dataURLtoFile(data.coverImage,uId()+'.png')
            data[ 'coverImage' ] = await imageUpload(data.domain,'cover-image',file);
        }
        data[ 'menuLinks' ] = [ { name: 'home',url: '/' } ]
        data[ 'niche' ] = JSON.parse(data.niche)
        axiosInstance.post('/assessment', data).then((response)=>{
            //notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.CREATE_ASSESSMENT);
            const user= getUser();
            user[ 'test' ] = true
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

export const updateAssessment = (id,data, domain,handleClose) => {
    return async (dispatch) => {
        dispatch(updateAssessmentRequest())
        data[ 'niche' ] = JSON.parse(data.niche)
        if(data.logoUrl && !data.logoUrl.match('^(http|https)://')){
            const file = dataURLtoFile(data.logoUrl,uId()+'.png')
            data[ 'logoUrl' ] = await imageUpload(domain,'logo',file);
        }
        if(data.faviconUrl && !data.faviconUrl.match('^(http|https)://')){
            const file = dataURLtoFile(data.faviconUrl,uId()+'.png')
            data[ 'faviconUrl' ] = await imageUpload(domain,'favicon-icon',file);
        }
        if(data.coverImage  && !data.coverImage.match('^(http|https)://')){
            const file = dataURLtoFile(data.coverImage,uId()+'.png')
            data[ 'coverImage' ] = await imageUpload(data.domain,'cover-image',file);
        }
        axiosInstance.put(`/assessment/${ id }`, data).then((response)=>{
            notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.UPDATE_ASSESSMENT);
            dispatch(getCurrentUser())
            dispatch(updateAssessmentSuccess(response.data))
            dispatch(siteBuild(id))
            handleClose()
        }).catch((error) => {
            notification(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message)
            handleClose()
        })
    };
};

export const getUnsplash = (url,query) => {
    return async (dispatch) => {
        dispatch(getUnsplashRequest())
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
        axiosInstance.get(`/check-domain?name=${ name }`).then((response)=>{
            dispatch(getVerifiedDomainSuccess(response.data))
        }).catch((error) => {
            dispatch(getVerifiedDomainError(error))
        })
    };
}

export const getNicheSuggestion = (name) => {
    return (dispatch) => {
        dispatch(getNicheSuggestionRequest())
        axiosInstance.get(`/assessment/niche?keyword=${ name }`).then((response)=>{
            dispatch(getNicheSuggestionSuccess(response.data.data))
        }).catch((error) => {
            dispatch(getNicheSuggestionError(error))
        })
    };
}