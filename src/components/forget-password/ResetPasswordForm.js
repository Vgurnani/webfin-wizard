import React from 'react'
import Link  from 'next/link'
import { Field } from 'redux-form';
import { renderFieldWG } from '../../utils/formUtils'
import PropTypes from 'prop-types';
import 
  {
    Form,
    Button
  }
from 'react-bootstrap';
const ResetPasswordForm = (props) => {
    const { handleSubmit, submitData } = props;
    return(
        <div className="forget-forms signup-forms">
        <Form className="form" onSubmit={handleSubmit(submitData)}>  
            <div className="forget-form-inner">
                <div className="forget-forms-element">
                    <h1 className="section-heading">   
                    New Password
                    </h1>
                    <p className="heading-detail">
                        You will receive a code to create a new password
                    </p>
                    <div className="small-wrapper">
                        
                    <Field
                        name="password"
                        label="New Password"
                        type="password"
                        component={ renderFieldWG }
                        maxLength="150"
                        placeholder='New Password'
                    />  
                    <Field
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        component={ renderFieldWG }
                        maxLength="150"
                        placeholder='Confirm Password'
                    />
                    </div>
                </div>
                <div className="forgot-btns">
                <div className="small-wrapper">
                    <Button className="btn btn-primary" type="submit">
                    Reset
                    </Button>   
                    <p className="heading-detail">
                    Don’t have an account?  <Link href="/register">Sign Up</Link>
                    </p>
                    </div>
                </div>   
            </div>
        </Form>
    </div>
       
    )
}
ResetPasswordForm.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func
};
export default ResetPasswordForm;