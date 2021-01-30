import React from 'react'
import { Link } from "react-router-dom";
import { Field } from 'redux-form';
import { renderField } from '../../utils/formUtils'
import { togglePassword } from '../../utils/helpers'

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
                    <Form.Group controlId="formBasicEmail">
                      <div className="password-wrap">
                        <Field
                          name="password"
                          label="password"
                          type="password"
                          component={ renderField }
                          maxLength="150"
                          placeholder='Enter your password'
                        />

                        <span onClick={togglePassword} className="password-swap">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.12 14.12C13.8454 14.4147 13.5141 14.6511 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1961C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4858 9.58525 10.1546 9.88 9.87999M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68189 3.96914 7.6566 6.06 6.05999L17.94 17.94ZM9.9 4.23999C10.5883 4.07887 11.2931 3.99833 12 3.99999C19 3.99999 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19L9.9 4.23999Z" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 1L23 23" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </Form.Group>






                    <Form.Group controlId="formBasicEmail">
                    <div className="password-wrap">
                    <Field
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        component={ renderField }
                        maxLength="150"
                        placeholder='Confirm Password'
                    />
                    <span onClick={togglePassword} className="password-swap">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.12 14.12C13.8454 14.4147 13.5141 14.6511 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1961C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4858 9.58525 10.1546 9.88 9.87999M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68189 3.96914 7.6566 6.06 6.05999L17.94 17.94ZM9.9 4.23999C10.5883 4.07887 11.2931 3.99833 12 3.99999C19 3.99999 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19L9.9 4.23999Z" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 1L23 23" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </span>
                        </div>
                    </Form.Group>
                    </div>
                </div>
                <div className="forgot-btns">
                <div className="small-wrapper">
                    <Button className="btn btn-primary" type="submit">
                    Reset
                    </Button>   
                    <p className="heading-detail">
                    Don’t have an account?  <Link to="/register">Sign Up</Link>
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