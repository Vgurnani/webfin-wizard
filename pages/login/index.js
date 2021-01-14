import React from 'react'
import  Link from 'next/link'
import { renderFieldWG, renderField } from '../../utils/formUtils'
import { loginValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/user/auth'
import withPublicRoute from '../../components/hoc/withPublicRoute'

import 
  {
    Container,
    Row,
    Col,
    Form,
    Button
  }
from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import googleLogin from '../../assets/images/google-login.svg';
import facebookLogin from '../../assets/images/facebook-login.svg';

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props
  const submitData = (data) => {
    dispatch(loginUser(data))
  }
  return(
    <section className="login-section main-section">
      <Container>
        <Row className="back-to-home">
          <Col className="col-12">
            <a href="/">
              <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 13.4999L9.5 7.49986L15.5 1.49986" stroke="#757575" strokeLinejoin="round"/>
              </svg>
              Back to Home 
            </a>
          </Col>
        </Row>
        <div className="small-wrapper">
        <Row className="login-forms">
          <Col className="col-12">
            <h1 className="section-heading">
            Log in
            </h1>
            <p className="heading-detail">
            Don’t have an account?  <Link href="/register">Sign Up</Link>
            </p>
            <Form className="form" onSubmit={handleSubmit(submitData)}>  
              <Field
                name="email"
                label="email"
                type="text"
                component={ renderFieldWG }
                maxLength="150"
                placeholder='Enter your email'
              />
              <Form.Group controlId="formBasicEmail" className="form-group">
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
                  <span className="hide-password password-swap">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.12 14.12C13.8454 14.4147 13.5141 14.6511 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1961C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4858 9.58525 10.1546 9.88 9.87999M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68189 3.96914 7.6566 6.06 6.05999L17.94 17.94ZM9.9 4.23999C10.5883 4.07887 11.2931 3.99833 12 3.99999C19 3.99999 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19L9.9 4.23999Z" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 1L23 23" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="show-password password-swap">
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.12 11.12C13.8454 11.4147 13.5141 11.6511 13.1462 11.8151C12.7782 11.9791 12.3809 12.0673 11.9781 12.0744C11.5753 12.0815 11.1752 12.0074 10.8016 11.8565C10.4281 11.7056 10.0887 11.481 9.80385 11.1961C9.51897 10.9113 9.29439 10.5719 9.14351 10.1984C8.99262 9.82483 8.91853 9.42472 8.92563 9.0219C8.93274 8.61909 9.02091 8.22184 9.18488 7.85384C9.34884 7.48584 9.58525 7.15464 9.88 6.87999M17.94 14.94C16.2306 16.243 14.1491 16.9649 12 17C5 17 1 8.99999 1 8.99999C2.24389 6.68189 3.96914 4.6566 6.06 3.05999L17.94 14.94ZM9.9 1.23999C10.5883 1.07887 11.2931 0.998333 12 0.999995C19 0.999995 23 8.99999 23 8.99999C22.393 10.1356 21.6691 11.2047 20.84 12.19L9.9 1.23999Z" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                </div>
                <Form.Text className="form-text">
                Don't remember your password?
                </Form.Text>
              </Form.Group>            
              <Button className="btn btn-primary" type="submit">
                Sign In
              </Button>
            </Form>
            <div className="social-logins">
              <p className="login-or">Or</p>
              <div className="social-btn">
                <button href='#' className="btn btn-primary btn-facebook">
                <img src={facebookLogin} alt="facebook" />
                  <a href={`${process.env.API_URL}/oauth2/authorize/facebook`}>Continue with Facebook</a>
                </button>
              </div>
              <div className="social-btn">
                <button href='#' className="btn btn-primary btn-google">

                  <img src={googleLogin} alt="Google" />
                  <a href={`${process.env.API_URL}/oauth2/authorize/google`}>Continue with Google</a>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        </div>
      </Container>
    </section>
)
}


LoginPage.propTypes = {
  handleSubmit: PropTypes.func
};
export default reduxForm({
  form: 'loginform',
  validate
})(withPublicRoute(LoginPage))
