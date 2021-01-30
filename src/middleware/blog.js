import {
    blogCreateRequest,
    blogCreateSuccess,
    blogCreateFailed
} from '../actions/blog';
import strapiAxiosInstance from '../services/strapiApi';
import { getItem } from '../utils/cache';
import { ROUTES } from '../constants/appRoutes';
import { NOTIFICATION_TYPES,MESSAGE } from '../constants/app';
import { notification } from '../services/notification';
import history from '../utils/history'

export const createBlog = (data) => {
    return (dispatch) => {
        dispatch(blogCreateRequest())
        const route = JSON.parse(getItem('sessionData'))?.data?.data?.site?.route;
        strapiAxiosInstance.post(route, data).then((response)=>{
            history.push(ROUTES.DASHBOARD)
            dispatch(blogCreateSuccess(response))
            notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.BLOG_SUCCESS);
        }).catch((error) => {
            dispatch(blogCreateFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.BLOG_FAILD);
        })
    };
};