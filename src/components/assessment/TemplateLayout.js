import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assessmentFormValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import
{
    Col,
    Row,
    Form,
    Button
}
    from 'react-bootstrap';
import { change as reduxChange } from 'redux-form'
import TemplateLayoutOne from './shared/TemplateLayoutOne';
import TemplateLayoutTwo from './shared/TemplateLayoutTwo'
const TemplateLayout = (props) => {
    const dispatch  = useDispatch()
    const form  = useSelector((state) => state.form.assessmentForm)
    const { handleSubmit } = props;
    useEffect(()=>{
        dispatch(reduxChange('assessmentForm', 'template', '1'))
    },[])
    const handleChange = (event) => {
        dispatch(reduxChange('assessmentForm', 'template', event.target.value))
    }
    return(
        <div className="assesment-step assesment-step-1 step-form">
            <Form className="form" onSubmit={ handleSubmit }>
                <div className="form-heading">
                    <h2>Choose your homepage layout</h2>
                </div>
                <Row>
                    <Col className="col-6 p-5">
                        <div>
                            <input type='radio' onChange={ handleChange } value="1" checked={ form.values?.template === '1' } /><span>Layout1</span>
                            <p>(recommented)</p>
                            <TemplateLayoutOne />
                        </div>
                    </Col>
                    <Col className="col-6 p-5">
                        <div>
                            <input type='radio' onChange={ handleChange } value="2" checked={ form.values?.template === '2' }/><span>Layout2</span>
                            <TemplateLayoutTwo />
                        </div>
                    </Col>
                </Row>

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
        </div>

    )
}
TemplateLayout.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
})(TemplateLayout);