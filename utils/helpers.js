import Cookies from 'js-cookie'
import { ROUTES } from '../constants/appRoutes';

export const addBodyClass = (pathname) =>{
    const path = pathname
    document.body.className = ''
    document.body.classList.add(path ==='' ? 'homepage' : path);

    if(path === ''){
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
    } else if(path === 'assessment'){
        document.body.classList.add('no-footer');
        document.body.classList.add('light-bg');
    }
}

export const getUser = () => {
    const user = Cookies.get('user') || '';
    return user && JSON.parse(user)
}

export const isLoggedIn = () => {
    const user = getUser();
    return Object.keys(user).length > 0 && user.constructor === Object;
}

export const getLabel = (data,value) => {
    return data.filter((item)=> item.value === value)[0]?.label
}

export const isLoading = (state) => {
    const result = Object.keys(state)?.filter((item) => state[item].loading)
    return result?.length > 0
}

