import { ROUTES } from '../constants/appRoutes';
import { NOTIFICATION_TYPES,MESSAGE } from '../constants/app';
import { notification } from '../services/notification';
import { createAssessment } from './assessments/'
import Cookies from 'js-cookie';
import Router from 'next/router';
import axiosInstance from '../services/api';

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


} from '../actions/user/auth'

export const loginUser = (data) => {
    return (dispatch) => {
        dispatch(loginRequest())
        axiosInstance.post(`/auth/login`, data).then((response)=>{
            response.data.data['accessToken'] = response.data.accessToken
            Cookies.set('user', JSON.stringify(response.data.data))
            Router.push(ROUTES.DASHBOARD)
            notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.LOGIN_SUCCESS);
            dispatch(loginSuccess(response.data.data))
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
        Cookies.remove('user')
        dispatch(logoutSuccess())
        Router.push(ROUTES.LOGIN)
    };
};

export const registrationUser = (data, assessmentData) => {
    return (dispatch) => {
        dispatch(registrationRequest())
        axiosInstance.post(`/auth/signup`, data)
            .then((response) => {
                response.data.data['accessToken'] = response.data.accessToken
                Cookies.set('user', JSON.stringify(response.data.data))
                Router.push(ROUTES.CONFIRM_ACCOUNT)
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
        axiosInstance.get(`/user/verify?code=${data.code}`)
            .then((response) => {
                Router.push(ROUTES.DASHBOARD)
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
        axiosInstance.get(`/user/verify/resend`, data)
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
        const url = step === 1 ? '/step1' : (step === 2 ) ? '/step2' : '/step3' 
        axiosInstance.post(url, data)
        .then((response) => {
            setStep(step+1)
            dispatch(forgetPasswordSuccess(response))
            notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.CODE_SEND);
        })
        .catch((error) => {
            notification(NOTIFICATION_TYPES.ERROR, error?.response?.data?.message)
            dispatch(forgetPasswordFailure(error?.response?.data?.message));
        });
    }
}