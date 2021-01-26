import { ActionTypes } from './actionTypes';

export const blogCreateRequest = (data) => {
    return {
        type: ActionTypes.BLOG_CREATE,
        payload: data
    };
};