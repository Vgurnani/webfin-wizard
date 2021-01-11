import React, { useState } from 'react'
import Link  from 'next/link'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import webFinLogo from '../../assets/images/header/webFin-Logo.svg';

const Navbar = (props) => {
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


    const { pathname } = props

    const LinkView = () => {
      if(pathname !== '/register' && pathname !== '/login' && pathname !== '/forget-password'){
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
