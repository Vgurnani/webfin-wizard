/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link }  from 'react-router-dom'
import PropTypes from 'prop-types';

import {
    Container,
    Row,
    Col,
    Dropdown
}
    from 'react-bootstrap';
import webFinLogo from '../../images/header/webFin-logo.svg';
import { isLoggedIn } from '../../utils/helpers'
import { logoutUser } from '../../middleware/auth';
import { useDispatch, useSelector } from 'react-redux'
import {
    ChevronRight,
    DashboardMenuIcon,
    BlogMenuIcon,
    EditSiteMenuIcon,
    MarketingMenuIcon,
    SupportMenuIcon,
} from '../../utils/svg';
import { ROUTES } from 'constants/appRoutes';
import profilePic from 'images/user-avatar.png';

const Navbar = (props) => {
    const dispatch  = useDispatch();
    const [ mobileHumberger, setMobileHumberger ] = useState(false)
    const data = useSelector(state => state.user.sessionData?.data?.data)
    const user =  data?.user
    const [ navBarActiveClass , setNavBarActiveClass ] = useState('')
    const btAction = (pathname) => {
        if(pathname === '/register'){
            return 'logo-right no-login';
        } else if(pathname === '/confirm-account'){
            return 'logo-right no-login';
        } else if(pathname === '/login'){
            return 'no-login';
        } else {
            return '';
        }

    }
    const logout = () => {
        dispatch(logoutUser())
    }
    const { pathname } = props
    const LinkView = () => {
        if(isLoggedIn()){
            return(
                <ul className="main-navigation">
                    <li>
                        <Link to="/dashboard">
                            <DashboardMenuIcon />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/blogs">
                            <BlogMenuIcon />
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link to="/edit-site">
                            <EditSiteMenuIcon />
                            Edit Site
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <MarketingMenuIcon />
                            Marketing
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <SupportMenuIcon />
                            Support
                        </Link>
                    </li>
                    <li className="header-profile-img">
                        <Dropdown >
                            <Dropdown.Toggle>
                                <span>
                                    <span className="nav-profile-pic">
                                        <img src={ profilePic } />
                                        <span className="notification-bubble">1</span>
                                    </span>
                                    <span className="dropdown-label">My Account</span>
                                </span>
                                <ChevronRight />
                            </Dropdown.Toggle>

                            <Dropdown.Menu menuAlign="right">
                                <Dropdown.Item>My Account</Dropdown.Item>
                                <Dropdown.Item>Log out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    {/* <li>
                        <a  href="#">All Sites</a>
                    </li>
                    <li>
                        <a  href="#">Domains</a>
                    </li>
                    <li>
                        <a  href="#">Support</a>
                    </li>
                    <li>
                        <a  href="#"><NotificationIcon /></a>
                    </li>
                    <li className="header-profile-img">

                        <Dropdown >
                            <Dropdown.Toggle>
                                <span className="nav-profile-pic">
                                    <img src={ user?.profileImageUrl || profilePic } alt={ user?.firstName } />
                                </span>
                                <ChevronRight />
                            </Dropdown.Toggle>

                            <Dropdown.Menu menuAlign="right">
                                <Dropdown.Item onClick={ () => history.push(ROUTES.USER_PROFILE) } >My Account</Dropdown.Item>
                                <Dropdown.Item onClick={ logout } >Log out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li> */}
                    {/* <li className={`header-profile-img ${activeProfileNav ? 'active' : ''}`}>
              <a href="javascript:void(0)" onClick={() => setActiveProfileNav(!activeProfileNav)}>
                <span className="nav-profile-pic">
                  <img src={headerProfilePic} alt="John" />
                </span>
                <ChevronRight />
              </a>
              <ul className="header-submenu">
                <li>
                <a href='javascript:void(0)' onClick={logout} >logout</a>
                </li>
              </ul>
            </li> */}
                </ul>
            )
        } else if(pathname !== '/forget-password' &&  pathname !== '/confirm-account'){
            return(
                <ul className="main-navigation">
                    <li>
                        <Link to="/login" className='btn btn-secondary'>
                            login
                        </Link>
                    </li>
                </ul>
            )
        }
    }
    return (
        <header className={ `main-header ${ btAction(pathname) }` }>
            <Container>
                <Row className="header-top">
                    <Col className="header-logo">
                        <div className="navbar-brand">
                            <Link to={ '/' } className="navbar-item" title="Logo">
                                <img src={ webFinLogo } alt="WebFin" />
                            </Link>
                        </div>
                    </Col>
                    <Col className="header-menu">
                        <div className={ `mobile-humberger ${ mobileHumberger ? 'change' : '' }` } onClick={ () => setMobileHumberger(!mobileHumberger) }>
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </div>
                        <nav
                            className="navbar is-transparent"
                            role="navigation"
                            aria-label="main-navigation"
                        >
                            <div
                                id="navMenu"
                                className={ `navbar-menu ${ navBarActiveClass }` }
                            >
                                <div className="">
                                    {LinkView()}
                                </div>
                            </div>
                        </nav>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}
Navbar.prototype = {
    pathname: PropTypes.string,
}
export default (Navbar)
