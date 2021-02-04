/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn, getUser } from '../../utils/helpers'
export const PublicRoute = ({ component: Component, ...rest }) => {
    const user = getUser()
    return (
        <Route
            exact={ true }
            { ...rest }
            render={ (props) =>
                isLoggedIn() ? (user.enabled ? (
                    <Redirect
                        to={ {
                            pathname: '/dashboard',
                            state: { from: props.location },
                        } }
                    />
                ) :  <Redirect
                    to={ {
                        pathname: '/confirm-account',
                        state: { from: props.location },
                    } }
                />): (
                    <Component { ...props } />
                )
            }
        />
    )
}
