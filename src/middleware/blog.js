import {
    blogCreateRequest,
    blogCreateSuccess,
    blogCreateFailed,
    publishRequest,
    publishSuccess,
    publishFailed,
    getBlogListSuccess,
    getBlogListFailed,
    getBlogsRequest,
    deleteBlogSuccess,
    deleteBlogRequest,
    editBlogRequest,
    cloneBlogRequest
} from '../actions/blog';
import strapiAxiosInstance from '../services/strapiApi';
import { getItem } from '../utils/cache';
import { ROUTES } from '../constants/appRoutes';
import { NOTIFICATION_TYPES,MESSAGE } from '../constants/app';
import { notification } from '../services/notification';
import history from '../utils/history'
import { imageUpload } from './assessments'
import { dataURLtoFile , uId } from '../utils/helpers'
import axiosInstance from '../services/api';

export const checkAvailbleSlug = async(route,data) => {
    const requestData = {
        contentTypeUID: `application::${ route }.${ route }`,
        data: data,
        field: 'slug'
    }
    try{
        const result = await strapiAxiosInstance.post('/content-manager/uid/generate', requestData)
        if([ 200,203 ].includes(result.status)){
            return result.data.data
        }
    }catch(error){
        return null
    }
}

export const createBlog = (data) => {
    return async(dispatch) => {
        dispatch(blogCreateRequest())
        if(data.imageUrl){
            const file = dataURLtoFile(data.imageUrl,uId()+'.png')
            data[ 'imageUrl' ] = await imageUpload(file);
        }
        const route = JSON.parse(getItem('sessionData'))?.data?.data?.site?.route;
        data[ 'slug' ] = await checkAvailbleSlug(route,data)
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

export const callPublish = () => {
    return(dispatch) => {
        dispatch(publishRequest())
        axiosInstance.post('/user/site/publish').then((response)=>{
            history.push(ROUTES.DASHBOARD)
            notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.PUBLISH_SUCCESS);
            dispatch(publishSuccess(response.data))
        }).catch((error)=>{
            dispatch(publishFailed(error))
        })
    }
}

export const getBlogs =  () => {
    return async(dispatch) => {
        try{
            dispatch(getBlogsRequest())
            const route = JSON.parse(getItem('sessionData'))?.data?.data?.site?.route;
            const result = await strapiAxiosInstance.get(route)
            if([ 200,203 ].includes(result.status)){
                console.log(result.data);
                const published = [];
                const draft = [];
                result.data.forEach(blog => {
                    if (blog.published_at) {
                        published.push(blog);
                    } else {
                        draft.push(blog);
                    }
                })
                dispatch(getBlogListSuccess({ published, draft }));
            }
        }catch(error){
            dispatch(getBlogListFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG);
        }
    }
}

export const deleteBlog =  (data) => {
    return async(dispatch) => {
        try{
            dispatch(deleteBlogRequest())
            const route = JSON.parse(getItem('sessionData'))?.data?.data?.site?.route;
            const result = await strapiAxiosInstance.put(`${ route }/${ data.id }`, { deletedAt: new Date() })
            if([ 200,203 ].includes(result.status)){
                console.log(result.data);
                dispatch(deleteBlogSuccess())
            }
        }catch(error){
            dispatch(getBlogListFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG);
        }
    }
}

export const editBlog =  (data) => {
    return async(dispatch) => {
        try{
            dispatch(editBlogRequest())
            const route = JSON.parse(getItem('sessionData'))?.data?.data?.site?.route;
            const result = await strapiAxiosInstance.put(`${ route }/${ data.id }`, data.formData)
            if([ 200,203 ].includes(result.status)){
                console.log(result.data);
            }
        }catch(error){
            dispatch(getBlogListFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG);
        }
    }
}

export const cloneBlog =  (data) => {
    return async(dispatch) => {
        try{
            dispatch(cloneBlogRequest())
            const route = JSON.parse(getItem('sessionData'))?.data?.data?.site?.route;
            const result = await strapiAxiosInstance.put(`${ route }/${ data.id }`, data.formData)
            if([ 200,203 ].includes(result.status)){
                console.log(result.data);
            }
        }catch(error){
            dispatch(getBlogListFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG);
        }
    }
}