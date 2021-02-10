import React,{ useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import FontStyleModal from './shared/FontStyleModal'
import { useSelector } from 'react-redux';
import { assessmentFormValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import { getLabel } from '../../utils/helpers'

import
{
    Row,
    Col,
    Button
}
    from 'react-bootstrap';
const StepFour = (props) => {
    const [ open, setOpen ] = useState(false)
    const form  = useSelector((state) => state.form.assessmentForm)
    const { handleSubmit ,prevPage, assessmentData } = props;

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return(<Row>
        <Col className='col-md-6'>
            <div className="forget-forms signup-forms">
                <form className="form" onSubmit={ handleSubmit }>
                    <div className="forget-form-inner">
                        <div className="forget-forms-element">
                            {form.values?.kind && <div><span>{getLabel(assessmentData.niches, form.values?.kind)}</span></div>}
                            {form.values?.colorPalette && <div><span>{getLabel(assessmentData.colorPalette, form.values?.colorPalette)}</span></div>}
                            {form.values?.websiteName && <div><span>{form.values?.websiteName}</span></div>}
                            <Button type="button" onClick={ () => setOpen(!open) } >
                                Optional! Change Font
                            </Button>
                        </div>
                        <div className="">
                            <div className="small-wrapper">
                                <Button className="btn btn-primary" type="button" onClick={ prevPage }>
                                    Back
                                </Button>
                                <Button className="btn btn-secondry" type="button">
                                    Save
                                </Button>
                                <Button className="btn btn-primary" type="submit">
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </div>
                    {open && <FontStyleModal setOpen={ setOpen } fonts={ assessmentData.fonts }/>}
                </form>
            </div>
        </Col>
        <Col className='col-md-6'></Col>

    </Row>

    )
}
StepFour.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    prevPage: PropTypes.func,
    assessmentData: PropTypes.object
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
})(StepFour);