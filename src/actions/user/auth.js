
import { ActionTypes } from './actionTypes';

export const loginRequest = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
    };
};

export const loginSuccess = (data) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: data,
    };
};

export const loginFailure = (error) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        payload: error,
    };
};


export const logoutSuccess = (data) => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS,
        payload: data,
    };
};

export const registrationRequest = () => {
    return {
        type: ActionTypes.REGISTRATION_REQUEST,

    };
};

export const registrationSuccess = (data) => {
    return {
        type: ActionTypes.REGISTRATION_SUCCESS,
        payload: data,
    };
};

export const registrationFailure = (error) => {
    return {
        type: ActionTypes.REGISTRATION_FAILURE,
        error: error,
    };
};



export const emailVerificationSuccess = (response) => {
    return {
        type: ActionTypes.EMAIL_VERIFICATION_SUCCESS,
        payload: response,
    };
};
export const emailVerificationFailure = (error) => {
    return {
        type: ActionTypes.EMAIL_VERIFICATION_FAILURE,
        error: error,
    };
};



export const resentCodeSuccess = (response) => {
    return {
        type: ActionTypes.RESEND_CODE_SUCCESS,
        payload: response,
    };
};
export const resendCodeFailure = (error) => {
    return {
        type: ActionTypes.RESEND_CODE_FAILURE,
        error: error,
    };
};



export const forgetPasswordRequest = () => {
    return {
        type: ActionTypes.FORGET_PASSWORD_REQUEST,
    };
};

export const forgetPasswordSuccess = (data, step) => {
    return {
        type: ActionTypes.FORGET_PASSWORD_SUCCESS,
        payload: data,
        openfpmodal: step === 3
    };
};

export const forgetPasswordFailure = (error) => {
    return {
        type: ActionTypes.FORGET_PASSWORD_FAILURE,
        payload: error,
    };
};

export const getUserSuccess = (data) => {
    return {
        type: ActionTypes.GET_USER_SUCCESS,
        payload: data,
    };
};
