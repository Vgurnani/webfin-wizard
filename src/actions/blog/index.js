import { ActionTypes } from './actionTypes';

export const blogCreateRequest = (data) => {
    return {
        type: ActionTypes.BLOG_CREATE,
        payload: data
    };
};

export const blogCreateSuccess = (data) => {
    return {
        type: ActionTypes.BLOG_CREATE_SUCCESS,
        payload: data
    };
};

export const blogCreateFailed = (error) => {
    return {
        type: ActionTypes.BLOG_CREATE_FAILURE,
        error: error
    };
};