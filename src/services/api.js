/* eslint-disable no-undef */
import axios from 'axios'
import { NOTIFICATION_TYPES } from '../constants/app';
import { notification } from './notification';
import { getUser } from '../utils/helpers';
const baseUrl = `${process.env.REACT_APP_API_URL}/v1`;

const axiosInstance =  axios.create({
    baseURL: baseUrl,
    withCredentials: false,
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})
axiosInstance.interceptors.request.use(function (config) {
    const token = getUser() && getUser().accessToken;
    config.headers.Authorization =  token ? `Bearer ${ token }` :  null ;
    return config;
});

axiosInstance.interceptors.response.use((response) => {
    if (response.data && response.data.error) {
        return Promise.reject(response);
    }
    return response;
}, (error) => {
    if (!error.response) {
        notification(NOTIFICATION_TYPES.ERROR, error.message)
        return Promise.reject(error);
    }

    return Promise.reject(error);
});

export default axiosInstance;
