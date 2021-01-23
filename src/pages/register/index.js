import React, { useEffect } from 'react'
// import Link  from 'next/link'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { registrationUser } from '../../middleware/auth'
// import withRegisterRoute from '../../components/hoc/withRegisterRoute'
import { togglePassword } from '../../utils/helpers'

import
  {
    Container,
    Row,
    Col,
    Form,
    Button
  }
from 'react-bootstrap';
import { renderFieldWG, renderField} from '../../utils/formUtils'
import { registerValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import googleLogin from '../../public/images/google-login.svg';
import facebookLogin from '../../public/images/facebook-login.svg';
import { useDispatch, useSelector } from 'react-redux'
import { assessmentIntialValues } from '../../utils/helpers'
import Layout from '../../components/shared/Layout';
import { ROUTES } from '../../constants/appRoutes';

const RegisterPage = (props) => {
  const dispatch = useDispatch();

  const assessmentForm = useSelector((state)=>state.form.assessmentForm)
  const { handleSubmit } = props
  const submitData = (data) => {
    const assessmentFormData = assessmentForm?.values || assessmentIntialValues();
    dispatch(registrationUser(data, assessmentFormData))
  }

  return(
    <Layout className="main-layout" pathname={ROUTES.REGISTER}>
    <section className="signup-section main-section">
      <Container>
        <Row className="align-items-center">
        <Col className="content-side col-6 light-content">
            <div className="content-side-inner">
             <h4>Benefits of Registering </h4>
             <p>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
             </p>
             <ul>
               <li>Lorem ipsum dolor sit amet.</li>
               <li>Lorem ipsum dolor sit amet.</li>
               <li>Lorem ipsum dolor sit amet.</li>
               <li>Lorem ipsum dolor sit amet.</li>
             </ul>
             </div>
            </Col>
          <Col className="col-6 form-side">
            <div className="small-wrapper">
              <Row className="login-forms signup-forms">
                <Col className="col-12">
                  <h1 className="section-heading">
                  Register
                  </h1>
                  <p className="heading-detail">
                  Already have an account?  <Link to="/login">Sign In</Link>
                  </p>
                  <Form className="form" onSubmit={handleSubmit(submitData)}>
                    <Field
                      name="firstName"
                      label="First Name:"
                      type="text"
                      component={ renderFieldWG }
                      maxLength="150"
                      placeholder='Enter your first name'
                    />
                    <Field
                      name="lastName"
                      label="Last Name:"
                      type="text"
                      component={ renderFieldWG }
                      maxLength="150"
                      placeholder='Enter your last name'
                    />
                    <Field
                      name="email"
                      label="Email:"
                      type="text"
                      component={ renderFieldWG }
                      maxLength="150"
                      placeholder='Enter your email'
                    />

                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Password:</Form.Label>
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
                      <Form.Label>Confirm Password:</Form.Label>
                      <div className="password-wrap">
                        <Field
                          name="confirmPassword"
                          label="confirmPassword"
                          type="password"
                          component={ renderField }
                          maxLength="150"
                          placeholder='Enter your confirm password'
                        />

                        <span onClick={togglePassword} className="show-password password-swap">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.12 14.12C13.8454 14.4147 13.5141 14.6511 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1961C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4858 9.58525 10.1546 9.88 9.87999M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68189 3.96914 7.6566 6.06 6.05999L17.94 17.94ZM9.9 4.23999C10.5883 4.07887 11.2931 3.99833 12 3.99999C19 3.99999 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19L9.9 4.23999Z" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M1 1L23 23" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      </div>
                    </Form.Group>

                    <Button className="btn btn-primary" type="submit">
                      Sign Up
                    </Button>
                  </Form>
                  <div className="social-logins">
                    <div className="social-btn">
                      <button href='#' className="btn btn-primary btn-facebook">
                      <img src={facebookLogin} alt="facebook" />
                        <a href={`${process.env.API_URL}/oauth2/authorize/facebook`}>Sign up with Facebook</a>
                      </button>
                    </div>
                    <div className="social-btn">
                      <button href='#' className="btn btn-primary btn-google">
                        <img src={googleLogin} alt="Google" />
                        <a href={`${process.env.API_URL}/oauth2/authorize/google`}>Sign up with Google</a>
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

      </Container>
    </section>
    </Layout>
)}

RegisterPage.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterPage);
