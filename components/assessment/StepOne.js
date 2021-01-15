import React from 'react'
import { Field } from 'redux-form';
import { renderStyleMultipleRadio } from '../../utils/formUtils'
import { assessmentFormValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import 
  {
    Form,
    Button,
    Container,
    Col,
    Row,
  }
from 'react-bootstrap';
import  Link from 'next/link'
const StepOne = (props) => {
    const { handleSubmit,kindOfBuild } = props;
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
                                <p>
                                Answer some questions for us and we’ll build a website for you.
                                </p>
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
                            <div class="small-wrapper">
                            <Field
                                name="kind"
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
                                        <Button type="button" variant="light" >
                                        Save  
                                        </Button>
                                    </div>
                                    <div className="step-btn">
                                        <Button type="submit" variant="primary">
                                        Next
                                        </Button>
                                      
                                    </div>
                                </div>
                            </div>
                           
                        </Form>
                    </Container>
                </Col>
            </Row>
            
        </div>
        
    )
}
StepOne.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
  })(StepOne);