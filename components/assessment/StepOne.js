import React from 'react'
import { Field } from 'redux-form';
import { renderStyleMultipleRadio } from '../../utils/formUtils'
import { assessmentFormValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import 
  {
    Form,
    Button
  }
from 'react-bootstrap';
const StepOne = (props) => {
    const { handleSubmit,kindOfBuild } = props;
    return(
            <div className="forget-forms signup-forms">
                <Form className="form" onSubmit={handleSubmit}>  
                    <div className="forget-form-inner">
                        <div className="forget-forms-element">
                            <h1 className="section-heading">   
                            What kind you blog are you looking to build ?
                            </h1>
                            <div className="small-wrapper">
                                
                            <Field
                                name="kind"
                                options={ kindOfBuild || []}
                                component={ renderStyleMultipleRadio }
                                defaultValue={ 'no' }
                                placeholder={ 'gaveCraving' }
                                className='styled-radio-btn btn-outline'
                                imgWidth="30px"
                            />
                             
                            </div>
                        </div>
                        <div className="forgot-btns">
                        <div className="small-wrapper">
                            <Button className="btn btn-secondry" type="button">
                            Save
                            </Button>
                            <Button className="btn btn-primary" type="submit">
                            Continue
                            </Button>
                            </div>
                        </div>   
                    </div>
                </Form>
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