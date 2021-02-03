import React, { useState } from 'react'
import { forgetPasswordValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import accountSlider1 from '../../public/images/account-slider-1.png';
import { Link } from "react-router-dom";
// import withPublicRoute from '../../components/hoc/withPublicRoute'
import { forgetPassword } from '../../middleware/auth'
import
  {
    Container,
    Row,
    Col,
    Carousel

  }
from 'react-bootstrap';

import ForgetPasswordForm from  '../../components/forget-password/ForgetPasswordForm';
import OtpForm from '../../components/forget-password/OtpForm';
import ResetPasswordForm from '../../components/forget-password/ResetPasswordForm';

const ForgetPasswordPage = (props) => {
  const dispatch = useDispatch()
  const [ step, setStep ] = useState(1)
  const { handleSubmit } = props
  const submitData = (data) => {
    dispatch(forgetPassword(step, setStep,data))
  }

  const handleView = () => {
    switch(step){
    case 1:
        return <ForgetPasswordForm handleSubmit={handleSubmit} submitData={submitData} />
    case 2:
        return <OtpForm handleSubmit={handleSubmit} submitData={submitData} />
    case 3:
        return <ResetPasswordForm handleSubmit={handleSubmit} submitData={submitData} />
    default:
        return null
    }
}
  return(
    <section className="forgot-password-section main-section main-form-section">
        <Container className="positionUnset">

          <Row className="align-items-center positionUnset">
            <Col className="col-6 form-side">
            <Row className="back-to-home">
          <Col className="col-12">
          <Link to="/">
            <span>
              <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 13.4999L9.5 7.49986L15.5 1.49986" stroke="#757575" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </span>
            </Link>
          </Col>
        </Row>
              {handleView()}
            </Col>
            <Col className="crausel-side col-6 text-center">
              <Carousel controls={false} className="carousel slide" id="sampleSlide">

                <Carousel.Item className="carousel-item">
                  <img src={accountSlider1} alt='slider1' />
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                  <img src={accountSlider1} alt='slider2'/>
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                  <img src={accountSlider1} alt='slider3'/>
                </Carousel.Item>

              </Carousel>
            </Col>
          </Row>
        </Container>
    </section>)
}
ForgetPasswordPage.propTypes = {
  handleSubmit: PropTypes.func
};
export default reduxForm({
  form: 'forgetPassword',
  validate
})(ForgetPasswordPage);

