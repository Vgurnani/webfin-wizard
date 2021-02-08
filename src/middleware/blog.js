import {
    blogCreateRequest,
    blogCreateSuccess,
    blogCreateFailed,
    socialMediaRequest,
    socialMediaSuccess,
    socialMediaFailed,
    publishRequest,
    publishSuccess,
    publishFailed,
    getSocialMediaRequest,
    getSocialMediaSuccess,
    getSocialMediaFailed,
    getBlogListSuccess,
    getBlogListFailed,
    getBlogsRequest,
    deleteBlogSuccess,
    deleteBlogRequest,
    deleteBlogFailed,
    getBlogRequest,
    getBlogSuccess
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
import _ from 'lodash';
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

export const createBlog = (data,id) => {
    return async(dispatch) => {
        dispatch(blogCreateRequest())
        if(data.imageUrl && !data.imageUrl.match('^(http|https)://')){
            const file = dataURLtoFile(data.imageUrl,uId()+'.png')
            data[ 'imageUrl' ] = await imageUpload(file);
        }
        const route = JSON.parse(getItem('sessionData'))?.data?.data?.site?.route;
        data[ 'slug' ] = await checkAvailbleSlug(route,data)
        if(id){
            strapiAxiosInstance.put(`${ route }/${ id }`, data).then((response)=>{
                history.push(ROUTES.BLOGS)
                dispatch(blogCreateSuccess(response))
                notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.BLOG_UPDATE);
            }).catch((error) => {
                dispatch(blogCreateFailed(error))
                notification(NOTIFICATION_TYPES.ERROR, MESSAGE.BLOG_FAILD);
            })
        }else{
            strapiAxiosInstance.post(route, data).then((response)=>{
                history.push(ROUTES.BLOGS)
                dispatch(blogCreateSuccess(response))
                notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.BLOG_SUCCESS);
            }).catch((error) => {
                dispatch(blogCreateFailed(error))
                notification(NOTIFICATION_TYPES.ERROR, MESSAGE.BLOG_FAILD);
            })

        }
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

export const createSocialMedia = (data, setOpenModal) => {
    const route = JSON.parse(getItem('sessionData'))?.data?.data?.site?.route;
    console.log(route,data)
    return async(dispatch) => {
        dispatch(socialMediaRequest())
        const result = await strapiAxiosInstance.get(route+'?type=social-media-links')
        if(_.isEmpty(result.data)){
            strapiAxiosInstance.post(route, data).then((response)=>{
                dispatch(socialMediaSuccess(response))
                setOpenModal(false)
            }).catch((error) => {
                dispatch(socialMediaFailed(error))
            })
        }else{
            const id = result.data && result.data[ 0 ].id
            strapiAxiosInstance.put(`${ route }/${ id }`, data).then((response)=>{
                dispatch(socialMediaSuccess(response))
                setOpenModal(false)
            }).catch((error) => {
                dispatch(socialMediaFailed(error))
            })
        }
    };
};

export const getSocialMedia = () => {
    const route = JSON.parse(getItem('sessionData'))?.data?.data?.site?.route;
    return async(dispatch) => {
        dispatch(getSocialMediaRequest())
        strapiAxiosInstance.get(route+'?type=social-media-links').then((response)=>{
            dispatch(getSocialMediaSuccess(response))
        }).catch((error) => {
            dispatch(getSocialMediaFailed(error))
        })
    };
};
export const getBlogs =  () => {
    return async(dispatch) => {
        try{
            dispatch(getBlogsRequest())
            const route = JSON.parse(getItem('sessionData'))?.data?.data?.site?.route;
            const result = await strapiAxiosInstance.get(`${ route }?type=blog`)
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

export const deleteBlog =  (id) => {
    return async(dispatch) => {
        try{
            dispatch(deleteBlogRequest())
            const route = JSON.parse(getItem('sessionData'))?.data?.data?.site?.route;
            const result = await strapiAxiosInstance.put(`${ route }/${ id }`, { deletedAt: new Date() })
            if([ 200,203 ].includes(result.status)){
                dispatch(deleteBlogSuccess())
                notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.BLOG_DELETED);
                history.push(ROUTES.BLOGS)
            }
        }catch(error){
            dispatch(deleteBlogFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG);
        }
    }
}

export const getBlogById =  (id) => {
    const route = JSON.parse(getItem('sessionData'))?.data?.data?.site?.route;
    return async(dispatch) => {
        dispatch(getBlogRequest())
        strapiAxiosInstance.get(route+'/'+id+'?type=blog').then((response) => {
            dispatch(getBlogSuccess(response.data))
        }).catch((error) => {
            history.push(ROUTES.BLOGS)
            console.log(error)
        })
    }
}