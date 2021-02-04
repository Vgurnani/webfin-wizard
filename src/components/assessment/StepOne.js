import React, { useEffect, useState } from 'react'
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
// import Link from 'next/link'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { renderStyleMultipleRadio } from '../../utils/formUtils'
import { assessmentFormValidate as validate } from '../../utils/validates'
import { assessmentIntialValues , assessmentSaved } from '../../utils/helpers'
import enterIcon from '../../public/images/enter-icon.png';
import _ from 'lodash'
import
{
    Form,
    Button,
    Container,
    Col,
    Row,
}
    from 'react-bootstrap';

const StepOne = (props) => {
    const [ isSave, setSave ] = useState(false)
    const { handleSubmit, kindOfBuild, saveData, initialize ,valid  } = props;
    const assessmentForm = useSelector((state) => state.form.assessmentForm)

    useEffect(()=>{
        if(!_.isEmpty(assessmentIntialValues())){
            initialize(assessmentIntialValues())
        }
    },[])

    useEffect(()=>{
        setSave(assessmentSaved('step1',assessmentForm?.values))
    },[ assessmentForm?.values ])

    const handleSave = () => {
        setSave(true)
        saveData()
    }
    return(
        <div className="assesment-step assesment-step-1">
            <Row className="step-banner">
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
                                </p> */}
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row className="step-form">
                <Col className="col-12">
                    <Container>
                        <Form className="form" onSubmit={ handleSubmit }>
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
                                <div className="step-btn-right">
                                    <div className="step-btn">
                                        <Button type="button" disabled={ !valid } onClick={ handleSave } variant="light" >
                                            {isSave ? 'Saved' : 'Save'}
                                        </Button>
                                    </div>
                                    <div className="step-btn">
                                        <span>
                                            { valid  ?
                                                <Button type="submit" variant="primary">
                                                    Next
                                                </Button>
                                                :
                                                <Button type="button" disabled={ true } variant="primary">
                                                    Next
                                                </Button>}
                                        </span>
                                        <span className="enter-btn">
                                            <a>
                                                or Press Enter
                                                <img src={ enterIcon } alt="Enter" />
                                            </a>
                                        </span>
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