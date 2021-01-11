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
    }
}