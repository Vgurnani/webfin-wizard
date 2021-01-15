import React from 'react'
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { assessmentFormValidate as validate } from '../../utils/validates'
import TemplateLayoutOne from './shared/TemplateLayoutOne'
import 
  {
    Form,
    Button
  }
from 'react-bootstrap';
const Preview = (props) => {
    const {handleSubmit} = props;
    return(
            <div className="forget-forms signup-forms">        
                <Form className="form" onSubmit={handleSubmit}>  
                    <div className="forget-form-inner">
                        <div className="forget-forms-element">
                            <h1 className="section-heading">   
                             Choose color paletters
                            </h1>
                            <div className="small-wrapper">
                                <TemplateLayoutOne />
                            </div>
                        </div>
                        <div className="forgot-btns">
                        <div className="small-wrapper">
                            <Button className="btn btn-primary" type="submit">
                            Save your work
                            </Button>
                            </div>
                        </div>   
                    </div>
                </Form>
            </div>
        
    )
}
Preview.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
  })(Preview);