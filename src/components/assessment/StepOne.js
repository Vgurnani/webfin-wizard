import React, { useEffect, useState , useCallback } from 'react'
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
// import Link from 'next/link'
import { renderStyleMultipleRadio , renderNicheSelectField } from '../../utils/formUtils'
import { getNicheSuggestion } from 'middleware/assessments'
import { assessmentFormValidate as validate } from '../../utils/validates'
import { assessmentIntialValues  } from '../../utils/helpers'
import { useDispatch, useSelector } from 'react-redux'
//import { change as reduxChange } from 'redux-form'

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
    const dispatch = useDispatch()
    const form  = useSelector((state) => state.form.assessmentForm)
    const customNiches = useSelector((state) => state.assessment.customNiches )
    const { handleSubmit, kindOfBuild,onSubmit, initialize  } = props;
    const [ showCustomNiche , setCustomNiche ] = useState(false)
    useEffect(()=>{
        if(!_.isEmpty(assessmentIntialValues())){
            initialize(assessmentIntialValues())
        }
        window.scrollTo(0, 0);
    },[]);

    useEffect(() => {
        if(form?.initial?.niche){
            const niche = JSON.parse(form?.initial?.niche)
            if(kindOfBuild && !_.map(kindOfBuild,'label').includes(niche.label)){
                dispatch(getNicheSuggestion(niche.label))
                setCustomNiche(true)
            }
        }
    },[ form?.initial?.niche, kindOfBuild ])

    const handleNicheChange = ( event ) => {
        const obj = JSON.parse(event.target.value)
        obj.label === 'Other'? setCustomNiche(true) : setCustomNiche(false)
    }
    const getSuggestion = (value) => {
        dispatch(getNicheSuggestion(value.label))
    }

    const setDefaultValue = () => {
        const label = form?.values?.niche && JSON.parse(form?.values?.niche).label
        return (label === 'Other' ? '' : label)
    }
    const asyncValidateFunc = _.debounce(getSuggestion, 300);
    const asyncChangeCallback = useCallback(asyncValidateFunc, []);
    return(
        <>
            <Form className="form" onSubmit={ handleSubmit(onSubmit) }>
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
                                            name="niche"
                                            options={ kindOfBuild || [] }
                                            component={ renderStyleMultipleRadio }
                                            handleChange={ handleNicheChange }
                                            isNiche={ true }
                                            defaultValue={ 'no' }
                                            placeholder={ 'gaveCraving' }
                                            className='styled-radio-btn'
                                            imgWidth="30px"
                                            isIcons={ true }
                                        />
                                        {showCustomNiche && <Field
                                            name="niche"
                                            defaultValue={ setDefaultValue() }
                                            options={ customNiches || [] }
                                            handleChange = { asyncChangeCallback }
                                            component={ renderNicheSelectField }
                                        />}
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
    kindOfBuild: PropTypes.array,
    onSubmit: PropTypes.func
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
})(StepOne);