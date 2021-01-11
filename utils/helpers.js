export const addBodyClass = (pathname) =>{
    const path = pathname?.replace('/','')
    document.body.className = ''
    document.body.classList.add(path ==='' ? 'homepage' : path);
    if(path === 'register'){
        document.body.classList.add('blue-left');
        document.body.classList.add('no-footer');
    }else if(path === 'forget-password'){
        document.body.classList.add('blue-right');
        document.body.classList.add('no-footer');
    } else if(path === 'login'){
        document.body.classList.add('no-footer');
    } else if(path === ''){
        document.body.classList.add('light-bg');
    }
}