import React, { useState } from 'react'
import Link  from 'next/link'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import webFinLogo from '../../assets/images/header/webFin-Logo.svg';
import { isLoggedIn } from '../../utils/helpers'
import { logoutUser } from '../../actions/user/auth';
import { useDispatch } from 'react-redux'

const Navbar = (props) => {
  const dispatch  = useDispatch();
  const [active , setActive] = useState(false)
  const [navBarActiveClass , setNavBarActiveClass] = useState('')
  const btAction = (pathname) => {
    if(pathname === '/register'){
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
        return<button className="btn btn-secondary" onClick={logout} >logout</button>
      }
      else if(pathname === '/'){
        return(<Link  href="/login">
          <a className="btn btn-secondary">login</a>
        </Link>)
      }else{
        return null
      }
       
    }
    return (
      <header className={`main-header ${btAction(pathname)}`}>
        <Container>     
          <Row className="header-top">
            <Col className="header-logo">
              <div className="navbar-brand">
                <Link href="/" className="navbar-item" title="Logo">
                  <img src={webFinLogo} alt="WebFin" />                               
                </Link>           
              </div>                                     
            </Col>
            <Col className="header-menu">
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


export default Navbar
