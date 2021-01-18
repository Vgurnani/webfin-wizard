import React from 'react'
import withPrivateRoute from '../../components/hoc/withPrivateRoute'
const Dashboard =(props) => {

    return(
        <section className="main-section">
            <section className="page-section"></section>
        </section>
    )
}

export default withPrivateRoute(Dashboard)