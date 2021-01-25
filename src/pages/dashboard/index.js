import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../middleware/auth'

const Dashboard =(props) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.user.sessionData?.data?.data)
    useEffect(() => {
        dispatch(getCurrentUser());
    }, []);


    return(
        <section className="main-section">
            <section className="page-section">Dashboard: <a href={`https://${data?.site?.domain}`} target='_blank'>{ data?.site?.domain }</a></section>
            
        </section>
    )
}

export default Dashboard