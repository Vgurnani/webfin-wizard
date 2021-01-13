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
const StepTwo = (props) => {
    const { handleSubmit,prevPage ,colorPalette} = props;
    return(
            <div className="forget-forms signup-forms">
                <Form className="form" onSubmit={handleSubmit}>  
                    <div className="forget-form-inner">
                        <div className="forget-forms-element">
                            <h1 className="section-heading">   
                             Choose color paletters
                            </h1>
                            <p className="heading-detail">
                                Select one of these color paletters
                            </p>
                            <div className="small-wrapper">
                                
                            <Field
                                name="colorPalette"
                                options={ colorPalette }
                                component={ renderStyleMultipleRadio }
                                defaultValue={ 'no' }
                                placeholder={ 'gaveCraving' }
                                isColors={true}
                                className='styled-radio-btn btn-outline'
                                imgWidth="30px"
                            />
                             
                            </div>
                        </div>
                        <div className="forgot-btns">
                        <div className="small-wrapper">
                            
                            <Button className="btn btn-primary" type="button" onClick={prevPage}>
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
                </Form>
            </div>
        
    )
}
StepTwo.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
  })(StepTwo);