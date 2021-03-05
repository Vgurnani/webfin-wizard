import React from 'react'
import { ROUTES } from '../constants/appRoutes';
import _ from 'lodash';
import { getItem } from './cache';
export const addBodyClass = (pathname) =>{
    const path = pathname
    document.body.className = ''

    if(path === '/'){
        document.body.classList.add('light-bg');
    } else if(path === ROUTES.REGISTER){
        document.body.classList.add('blue-left');
        document.body.classList.add('no-footer');
    } else if(path === ROUTES.LOGIN){
        document.body.classList.add('no-footer');
    } else if(path === ROUTES.FORGET_PASSWORD){
        document.body.classList.add('blue-right');
        document.body.classList.add('no-footer');
    } else if(path === ROUTES.TERMS_CONDITIONS){
        document.body.classList.add('light-bg');
    } else if(path === ROUTES.PRIVACY_POLICY){
        document.body.classList.add('light-bg');
    } else if(path === '/404'){
        document.body.classList.add('light-bg');
    } else if(path === ROUTES.ASSESSMENT){
        document.body.classList.add('no-footer');
        document.body.classList.add('light-bg');
    } else if(path === ROUTES.CONFIRM_ACCOUNT){
        document.body.classList.add('blue-left');
        document.body.classList.add('no-footer');
    } else if(path === ROUTES.BLOG || path === ROUTES.USER_PROFILE || path === ROUTES.DASHBOARD || path === ROUTES.BLOGS || path === ROUTES.EDIT_SITE){
        document.body.classList.add('no-header');
        document.body.classList.add('no-footer');
    }else if(path.match('/blog')){
        document.body.classList.add('full-width-header');
        document.body.classList.add('no-footer');
    }
}

export const getUser = () => {
    return getItem('user') && JSON.parse(getItem('user'));
}

export const isLoggedIn = () => {
    const user = getUser();
    return user && Object.keys(user).length > 0 && user.constructor === Object;
}

export const getLabel = (value) => {
    return JSON.parse(value).label
}

export const isLoading = (state) => {
    const result = Object.keys(state)?.filter((item) => state[ item ].loading)
    return result?.length > 0
}

export const assessmentIntialValues = () =>{
    const result = sessionStorage.getItem('assessmentForm')
    return result ? JSON.parse(result) : {}
}

export const getSessionData = () => {
    return sessionStorage.sessionData && JSON.parse(sessionStorage.sessionData).data?.data
}

export const togglePassword = (event) => {
    const show = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.12 14.12C13.8454 14.4147 13.5141 14.6511 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1961C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4858 9.58525 10.1546 9.88 9.87999M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68189 3.96914 7.6566 6.06 6.05999L17.94 17.94ZM9.9 4.23999C10.5883 4.07887 11.2931 3.99833 12 3.99999C19 3.99999 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19L9.9 4.23999Z" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>`
    const hide = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.12 14.12C13.8454 14.4147 13.5141 14.6511 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1961C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4858 9.58525 10.1546 9.88 9.87999M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68189 3.96914 7.6566 6.06 6.05999L17.94 17.94ZM9.9 4.23999C10.5883 4.07887 11.2931 3.99833 12 3.99999C19 3.99999 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19L9.9 4.23999Z" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1 1L23 23" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>`
    const input = event.currentTarget.parentElement?.firstChild
    event.currentTarget.innerHTML= input.type === 'text' ? hide : show;
    input.type = input.type === 'text' ? 'password' : 'text'

}

export const createFileFromUrl = async(url,id) => {
    const response = await fetch(url);
    const data = await response.blob();
    const metadata = {
        type: 'image/jpeg'
    };
    const file = new File([ data ], `${ id }.jpg`, metadata);
    return file
}

export const bytesToSize = (bytes) =>  {
    var sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB' ];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[ i ];
}

export const assessmentSaved = (step,values) => {
    let assessment = sessionStorage.getItem('assessmentForm')
    assessment =  assessment ? JSON.parse(assessment) : {}
    switch(step){
    case 'step1':
        return !_.isEmpty(assessment?.niche) && assessment.niche === values?.niche
    case 'step2':
        return !_.isEmpty(assessment?.colors) && assessment.colors === values?.colors
    case 'step3':
        return !_.isEmpty(assessment?.websiteName) && assessment.websiteName === values?.websiteName
    default:
        return false
    }

}

export const queryStringToObject = (queryString) => {
    const pairs = queryString.substring(1).split('&');
    var array = pairs.map((el) => {
        const parts = el.split('=');
        return parts;
    });
    return Object.fromEntries(array);
}

export const dataURLtoFile = (dataurl,filename) => {
    const arr = dataurl.split(',');
    const mime = arr[ 0 ].match(/:(.*?);/) && arr[ 0 ].match(/:(.*?);/)[ 1 ];
    if(mime){
        const bstr = atob(arr[ 1 ]);
        let num = bstr.length;
        const u8arr = new Uint8Array(num);
        while(num --){
            u8arr[ num ] = bstr.charCodeAt(num);
        }

        return new File([ u8arr ], filename, { type:mime });
    }
    return null

}

export const getRoute = () =>{
    const sites =  JSON.parse(getItem('sessionData'))?.data?.data?.sites[ 0 ]
    return sites?.route
}
export const uId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random()*16|0, v = c === 'x' ? r : ((r&(0x3))|(0x8));
        return v.toString(16);
    });
}

export const dataUrlToBase64 = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

export const getIdFromPath = (path) => {
    var regex = /\d+/g;
    return  path.match(regex) && path.match(regex)[ 0 ];
}

export const getSlugFromPath = (path = '') => {
    const pathData = path?.split('/blogs/');
    return  pathData.length ? pathData[ 1 ] : null;
}

export const getDomain = (sites) =>{
    const site =  (sites && sites[ 0 ]) || JSON.parse(getItem('sessionData'))?.data?.data?.sites[ 0 ]
    return site?.domain
}

export const getSite = (sites) =>{
    return (sites && sites[ 0 ]) || JSON.parse(getItem('sessionData'))?.data?.data?.sites[ 0 ];
}

export const headerLinksTemplate = () => {
    let links = [ { name: 'Home', url: '#' },{ name: 'Blog', url: '#' },{ name: 'About', url: '#' },{ name: 'Contact', url: '#' } ]
    links = links.map((item, index) => <a key={ index } href='#'>{ item.name }</a>)
    return links
}
export const debounce =( callback,event, delay ) => {
    const timeout = setTimeout(() => {
        callback(event)
    }, delay );
    return () => {
        clearTimeout( timeout );
    }

}

export const absoluteValue = (value) => {
    return value < 0 ? 0 : value
}