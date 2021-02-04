/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Footer from './Footer'
import SideBar from './Sidebar'
import Navbar from './Navbar'
import { addBodyClass, isLoading } from '../../utils/helpers'
import Loader from  '../../components/core/loader'
import { isLoggedIn } from '../../utils/helpers'
const TemplateWrapper = (props) => {
    const stateData = useSelector((state)=> state);
    const pathname = props.location.pathname
    useEffect(()=> {
        addBodyClass(pathname)
    },[ pathname ])

    const isSideBar = () => {
        if(isLoggedIn()){
            return pathname !== '/assessment' &&  pathname !== '/confirm-account'
        }
        return false
    }
    return (
        <div>
            <Loader isLoading={ isLoading(stateData) } />
            <Navbar pathname={ pathname } />
            { isSideBar() ?
                <section className="dashboard-wrapper">
                    <SideBar />{props.children}
                </section> : <div>{props.children}</div> }
            <Footer />
        </div>
    )
}

export default withRouter(TemplateWrapper)
