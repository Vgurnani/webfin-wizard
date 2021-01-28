import React, { useState } from 'react'
import {Link }  from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import webFinLogo from '../../images/header/webFin-logo.svg';
import headerProfilePic from '../../images/media/media-1.jpg';
import { isLoggedIn } from '../../utils/helpers'
import { logoutUser } from '../../middleware/auth';
import { useDispatch } from 'react-redux'
import {
  NotificationIcon,
  ChevronRight,
} from '../../utils/svg';

const Navbar = (props) => {
  const dispatch  = useDispatch();
  const [ mobileHumberger, setMobileHumberger] = useState(false)
  const [ activeProfileNav ,setActiveProfileNav ] = useState(false)
  const [navBarActiveClass , setNavBarActiveClass] = useState('')
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
            <li className={`header-profile-img ${activeProfileNav ? 'active' : ''}`}>
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
            </li>
          </ul>
        )
      } else if(pathname !== '/forget-password' &&  pathname !== '/confirm-account'){
        return(
          <Link to="/login" className='btn btn-secondary'>
            login
          </Link>
        )
      }
    }
    return (
      <header className={`main-header ${btAction(pathname)}`}>
        <Container>     
          <Row className="header-top">
            <Col className="header-logo">
              <div className="navbar-brand">
                <a href="/" className="navbar-item" title="Logo">
                  <img src={webFinLogo} alt="WebFin" />                               
                </a>           
              </div>                                     
            </Col>
            <Col className="header-menu">
              <div class={`mobile-humberger ${mobileHumberger ? 'change' : ''}`} onClick={() => setMobileHumberger(!mobileHumberger)}>
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
              </div>
              <nav
                className="navbar is-transparent"
                role="navigation"
                aria-label="main-navigation"
              >
                <div
                  id="navMenu"
                  className={`navbar-menu ${navBarActiveClass}`}
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


export default (Navbar)
