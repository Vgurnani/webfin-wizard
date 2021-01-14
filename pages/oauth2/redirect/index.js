import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Router, { useRouter } from 'next/router'

const RedirectAuth = (props) => {    
    const router = useRouter()
    let queryParams = router.query;
    console.log('path detail', router.query);
        
    useEffect(()=> {
        let queryData = {... queryParams}
        console.log('111', queryData);
            if(queryData.token && queryData.token !== undefined && queryData.token !== null){
                localStorage.setItem('token', queryData.token);
                Router.push('/')
                // alert('token present')
            }else if (queryData.error && queryData.error !== undefined && queryData.error !== null){
                let errorMessage = 'Login error: ' + queryData.error;
                alert(errorMessage);
            }
        },[queryParams])
    return(
        <section className="login-section main-section">
        <Container>
           Hi this is redirect page.
        </Container>
        </section>
    )
}

export default RedirectAuth;
