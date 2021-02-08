import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../middleware/auth'
import { removeItem } from '../../utils/cache'
import { Link } from 'react-router-dom'
import Dashboard from '../../components/dashboard'
import axios from 'axios'

const DashboardPage =() => {
    const dispatch = useDispatch();
    const [ status, setStatus ] = useState(false)
    const data = useSelector(state => state.user.sessionData?.data?.data)
    var timeoutData = null;
    useEffect(() => {
        removeItem('assessmentForm')
        dispatch({
            type: 'SET_ACTIVE_SIDEBAR',
            payload: 'dashboard'
        })
        dispatch(getCurrentUser());
        return () =>{
            clearInterval(timeoutData)
        }
    }, [  ]);
    const checkDomainStatus = async(domain) => {
        try{
            const domainData = await axios.get(domain)
            if(domainData.status === 200){
                setStatus(true)
                clearInterval(timeoutData)
            }
        // eslint-disable-next-line no-empty
        }catch(err){

        }
    }
    useEffect(() =>{
        data?.site?.domain && checkDomainStatus(`https://${ data?.site?.domain }`)
        timeoutData = data?.site?.domain && setInterval(function(){
            checkDomainStatus(`https://${ data?.site?.domain }`)
        },30000)
        return () =>{
            clearInterval(timeoutData)
        }
    },[ data?.site?.domain ])
    const user = data?.user
    return(
        <main className="dashboard-data">
            <section className="dashboard-body">
                <div className="dashboard-header">
                    <div className="dashboard-title">
                        <h5>
                            Your website name<br/>

                            <a href={ `https://${ data?.site?.domain }` } rel="noreferrer" target='_blank'>
                                { data?.site?.domain }
                            </a>

                            <span className={ `${ status ? 'success' : 'in-progress' }` }> -
                                {status ? 'Done' : 'In Progress'}
                            </span>

                        </h5>

                        <h1>Dashboard</h1>

                    </div>
                    <div className="dashboard-actions">
                        { user && <div>
                            {user.firstName} {user.lastName}
                        </div>}
                        <Link to={ '/blog' } className='btn btn-primary'>Create Blog</Link>
                    </div>
                </div>
                <Dashboard />
            </section>
        </main>

    )
}

export default DashboardPage