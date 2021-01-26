import {
    blogCreateRequest
} from '../actions/blog';
import strapiAxiosInstance from '../services/strapiApi';
import { getItem } from '../utils/cache';

export const createBlog = (data) => {
    return (dispatch) => {
        dispatch(blogCreateRequest())
        const route = JSON.parse(getItem('sessionData'))?.data?.data?.site?.route;
        strapiAxiosInstance.post(route, data).then((response)=>{
            console.log(response, "response")
        }).catch((error) => {
            console.log("Error", error)
        })
    };
};