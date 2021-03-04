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
    getDraftBlogListSuccess,
    getPublishBlogListSuccess,
    getBlogListFailed,
    getBlogsRequest,
    deleteBlogSuccess,
    deleteBlogRequest,
    deleteBlogFailed,
    getBlogRequest,
    allBlogsCountSuccess,
    getBlogSuccess
} from '../actions/blog';
import strapiAxiosInstance from '../services/strapiApi';
import axiosInstance from '../services/api';
import { getItem } from '../utils/cache';
import { ROUTES } from '../constants/appRoutes';
import { NOTIFICATION_TYPES,MESSAGE, BLOG_STATUS } from '../constants/app';
import { notification } from '../services/notification';
import history from '../utils/history'
import { imageUpload } from './assessments'
import { dataURLtoFile , uId, getRoute, getSite } from '../utils/helpers'

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

export const createNewBlog = (domain,data,id, slug) => {
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
            }).catch((error) => {
                dispatch(blogCreateFailed(error))
                notification(NOTIFICATION_TYPES.ERROR, MESSAGE.BLOG_FAILD);
            })
        }else{
            strapiAxiosInstance.post(route, data).then((response)=>{
                history.push(ROUTES.BLOGS)
                dispatch(blogCreateSuccess(response))
            }).catch((error) => {
                dispatch(blogCreateFailed(error))
                notification(NOTIFICATION_TYPES.ERROR, MESSAGE.BLOG_FAILD);
            })

        }
    };
};

export const createBlog = (domain,data,id) => {
    return async(dispatch) => {
        dispatch(blogCreateRequest())
        if(data.imageUrl && !data.imageUrl.match('^(http|https)://')){
            const file = dataURLtoFile(data.imageUrl,uId()+'.png')
            data[ 'imageUrl' ] = await imageUpload(domain,`blogs/${ data.slug }`,file);
        }
        if(id){
            axiosInstance.put(`/posts/${ id }`, data).then((response)=>{
                history.push(ROUTES.BLOGS)
                dispatch(blogCreateSuccess(response))
            }).catch((error) => {
                dispatch(blogCreateFailed(error))
                notification(NOTIFICATION_TYPES.ERROR, MESSAGE.BLOG_FAILD);
            })
        }else{
            axiosInstance.post('/posts', data).then((response)=>{
                history.push(ROUTES.BLOGS)
                dispatch(blogCreateSuccess(response))
            }).catch((error) => {
                dispatch(blogCreateFailed(error))
                notification(NOTIFICATION_TYPES.ERROR, MESSAGE.BLOG_FAILD);
            })

        }
    };
};

export const createSocialMedia = (id,data, setOpenModal) => {
    return async(dispatch) => {
        dispatch(socialMediaRequest())
        axiosInstance.put(`/assessment/${ id }`, data).then((response)=>{
            dispatch(socialMediaSuccess(response))
            setOpenModal(false)
        }).catch((error) => {
            dispatch(socialMediaFailed(error))
        })
    };
};

export const getDraftBlogs =  (args) => {
    return async(dispatch) => {
        try{
            const site = getSite();
            dispatch(getBlogsRequest())
            const result = await axiosInstance.get(`/site/${ site?.id }/posts?state=${ BLOG_STATUS.DRAFT }&${ args }`)
            if([ 200,203 ].includes(result.status)){
                dispatch(getDraftBlogListSuccess(result.data));
            }
        }catch(error){
            dispatch(getBlogListFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG);
        }
    }
}

// export const getPublishedNewBlogs =  (args) => {
//     return async(dispatch) => {
//         try{
//             dispatch(getBlogsRequest())
//             const route = getRoute();
//             const result = await strapiAxiosInstance.get(`${ route }?slug_ne=wizrd-welcome-blog&_sort=created_at:ASC&_publicationState=live&deletedAt_null=true&type=blog&${ args }`)
//             if([ 200,203 ].includes(result.status)){
//                 dispatch(getPublishBlogListSuccess(result.data));
//             }
//         }catch(error){
//             dispatch(getBlogListFailed(error))
//             notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG);
//         }
//     }
// }

export const getPublishedBlogs =  (args) => {
    return async(dispatch) => {
        try{
            const site = getSite();
            dispatch(getBlogsRequest())
            const result = await axiosInstance.get(`/site/${ site?.id }/posts?state=${ BLOG_STATUS.PUBLISHED }&${ args }`)
            if([ 200,203 ].includes(result.status)){
                dispatch(getPublishBlogListSuccess(result.data));
            }
        }catch(error){
            dispatch(getBlogListFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG);
        }
    }
}

export const allBlogsCount = () => {
    return async(dispatch) => {
        try{
            dispatch(getBlogsRequest())
            const route = getRoute();
            const publishBlogResult = await strapiAxiosInstance.get(`${ route }/count?slug_ne=wizrd-welcome-blog&_publicationState=live&deletedAt_null=true&type=blog`)
            const publishBlogCount = publishBlogResult.data
            const draftBlogResult =  await strapiAxiosInstance.get(`${ route }/count?slug_ne=wizrd-welcome-blog&_publicationState=preview&published_at_null=true&deletedAt_null=true&type=blog`)
            const draftBlogCount = draftBlogResult.data

            dispatch(allBlogsCountSuccess(publishBlogCount, draftBlogCount));

        }catch(error){
            dispatch(getBlogListFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG);
        }
    }
}
export const callPublish = (id,isPublish, publishArgs, draftArgs) => {
    return(dispatch) => {
        // eslint-disable-next-line camelcase
        const data = isPublish ? { status: BLOG_STATUS.PUBLISHED } : { status: BLOG_STATUS.DRAFT }
        dispatch(publishRequest())
        axiosInstance.put(`/posts/${ id }`, data).then((response)=>{
            dispatch(getDraftBlogs(draftArgs))
            dispatch(getPublishedBlogs(publishArgs))
            dispatch(publishSuccess(response))
            history.replace('/blogs')
        }).catch((error) => {
            dispatch(publishFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.BLOG_FAILD);
        })
    }
}

export const deleteBlog =  (id,draftArgs, publishArgs) => {
    return async(dispatch) => {
        try{
            dispatch(deleteBlogRequest())
            const result = await axiosInstance.delete(`/posts/${ id }`)
            if([ 200,203, 204 ].includes(result.status)){
                dispatch(deleteBlogSuccess())
                dispatch(getDraftBlogs(draftArgs))
                dispatch(getPublishedBlogs(publishArgs))
            }
        }catch(error){
            dispatch(deleteBlogFailed(error))
            notification(NOTIFICATION_TYPES.ERROR, MESSAGE.SOMETHING_WRONG);
        }
    }
}

export const getBlogById =  (id) => {
    return async(dispatch) => {
        dispatch(getBlogRequest())
        axiosInstance.get(`/posts/${ id }?type=blog`).then((response) => {
            dispatch(getBlogSuccess(response.data))
        }).catch(() => {
            history.push(ROUTES.BLOGS)
        })
    }
}
