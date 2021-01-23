import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import { ROUTES } from '../../../constants/appRoutes';
import { NOTIFICATION_TYPES } from '../../../constants/app';
import { notification } from '../../../services/notification';
import { createAssessment } from '../../../middleware/assessments'
const RedirectAuth = () => {
    const router = useRouter();
    const dispatch  = useDispatch();
    let queryParams = router.query;

    useEffect(()=> {
        let queryData = {... queryParams}
        
        if (queryData?.token?.length) {
            const needFillAssessment = queryData.test === 'false'
            Cookies.set('user', JSON.stringify({accessToken: queryData.token,enabled: true, needFillAssessment: needFillAssessment}))
            if(!needFillAssessment){
                router.push(ROUTES.DASHBOARD)
                notification(NOTIFICATION_TYPES.SUCCESS, 'Login Successfully');
            }else if(localStorage.getItem('assessmentForm') && checkValidAssessmentData()){
                dispatch(createAssessment(JSON.parse(localStorage.assessmentForm)))
            }else{
                router.push(ROUTES.ASSESSMENT)
                notification(NOTIFICATION_TYPES.SUCCESS, 'Please fill assessment');
            }
            
           
        } else if (queryData?.error?.length){
            let errorMessage = 'Login error: ' + queryData.error;
            router.push(ROUTES.LOGIN)
            notification(NOTIFICATION_TYPES.ERROR, errorMessage);
        }
    },[queryParams]);

    const checkValidAssessmentData = () =>{
        const assessmentForm = JSON.parse(localStorage.getItem('assessmentForm'))
        return assessmentForm.nicheId && assessmentForm.colourId && assessmentForm.websiteName
    }

    return(
        <section className="login-section main-section">
            <Container>
                Hi this is redirect page.
            </Container>
        </section>
    )
}

export default RedirectAuth;
