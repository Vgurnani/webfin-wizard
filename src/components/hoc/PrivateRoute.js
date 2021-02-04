/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isLoggedIn, getUser } from '../../utils/helpers'

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = getUser();
    return (
        <Route
            { ...rest }
            render={ (props) =>
                !isLoggedIn() ?
                    <Redirect
                        to={ {
                            pathname: '/login',
                            state: { from: props.location },
                        } }
                    /> : (!user.enabled ? (
                        <Redirect
                            to={ {
                                pathname: '/confirm-account',
                                state: { from: props.location },
                            } }
                        />
                    ) :  (
                        !user.test ?
                            <Redirect
                                to={ {
                                    pathname: '/assessment',
                                    state: { from: props.location },
                                } }
                            />
                            :
                            <Component { ...props } /> ))

            }
        />
    )
}
