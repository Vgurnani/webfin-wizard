import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../middleware/auth'
import { removeItem } from '../../utils/cache'
import Dashboard from '../../components/dashboard'
import axios from 'axios'
import {
    TopRightArrow,
} from '../../utils/svg'
import profilePic from '../../public/images/media/media-4.jpg';
const DashboardPage =() => {
    const dispatch = useDispatch();
    const [ status, setStatus ] = useState(false)
    const data = useSelector(state => state.user.sessionData?.data?.data)
    const user =  data?.user
    const site =  data?.sites[ 0 ]
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
        site?.domain && checkDomainStatus(`https://${ site?.domain }`)
        timeoutData = site?.domain && setInterval(function(){
            checkDomainStatus(`https://${ site?.domain }`)
        },30000)
        return () =>{
            clearInterval(timeoutData)
        }
    },[ site?.domain ])
    return(
        <main className="dashboard-data">
            <section className="dashboard-body">
                <div className="dashboard-header">
                    <div className="dashboard-title">
                        <h1>{ site?.websiteName } <a>Edit</a></h1>
                        <h5>
                            Domain:
                            <a href={ `https://${ site?.domain }` } rel="noreferrer" target='_blank' className={ `${ status ? 'success' : 'in-progress' }` }>
                                { site?.domain } <TopRightArrow />
                            </a>

                            {/* <span className={ `${ status ? 'success' : 'in-progress' }` }> -
                                {status ? 'Done' : 'In Progress'}
                            </span> */}
                        </h5>
                        <div className="dashboard-btns">
                            <a href={ `https://${ site?.domain }` } rel="noreferrer" target='_blank' className="btn btn-primary">View Website</a>
                        </div>
                    </div>
                    <div className="dashboard-actions">
                        { user && <div className="author-info">
                            <div className="author-img">
                                <img src={ profilePic } alt="Jason Miller" />
                            </div>
                            <div className="author-name">
                                <h6>Welcome back!</h6>
                                <h5>{user.firstName} {user.lastName}</h5>
                            </div>
                        </div> }
                    </div>
                </div>
                <Dashboard />
            </section>
        </main>

    )
}

export default DashboardPage