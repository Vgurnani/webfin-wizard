import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router'

import { ROUTES } from '../../../constants/appRoutes';
import { NOTIFICATION_TYPES } from '../../../constants/app';
import { notification } from '../../../services/notification';

const RedirectAuth = () => {
    const router = useRouter()
    let queryParams = router.query;

    useEffect(()=> {
        let queryData = {... queryParams}
        if (queryData?.token?.length) {
            localStorage.setItem('token', queryData.token);
            router.push(ROUTES.DASHBOARD)
            notification(NOTIFICATION_TYPES.SUCCESS, 'Login Successfully');
        } else if (queryData?.error?.length){
            let errorMessage = 'Login error: ' + queryData.error;
            router.push(ROUTES.LOGIN)
            notification(NOTIFICATION_TYPES.ERROR, errorMessage);
        }
    },[queryParams]);

    return(
        <section className="login-section main-section">
            <Container>
                Hi this is redirect page.
            </Container>
        </section>
    )
}

export default RedirectAuth;
