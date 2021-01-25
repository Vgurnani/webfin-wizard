import React, { useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import { NOTIFICATION_TYPES } from '../../constants/app'
import {notification} from '../../services/notification'
import { isLoggedIn, getUser } from '../../utils/helpers'

export const RegisterRoute = ({ component: Component, ...rest }) => {
  const user = getUser()
  const assessment = localStorage.assessmentForm && JSON.parse(localStorage.assessmentForm);
  useEffect(() => {
    if(assessment?.nicheId && assessment?.colourId && assessment?.websiteName){
    }else{
        notification(NOTIFICATION_TYPES.ERROR, 'Please fill first assessment')
    }
  },[])

  const isAssessmentSubmit = () => {
    const assessment = localStorage.assessmentForm && JSON.parse(localStorage.assessmentForm);
    return (assessment?.nicheId && assessment?.colourId && assessment?.websiteName)
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? (user.enabled ? (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: props.location },
            }}
          />
        ) :  <Redirect
              to={{
                pathname: '/confirm-account',
                state: { from: props.location },
              }}
            />): (isAssessmentSubmit() ? 
            <Component {...props} /> :  <Redirect
            to={{
              pathname: '/assessment',
              state: { from: props.location },
            }}
          />
          )
      }
    />
  )
}








