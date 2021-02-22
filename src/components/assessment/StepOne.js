import React, { useEffect } from 'react'
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
// import Link from 'next/link'
import { renderStyleMultipleRadio } from '../../utils/formUtils'
import { assessmentFormValidate as validate } from '../../utils/validates'
import { assessmentIntialValues  } from '../../utils/helpers'
import _ from 'lodash'
import AssessmentHeader from 'pages/assessment/header'
import
{
    Form,
    Container,
    Col,
    Row,
}
    from 'react-bootstrap';

const StepOne = (props) => {
    const { handleSubmit, kindOfBuild, initialize  } = props;

    useEffect(()=>{
        if(!_.isEmpty(assessmentIntialValues())){
            initialize(assessmentIntialValues())
        }
        window.scrollTo(0, 0);
    },[]);

    return(
        <>
            <Form className="form" onSubmit={ handleSubmit(() => {}) }>
                <AssessmentHeader { ...props } />
                <section className="main-section">
                    <div className="assesment-step assesment-step-1">
                        {/* <Row className="step-banner">
                            <Col className="col-12">
                                <Container>
                                    <Row className="back-to-home">
                                        <Col className="col-12">
                                            <Link to="/">
                                                <span>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15.5 18L9.5 12L15.5 6" stroke="white" strokeLinejoin="round"/>
                                                    </svg>
                                                    Back to Home
                                                </span>
                                            </Link>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-12">
                                            <h1>
                                                Let’s start!
                                            </h1>
                                            {/* <p>
                                Answer some questions for us and we’ll build a website for you.
                                </p>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row> */}
                        <Row className="step-form">
                            <Col className="col-12">
                                <Container>

                                    <div className="form-heading">
                                        <h2>
                                            What kind of blog do you want?
                                        </h2>
                                    </div>
                                    <div className="category-wrapper">
                                        <Field
                                            name="nicheId"
                                            options={ kindOfBuild || [] }
                                            component={ renderStyleMultipleRadio }
                                            defaultValue={ 'no' }
                                            placeholder={ 'gaveCraving' }
                                            className='styled-radio-btn'
                                            imgWidth="30px"
                                            isIcons={ true }
                                        />
                                    </div>
                                    <div className="step-btns">
                                        <div className="step-btn-left">

                                        </div>
                                    </div>
                                </Container>
                            </Col>
                        </Row>

                    </div>
                </section>
            </Form>
        </>

    )
}
StepOne.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    saveData: PropTypes.func,
    initialize: PropTypes.object,
    valid: PropTypes.bool,
    kindOfBuild: PropTypes.array
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
})(StepOne);