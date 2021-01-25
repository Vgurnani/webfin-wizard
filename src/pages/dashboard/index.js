import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../middleware/auth'
import Layout from '../../components/shared/Layout';
import { ROUTES } from '../../constants/appRoutes';
const Dashboard =(props) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.user.sessionData?.data?.data)
    useEffect(() => {
        dispatch(getCurrentUser());
    }, []);


    return(
        <Layout className="main-layout" pathname={ ROUTES.DASHBOARD }>
        <section className="main-section">
            <section className="page-section">Dashboard: <a href={`https://${data?.site?.domain}`} target='_blank'>{ data?.site?.domain }</a></section>
            
        </section>
        </Layout>
    )
}

export default Dashboard