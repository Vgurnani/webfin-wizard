import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../middleware/auth'
import { removeItem } from '../../utils/cache'
import Dashboard from '../../components/dashboard'
import axios from 'axios'

const DashboardPage =() => {
    const dispatch = useDispatch();
    const [ status, setStatus ] = useState(false)
    const data = useSelector(state => state.user.sessionData?.data?.data)
    const user =  data?.user
    const site =  data?.sites[ 0 ]
    var timeoutData = null;
    useEffect(() => {
        dispatch(getCurrentUser());
        removeItem('assessmentForm')
        dispatch({
            type: 'SET_ACTIVE_SIDEBAR',
            payload: 'dashboard'
        })
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

                <Dashboard status={ status } user={ user } site={ site }/>
            </section>
        </main>

    )
}
String.prototype.toUsername = function(){
    return this?.split('@') && this?.split('@')[ 0 ];
}
export default DashboardPage