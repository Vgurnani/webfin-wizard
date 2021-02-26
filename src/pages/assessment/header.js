import React from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import webFinLogo from 'images/header/webFin-logo.svg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    AssesmentNextButton,
} from '../../utils/svg';
const AssessmentHeader = (props) => {
    const { valid, prevPage , isFinalScreen, onSubmit } = props
    return (
        <header className={ 'main-header' }>
            <Container>
                <Row className="header-top assesment-header">
                    <Col className="header-logo">
                        <div className="navbar-brand">
                            <Link to={ '/' } className="navbar-item" title="Logo">
                                <img src={ webFinLogo } alt="WebFin" />
                            </Link>
                        </div>
                    </Col>
                    <Col className="assesment-left-btns">
                        <div className="step-btns step-btns-left">
                            <div className="step-btn">
                                { prevPage && <Button onClick={ prevPage } type="button" variant="secondary" >
                                    Back
                                </Button> }
                            </div>
                        </div>
                    </Col>

                    <Col className="assesment-right-btns">
                        <div className="step-btns step-btns-right">
                            <div className="step-btn">
                                <span>
                                    { valid  ?
                                        <Button type="submit" onClick={ onSubmit }  variant="primary">
                                            { isFinalScreen ? 'Finish!': 'Next' }
                                        </Button>
                                        :
                                        <Button type="button" disabled={ true } variant="primary">
                                            Next
                                        </Button>}
                                </span>
                                <span className="enter-btn">
                                    <a>
                                        Click next to proceed
                                        <AssesmentNextButton />
                                    </a>
                                </span>
                            </div>
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