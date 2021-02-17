/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import history from '../../../utils/history'
import { ROUTES } from '../../../constants/appRoutes';
import { NOTIFICATION_TYPES } from '../../../constants/app';
import { notification } from '../../../services/notification';
import { createAssessment } from '../../../middleware/assessments';
import { setItem } from '../../../utils/cache';
import { queryStringToObject } from '../../../utils/helpers'
import { change as reduxChange } from 'redux-form'

const RedirectAuth = (props) => {
    const dispatch  = useDispatch();
    const form = useSelector((state) => state.form )
    console.log('form----',form)

    const checkValidAssessmentData = () =>{
        const assessmentForm = JSON.parse(sessionStorage.getItem('assessmentForm'))
        return assessmentForm.nicheId && assessmentForm.colors && assessmentForm.websiteName
    }
    debugger
    useEffect(()=> {
        const queryData = queryStringToObject(props.history.location.search)
        if (queryData?.token?.length) {
            const test = queryData.test === 'true'
            setItem('user', { accessToken: queryData.token,enabled: true, test: test });
            console.log('ddddddd---',sessionStorage.getItem('assessmentForm'), checkValidAssessmentData())

            if(test){
                history.push(ROUTES.DASHBOARD)
                notification(NOTIFICATION_TYPES.SUCCESS, 'Login Successfully');
            }else if(sessionStorage.getItem('assessmentForm') && checkValidAssessmentData()){
                const assessmentData = JSON.parse(sessionStorage.assessmentForm)
                assessmentData[ 'route' ] = queryData.route
                dispatch(createAssessment(assessmentData))
                history.push(ROUTES.DASHBOARD);
            }else{
                history.push(ROUTES.ASSESSMENT)
                dispatch(reduxChange('assessmentForm','route', queryData.route))
                notification(NOTIFICATION_TYPES.SUCCESS, 'Please fill assessment');
            }

        } else if (queryData?.error){
            history.push(ROUTES.LOGIN)
            notification(NOTIFICATION_TYPES.ERROR, 'Something went wrong please try again');
        }
    },[ props.history.location.search ]);

    return(
        <section className="login-section main-section">
            <Container>
                Hi this is redirect page.
            </Container>
        </section>
    )
}

export default withRouter(RedirectAuth);
