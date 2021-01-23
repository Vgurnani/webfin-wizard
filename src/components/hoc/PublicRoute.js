import React from "react"
import { Route, Redirect } from "react-router-dom"

import { getItem } from "../utils/cache"

export const PublicRoute = ({ component: Component, ...rest }) => {
  const savedUser = getItem("user")
  const isLoggedIn = savedUser && JSON.parse(savedUser || {}) && JSON.parse(savedUser || {}).access_token

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: props.location },
            }}
          />
        ) : (
            <Component {...props} />
          )
      }
    />
  )
}
