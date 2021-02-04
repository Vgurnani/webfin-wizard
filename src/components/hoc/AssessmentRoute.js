/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';

import { getUser } from '../../utils/helpers'

export const AssessmentRoute = ({ component: Component, ...rest }) => {
    const user = getUser();
    return (
        <Route
            { ...rest }
            render={ (props) =>
                (
                    user && user.test ?
                        <Redirect
                            to={ {
                                pathname: '/dashboard',
                                state: { from: props.location },
                            } }
                        />
                        :
                        <Component { ...props } /> )

            }
        />
    )
}
AssessmentRoute.prototype = {
    component: PropTypes.Component,

}