import React, { useEffect, useState } from 'react'
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { renderStyleMultipleRadio, renderFieldWG ,renderFileDrop } from '../../utils/formUtils'
import { assessmentFormValidate as validate } from '../../utils/validates'
import { assessmentIntialValues } from '../../utils/helpers'
import enterIcon from '../../public/images/enter-icon.png';
import 
  {
    Form,
    Button,
    Container,
    Col,
    Row,
    Modal,
    ProgressBar
  }
from 'react-bootstrap';
import  Link from 'next/link'
import media1 from '../../public/images/media/media-1.jpg';
import media2 from '../../public/images/media/media-2.jpg';
import media3 from '../../public/images/media/media-3.jpg';
import media4 from '../../public/images/media/media-4.jpg';
import media5 from '../../public/images/media/media-5.jpg';
import media6 from '../../public/images/media/media-6.jpg';
import media7 from '../../public/images/media/media-7.jpg';
import media8 from '../../public/images/media/media-8.jpg';
import media9 from '../../public/images/media/media-9.jpg';
import media10 from '../../public/images/media/media-10.jpg';
const StepOne = (props) => {
    const { handleSubmit, kindOfBuild, saveData, initialize } = props;
    useEffect(()=>{
        initialize(assessmentIntialValues())
    },[])
    return(
        <div className="assesment-step assesment-step-1">
            <Row className="step-banner">
                <Col className="col-12">
                    <Container>
                        <Row className="back-to-home">
                            <Col className="col-12">
                                <a href="/">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5 18L9.5 12L15.5 6" stroke="white" strokeLinejoin="round"/>
                                    </svg>
                                    Back to Home 
                                </a>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12">
                                <h1>
                                Let’s start!
                                </h1>
                                {/* <p>
                                Answer some questions for us and we’ll build a website for you.
                                </p> */}
                            </Col>
                        </Row>
                    </Container>
                </Col> 
            </Row>
            <Row className="step-form">
                <Col className="col-12">
                    <Container>
                        <Form className="form" onSubmit={handleSubmit}>  
                            <div className="form-heading">   
                                <h2>
                                What kind you blog are you looking to build ?
                                </h2>
                            </div>
                            <div className="small-wrapper">
                            <Field
                                name="nicheId"
                                options={ kindOfBuild || []}
                                component={ renderStyleMultipleRadio }
                                defaultValue={ 'no' }
                                placeholder={ 'gaveCraving' }
                                className='styled-radio-btn'
                                imgWidth="30px"
                                isIcons={true}
                            />
                            </div>
                            <div className="step-btns">
                                <div className="step-btn-left">
                                  
                                </div> 
                                <div className="step-btn-right">
                                    <div className="step-btn">
                                        <Button type="button" onClick={saveData} variant="light" >
                                        Save  
                                        </Button>
                                    </div>
                                    <div className="step-btn">
                                        <span>
                                        <Button type="submit" variant="primary">
                                        Next
                                        </Button>
                                        </span>
                                        <span className="enter-btn">
                                            <a>
                                            or Press Enter
                                            <img src={enterIcon} alt="Enter" />
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <Modal show={true} className="logo-upload-modal">
								<Modal.Header closeButton>
                                    <div className="logo-upload-header">
                                        <Row>
                                            <Col className="col-6">
                                                <Modal.Title>Images</Modal.Title>
                                            </Col>
                                            <Col className="col-6 search-wrapper">
                                                <Field
                                                    name="search"
                                                    component={ renderFieldWG }
                                                    placeholder={ 'Search' }
                                                />
                                            </Col>
                                        </Row>
                                    </div>
								</Modal.Header>
								<Modal.Body>	
								
                                <div className="">
                                    <Row>
                                        <Col className="col-4">
                                            <Field
                                                name="logoUrl"
                                                component={ renderFileDrop }
                                                placeholder={"<a><i className='fa fa-plus'/> upload your logo</a>"}
                                            /> 
                                        </Col>
                                        <Col className="col-8">
                                            <div className="logo-gallery">
                                                <ul>
                                                    <li>
                                                        <img src={media1} alt="media1" />
                                                    </li>
                                                    <li>
                                                        <img src={media2} alt="media2" />
                                                    </li>
                                                    <li>
                                                        <img src={media3} alt="media3" />
                                                    </li>
                                                    <li class="selected">
                                                        <img src={media4} alt="media4" />
                                                    </li>
                                                    <li>
                                                        <img src={media5} alt="media5" />
                                                    </li>
                                                    <li>
                                                        <img src={media6} alt="media6" />
                                                    </li>
                                                    <li>
                                                        <img src={media7} alt="media7" />
                                                    </li>
                                                    <li>
                                                        <img src={media8} alt="media8" />
                                                    </li>
                                                    <li>
                                                        <img src={media9} alt="media9" />
                                                    </li>
                                                    <li>
                                                        <img src={media10} alt="media10" />
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="logo-upload-progress">
                                            <ProgressBar now={60} />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
								</Modal.Body>
								<Modal.Footer>
									<div className="modal-btns">
                                        <Button variant="secondary">Unsplash</Button>
                                        <Button variant="primary">Confirm</Button>
                                    </div>
								</Modal.Footer>
							</Modal>
                        </Form>
                    </Container>
                </Col>
            </Row>
            
        </div>
        
    )
}
StepOne.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    saveData: PropTypes.func,
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
  })(StepOne);