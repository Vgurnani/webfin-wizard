import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../middleware/auth'
import { removeItem } from '../../utils/cache'
import { Link } from 'react-router-dom'
 const Dashboard =(props) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.user.sessionData?.data?.data)
    useEffect(() => {
        removeItem('assessmentForm')
        dispatch(getCurrentUser());
    }, []);


    return(
        <section className="main-section">
            <section className="page-section">Dashboard: <a href={`https://${data?.site?.domain}`} target='_blank'>{ data?.site?.domain }</a></section>
            
            <Link to={'/blog'} className='btn btn-primary'>Create Blog</Link>
        </section>
    )
}

export default Dashboard