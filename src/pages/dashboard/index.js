import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../middleware/auth'
import { removeItem } from '../../utils/cache'
import { Link } from 'react-router-dom'
import axios from 'axios'
 const Dashboard =(props) => {
    const dispatch = useDispatch();
    const [status, setStatus ] = useState(false)
    const data = useSelector(state => state.user.sessionData?.data?.data)
    var timeoutData = null;
    useEffect(() => {
        removeItem('assessmentForm')
        dispatch(getCurrentUser());
        return () =>{
          clearInterval(timeoutData)
        }
    }, [  ]);


    useEffect(() =>{
      data?.site?.domain && checkDomainStatus(`https://${data?.site?.domain}`)
      timeoutData = data?.site?.domain && setInterval(function(){
        checkDomainStatus(`https://${data?.site?.domain}`)
      },30000)
      return () =>{
        clearInterval(timeoutData)
      }
    },[data?.site?.domain])


    const checkDomainStatus = async(domain) => {
      try{
        const data = await axios.get(domain)
        if(data.status === 200){
          setStatus(true)
          clearInterval(timeoutData)
        }
      }catch(err){
      }
    }



    return(
        <section className="main-section">
            <section className="page-section">Dashboard: <a href={`https://${data?.site?.domain}`} target='_blank'>{ data?.site?.domain }</a>{status ? "Done" : 'In progress'}</section>
            <Link to={'/blog'} className='btn btn-primary'>Create Blog</Link>
        </section>
    )
}

export default Dashboard