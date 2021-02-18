import { ROUTES } from '../constants/appRoutes';
import { NOTIFICATION_TYPES,MESSAGE } from '../constants/app';
import { notification } from '../services/notification';
import { createAssessment, imageUpload } from './assessments/'
import axiosInstance from '../services/api';
import { getItem, setItem, removeItem } from '../utils/cache';
import history from '../utils/history'
import { getDomain, getUser } from 'utils/helpers'
import _ from 'lodash';
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutSuccess,
    registrationRequest,
    registrationSuccess,
    registrationFailure,
    emailVerificationSuccess,
    emailVerificationFailure,
    resentCodeSuccess,
    resendCodeFailure,
    forgetPasswordRequest,
    forgetPasswordSuccess,
    forgetPasswordFailure,
    updateUserProfileRequest,
    updateUserProfileFailure,
    updateUserProfileSuccess,
    getUserSuccess
} from '../actions/user/auth'
import { dataURLtoFile, uId } from 'utils/helpers';

export const loginUser = (data) => {
    return (dispatch) => {
        dispatch(loginRequest())
        axiosInstance.post('/auth/login', data).then((response)=>{
            response.data.data[ 'accessToken' ] = response.data.accessToken
            setItem('user', response.data.data)
            notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.LOGIN_SUCCESS);
            dispatch(loginSuccess(response.data.data))
            history.push(ROUTES.DASHBOARD)
            // assessmentData && dispatch(createAssessment(assessmentData))
        }).catch((error) => {
            notification(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message)
            dispatch(loginFailure(error?.response?.data?.message))
        })
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(loginRequest())
        removeItem('user')
        removeItem('sessionData')
        dispatch(logoutSuccess())
        history.push(ROUTES.LOGIN)
    };
};

export const registrationUser = (data, assessmentData) => {
    return (dispatch) => {
        dispatch(registrationRequest())
        axiosInstance.post('/auth/signup', data)
            .then((response) => {
                response.data.data[ 'accessToken' ] = response.data.accessToken
                response.data.data[ 'test' ] = false
                assessmentData[ 'route' ] = response.data.data.route
                setItem('user', response.data.data)
                notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.REGISTRATION_SUCCESS);
                dispatch(registrationSuccess(response.data.data))
                !_.isEmpty(assessmentData) && dispatch(createAssessment(assessmentData))

            })
            .catch((error) => {
                notification(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message)
                dispatch(registrationFailure(error?.response?.data?.message));
            });

    };
};

export const emailVerification = (data) => {
    return (dispatch) => {
        dispatch(registrationRequest())
        axiosInstance.get(`/user/verify?code=${ data.code }`)
            .then((response) => {
                let  user = getItem('user');
                user = JSON.parse(user)
                user[ 'enabled' ] = true
                setItem('user', user)
                history.push(ROUTES.DASHBOARD)
                dispatch(emailVerificationSuccess(response))
                notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.EMAIL_ACTIVATE);
            })
            .catch((error) => {

                notification(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message)
                dispatch(emailVerificationFailure(error?.response?.data?.message));
            });

    };
};

export const resendCode = (data) => {
    return (dispatch) => {
        dispatch(registrationRequest())
        axiosInstance.get('/user/verify/resend', data)
            .then((response) => {
                dispatch(resentCodeSuccess(response))
                notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.CODE_SEND);
            })
            .catch((error) => {
                notification(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message)
                dispatch(resendCodeFailure(error?.response?.data?.message));
            });

    };
};

export const passwordResendCode = (email) => {
    return (dispatch) => {
        dispatch(registrationRequest())
        axiosInstance.post('/password/resend', { email: email })
            .then((response) => {
                dispatch(resentCodeSuccess(response))
                notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.CODE_SEND);
            })
            .catch((error) => {
                notification(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message)
                dispatch(resendCodeFailure(error?.response?.data?.message));
            });

    };
};

export const forgetPassword = (step, setStep, data) =>{
    return(dispatch) => {
        dispatch(forgetPasswordRequest())
        const url = step === 1 ? '/password' : (step === 2 ) ? '/password/verify' : '/password/reset'
        const method = step === 3 ? 'put' : 'post'
        const message = step === 1 ? MESSAGE.CODE_SEND : (step === 3 ? 'Successfully updated' : 'Vefied Code' )
        axiosInstance({
            method: method,
            url: url,
            data: data
        }).then((response) => {
            dispatch(forgetPasswordSuccess(response, step))
            notification(NOTIFICATION_TYPES.SUCCESS, message);
            if(step !== 3){
                setStep(step+1);
            }
        })
            .catch((error) => {
                notification(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message)
                dispatch(forgetPasswordFailure(error?.response?.data?.message));
            });
    }
}

export const getCurrentUser = () => {
    return (dispatch) => {
        axiosInstance.get('/user')
            .then((response) => {
                setItem('sessionData', response)
                const user = getUser();
                console.log('Response?.data', response?.data, user)
                if (response?.data?.data?.user) {
                    setItem('user', { ...user, ...response.data.data.user })
                }
                dispatch(getUserSuccess(response));
            })
            .catch((error) => {
                notification(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message);
            });

    };
};

export const updateCurrentUser = (data) => {

    return async (dispatch) => {
        dispatch(updateUserProfileRequest());
        if(data.profileImageUrl && !data.profileImageUrl.match('^(http|https)://')){
            const file = dataURLtoFile(data.profileImageUrl,uId()+'.png')
            data[ 'profileImageUrl' ] = await imageUpload(getDomain(),'profile',file);
        }
        axiosInstance.put('/user', data)
            .then((response) => {
                const user = JSON.parse(getItem('user'));
                setItem('user', { ...user, ...response.data })
                notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.USER_PROFILE_UPDATE_SUCCESS);
                history.push(ROUTES.DASHBOARD)
                dispatch(updateUserProfileSuccess(response.data));
            })
            .catch((error) => {
                notification(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message);
                dispatch(updateUserProfileFailure(error?.response?.data?.message));
            });
    };
};