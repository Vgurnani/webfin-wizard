import React from 'react'
import Link  from 'next/link'
import PropTypes from 'prop-types';
import { registrationUser } from '../../actions/user/auth'
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
import { renderFieldWG } from '../../utils/formUtils'
import { registerValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import googleLogin from '../../assets/images/google-login.svg';
import facebookLogin from '../../assets/images/facebook-login.svg';
import { useDispatch } from 'react-redux'

const RegisterPage = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props
  const submitData = (data) => {
    dispatch(registrationUser(data))
  }

  return(
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
                  Already have an account?  <Link href="/login">Sign In</Link>
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
                    <Field
                      name="password"
                      label="Password:"
                      type="password"
                      component={ renderFieldWG }
                      maxLength="150"
                      placeholder='Enter your password'
                    />
                    <Field
                      name="confirmPassword"
                      label="Confirm Password:"
                      type="password"
                      component={ renderFieldWG }
                      maxLength="150"
                      placeholder='Confirm password'
                    />

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
)}

RegisterPage.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'registerForm',
  validate
})(withPublicRoute(RegisterPage))
