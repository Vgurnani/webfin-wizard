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
                        <h1>Your website name <a>Edit</a></h1>
                        <h5>
                            <a href={ `https://${ data?.site?.domain }` } rel="noreferrer" target='_blank' className={ `${ status ? 'success' : 'in-progress' }` }>
                                { data?.site?.domain } <TopRightArrow />
                            </a>

                            {/* <span className={ `${ status ? 'success' : 'in-progress' }` }> -
                                {status ? 'Done' : 'In Progress'}
                            </span> */}
                        </h5>
                        <div className="dashboard-btns">
                            <a className="btn btn-primary">View Website</a>
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