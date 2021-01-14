import Cookies from 'js-cookie'

export const addBodyClass = (pathname) =>{
    const path = pathname?.replace('/','')
    document.body.className = ''
    document.body.classList.add(path ==='' ? 'homepage' : path);

    if(path === ''){
        document.body.classList.add('light-bg');
    } else if(path === 'register'){
        document.body.classList.add('blue-left');
        document.body.classList.add('no-footer');
    } else if(path === 'login'){
        document.body.classList.add('no-footer');
    } else if(path === 'forget-password'){
        document.body.classList.add('blue-right');
        document.body.classList.add('no-footer');
    } else if(path === 'terms-conditions'){
        document.body.classList.add('light-bg');
    } else if(path === 'privacy-policy'){
        document.body.classList.add('light-bg');
    } else if(path === '404'){
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