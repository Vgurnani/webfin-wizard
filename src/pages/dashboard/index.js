import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../middleware/auth'
import { removeItem } from '../../utils/cache'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  DashboardMenuIcon,
  EditSiteMenuIcon,
  BlogMenuIcon,
  MarketingMenuIcon,
  SubMenuIcon,
  Facebook,
  LinkedIn,
  Twitter,
  YouTube,
  Instagram,
  CloseIcon,
  SmallRadio,
  SmallRadioChecked,
  OpenArrow,
} from '../../utils/svg'
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
      <section className="dashboard-wrapper">
        <aside className="dashboard-menu">
          <ul>
            <li>
              <a href="/">
              Dashboard
                <DashboardMenuIcon />
              </a>
            </li>
            <li>
              <a href="/">
              Edit Site
                <EditSiteMenuIcon />
              </a>
            </li>
            <li className="active">
              <a href="/">
              Blog
                <BlogMenuIcon />
              </a>
              <ul className="sub-menu">
                <li>
                  <a>
                  All Posts
                  <SubMenuIcon />
                  </a>
                </li>
                <li>
                  <a>
                  Add new post
                  <SubMenuIcon />
                  </a>
                </li>
                <li>
                  <a>
                  Comments
                  <SubMenuIcon />
                  </a>
                </li>
                <li>
                  <a>
                  Import blog
                  <SubMenuIcon />
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/">
              Marketing
                <MarketingMenuIcon />
              </a>
            </li>
          </ul>
        </aside>
        <main className="dashboard-data">
          <section className="dashboard-body">
            <div className="dashboard-header">
              <div className="dashboard-title">
                <h1>Dashboard</h1>
                <h5>
                  Domain:  
                  <a href={`https://${data?.site?.domain}`} target='_blank'>
                    { data?.site?.domain }
                  </a> 
                  <span className={`${status ? 'success' : 'in-progress'}`}> - 
                    {status ? "Done" : "In Progress"}
                  </span>
                </h5>
              </div>
              <div className="dashboard-btns">
                <Link to={'/blog'} className='btn btn-primary'>Create Blog</Link>
              </div>
              
            </div>
          
            
          
            
          </section>
        </main>
      </section>
        
    )
}

export default Dashboard