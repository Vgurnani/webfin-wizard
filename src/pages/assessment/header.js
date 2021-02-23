import React from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import webFinLogo from 'images/header/webFin-logo.svg';
import { Link } from 'react-router-dom';
import enterIcon from '../../public/images/enter-icon.png';
import PropTypes from 'prop-types';

const AssessmentHeader = (props) => {
    const { valid, prevPage , isFinalScreen, onSubmit } = props
    return (
        <header style={ { height: '70pt' } } className={ 'main-header' }>
            <Container>
                <Row className="header-top">
                    <Col>
                        { prevPage && <Button onClick={ prevPage } type="button" variant="secondary" >
                            Back
                        </Button> }
                    </Col>
                    <Col className="header-logo" style={ { textAlign: 'center' } }>
                        <div className="navbar-brand">
                            <Link to={ '/' } className="navbar-item" title="Logo">
                                <img src={ webFinLogo } alt="WebFin" />
                            </Link>
                        </div>
                    </Col>
                    <Col>
                        <div className="step-btn" style={ { float: 'right' } }>
                            <span>
                                { valid  ?
                                    <Button type="button" onClick={ onSubmit }  variant="primary">
                                        { isFinalScreen ? 'Finish!': 'Next' }
                                    </Button>
                                    :
                                    <Button type="button" disabled={ true } variant="primary">
                                        Next
                                    </Button>}
                            </span>
                            <br/>
                            <span className="enter-btn">
                                <a>
                                    Click next to proceed
                                    <img src={ enterIcon } alt="Enter" />
                                </a>
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

AssessmentHeader.propTypes = {
    valid: PropTypes.bool,
    prevPage: PropTypes.func,
    isFinalScreen: PropTypes.any,
    onSubmit: PropTypes.func
}

export default AssessmentHeader