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
    getDraftBlogListSuccess,
    getPublishBlogListSuccess,
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
import { dataURLtoFile , uId, getRoute } from '../utils/helpers'
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

export const createBlog = (domain,data,id, slug) => {
    return async(dispatch) => {
        dispatch(blogCreateRequest())
        const route = JSON.parse(getItem('sessionData'))?.data?.data?.sites[ 0 ]?.route;
        data[ 'slug' ] = (slug && id) ? slug :  await checkAvailbleSlug(route,data);
        if(data.imageUrl && !data.imageUrl.match('^(http|https)://')){
            const file = dataURLtoFile(data.imageUrl,uId()+'.png')
            data[ 'imageUrl' ] = await imageUpload(domain,`blogs/${ data.slug }`,file);
        }
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

export const createSocialMedia = (data, setOpenModal) => {
    const route = getRoute();
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
    const route = getRoute();
    return async(dispatch) => {
        dispatch(getSocialMediaRequest())
        strapiAxiosInstance.get(route+'?type=social-media-links').then((response)=>{
            dispatch(getSocialMediaSuccess(response))
        }).catch((error) => {
            dispatch(getSocialMediaFailed(error))
        })
    };
};
export const getDraftBlogs =  () => {
    return async(dispatch) => {
        try{
            dispatch(getBlogsRequest())
            const route = getRoute();
            const result = await strapiAxiosInstance.get(`${ route }?_publicationState=preview&published_at_null=true&deletedAt_null=true&type=blog`)
            if([ 200,203 ].includes(result.status)){
                const data = result.data.filter((item) => item.published_at === null && item.type === 'blog')
                dispatch(getDraftBlogListSuccess(data));
            }
        }catch(error){
            dispatch(getBlogListFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG);
        }
    }
}

export const getPublishedBlogs =  () => {
    return async(dispatch) => {
        try{
            dispatch(getBlogsRequest())
            const route = getRoute();
            const result = await strapiAxiosInstance.get(`${ route }?_publicationState=live&deletedAt_null=true&type=blog`)
            if([ 200,203 ].includes(result.status)){
                const data = result.data.filter((item) => item.published_at !== null)
                dispatch(getPublishBlogListSuccess(data));
            }
        }catch(error){
            dispatch(getBlogListFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG);
        }
    }
}

export const callPublish = (id,isPublish) => {
    const route = getRoute();
    return(dispatch) => {
        // eslint-disable-next-line camelcase
        const data = isPublish ? { published_at: new Date() } : { published_at: null }
        dispatch(publishRequest())
        strapiAxiosInstance.put(`${ route }/${ id }`, data).then((response)=>{
            dispatch(getDraftBlogs())
            dispatch(getPublishedBlogs())
            dispatch(publishSuccess(response))
        }).catch((error) => {
            dispatch(publishFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.BLOG_FAILD);
        })
    }
}

export const deleteBlog =  (id) => {
    return async(dispatch) => {
        try{
            dispatch(deleteBlogRequest())
            const route = getRoute();
            const result = await strapiAxiosInstance.put(`${ route }/${ id }`, { deletedAt: new Date() })
            if([ 200,203 ].includes(result.status)){
                dispatch(deleteBlogSuccess())
                dispatch(getDraftBlogs())
                dispatch(getPublishedBlogs())
                notification(NOTIFICATION_TYPES.SUCCESS, MESSAGE.BLOG_DELETED);
            }
        }catch(error){
            dispatch(deleteBlogFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG);
        }
    }
}

export const getBlogById =  (id) => {
    const route = getRoute();
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
