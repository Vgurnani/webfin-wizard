import React from 'react'
import  Link  from 'next/link'
import { Field } from 'redux-form';
import { renderOTPField } from '../../utils/formUtils'
import PropTypes from 'prop-types';

import 
  {
    Form,
    Button
  }
from 'react-bootstrap';
const OtpForm = (props) => {
    const { handleSubmit, submitData } = props;
    return(
        <div className="forget-forms signup-forms">
        <Form className="form" onSubmit={handleSubmit(submitData)}>  
            <div className="forget-form-inner">
                <div className="forget-forms-element">
                    <h1 className="section-heading">   
                    Reset password
                    </h1>
                    <p className="heading-detail">
                        insert the verification code you receive in your mail.
                    </p>
                    <div className="small-wrapper">
                    <Field
                    label="Code"
                        name="otp"
                        type="text"
                        component={ renderOTPField }
                        formClass="otpFieldsInput"
                    />   


                      
                   <Form.Text className="form-text">
                                Review your email!
                                </Form.Text>
                    </div>
                </div>
                <div className="forgot-btns">
                <div className="small-wrapper">
                    <Button className="btn btn-primary" type="submit">
                    Continue
                    </Button>   
                    <p className="heading-detail">
                        Didn't receive code?  <Link href="/register">Send again</Link>
                    </p>
                    </div>
                </div>   
            </div>
        </Form>
    </div>
      
    )
}
OtpForm.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func
};
export default OtpForm;