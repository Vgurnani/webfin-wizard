import { ActionTypes } from './actionTypes';
import { postData } from '../../lib/api';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { ROUTES } from '../../constants/appRoutes';

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

export const loginUser = (data) => {
    return (dispatch) => {
        dispatch(loginRequest())
        postData(`/auth/login`, data).then((response)=>{
            response.data['accessToken'] = response.accessToken
            Cookies.set('user', JSON.stringify(response.data))
            Router.push(ROUTES.DASHBOARD)
            dispatch(loginSuccess(response.data))
        }).catch((error) => {
            dispatch(loginFailure(error.message))
        })
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(loginRequest())
        Cookies.remove('user')
        Router.push(ROUTES.LOGIN)
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

export const registrationUser = (data) => {
    return (dispatch) => {
        dispatch(registrationRequest())
        postData(`/auth/signup`, data)
            .then((response) => {
                response.data['accessToken'] = response.accessToken
                Cookies.set('user', JSON.stringify(response.data))
                Router.push(ROUTES.DASHBOARD)
                dispatch(registrationSuccess(response.data))
            })
            .catch((error) => {
                dispatch(registrationFailure(error.message));
            });

    };
};