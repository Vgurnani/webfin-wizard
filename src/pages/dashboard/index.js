import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../middleware/auth'
// import withPrivateRoute from '../../components/hoc/withPrivateRoute';

const Dashboard =(props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.sessionData)
    useEffect(() => {
        dispatch(getCurrentUser());
    }, []);

    useEffect(() => {
        console.log(user, "user")
    }, [user]);

    return(
        <section className="main-section">
            <section className="page-section">Dashboard: <button href='#' className="btn btn-primary">View Website</button></section>
        </section>
    )
}

export default Dashboard