import React, { useEffect } from "react"
import { Route, Redirect , withRouter} from "react-router-dom"
import { NOTIFICATION_TYPES } from '../../constants/app'
import {notification} from '../../services/notification'
import { isLoggedIn, getUser } from '../../utils/helpers'

 const RegisterRoute = ({ component: Component, ...rest }) => {
  const user = getUser()
  const assessment = sessionStorage.assessmentForm && JSON.parse(sessionStorage.assessmentForm);
  useEffect(() => {
    if(rest.location.pathname === '/register' && !(assessment?.nicheId && assessment?.colourId && assessment?.websiteName && assessment?.domain)){
        notification(NOTIFICATION_TYPES.ERROR, 'Please fill first assessment')
    }
  },[])

  const isAssessmentSubmit = () => {
    const assessment = sessionStorage.assessmentForm && JSON.parse(sessionStorage.assessmentForm);
    return (assessment?.nicheId && assessment?.colourId && assessment?.websiteName && assessment?.domain)
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
export default withRouter(RegisterRoute);







