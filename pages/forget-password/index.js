import React, { useState } from 'react'
import { forgetPasswordValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import accountSlider1 from '../../public/images/account-slider-1.png';
import withPublicRoute from '../../components/hoc/withPublicRoute'
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
  const [ step, setStep ] = useState(1)
  const { handleSubmit } = props
  const submitData = (data) => {
    setStep(step+1)
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
    </section>
)
}
ForgetPasswordPage.propTypes = {
  handleSubmit: PropTypes.func
};
export default reduxForm({
  form: 'forgetPassword',
  validate
})(withPublicRoute(ForgetPasswordPage))

