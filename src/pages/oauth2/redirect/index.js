import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import history from '../../../utils/history'
import { ROUTES } from '../../../constants/appRoutes';
import { NOTIFICATION_TYPES } from '../../../constants/app';
import { notification } from '../../../services/notification';
import { createAssessment } from '../../../middleware/assessments';
import { setItem } from '../../../utils/cache';
import { queryStringToObject } from '../../../utils/helpers'

const RedirectAuth = (props) => {
    const dispatch  = useDispatch();

    useEffect(()=> {
        let queryData = queryStringToObject(props.history.location.search)
        if (queryData?.token?.length) {
            const test = queryData.test === 'true'
            setItem('user', {accessToken: queryData.token,enabled: true, test: test});
            if(test){
                history.push(ROUTES.DASHBOARD)
                notification(NOTIFICATION_TYPES.SUCCESS, 'Login Successfully');
            }else if(sessionStorage.getItem('assessmentForm') && checkValidAssessmentData()){
                dispatch(createAssessment(JSON.parse(sessionStorage.assessmentForm)))
            }else{
                history.push(ROUTES.ASSESSMENT)
                notification(NOTIFICATION_TYPES.SUCCESS, 'Please fill assessment');
            }


        } else if (queryData?.error){
            let errorMessage = 'Login error: ' + queryData.error;
            history.push(ROUTES.LOGIN)
            notification(NOTIFICATION_TYPES.ERROR, 'Something went wrong please try again');
        }
    },[props.history.location.search]);

    const checkValidAssessmentData = () =>{
        const assessmentForm = JSON.parse(sessionStorage.getItem('assessmentForm'))
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

export default withRouter(RedirectAuth);
