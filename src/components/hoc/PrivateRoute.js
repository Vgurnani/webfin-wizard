import React from "react"
import { Route, Redirect } from "react-router-dom"
import { getItem } from "../utils/cache"

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const savedUser = getItem("user")
  const isLoggedIn = savedUser && JSON.parse(savedUser || {}) && JSON.parse(savedUser || {}).access_token
  const isOnBoardingCompleted = getItem('isOnBoardingCompleted')

  const renderSessionComponent = (props) => {
    if (props.location.pathname === '/on-boarding' || isOnBoardingCompleted === 'true') {
      return <Component {...props} />
    } else {
      return <Redirect
        to={{
          pathname: '/on-boarding',
          state: { from: props.location },
        }}
      />
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn
          ? renderSessionComponent(props)
          : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
      }
    />
  )
}
