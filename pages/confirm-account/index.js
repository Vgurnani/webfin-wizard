import React from 'react'
import PropTypes from 'prop-types';
import { resendCode, emailVerification } from '../../middleware/auth'
import withConfirmAccount from '../../components/hoc/withConfirmAccount'

import
  {
    Container,
    Row,
    Col,
    Form,
    Carousel,
    Button
  }
from 'react-bootstrap';
import { renderOTPField} from '../../utils/formUtils'
import { registerValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import accountSlider1 from '../../public/images/account-slider-1.png';
import { useDispatch } from 'react-redux'

const ConfirmAccount = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props
  const submitData = (data) => {
    dispatch(emailVerification(data))
  }

  const handleResendCode = () => {
    dispatch(resendCode())
  }

  return(
    <section className="forgot-password-section main-section main-form-section">
        <Container className="positionUnset">   
          
          <Row className="align-items-center positionUnset">
        <Col className="crausel-side-left col-6 text-center">  
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
          <Col className="col-6 form-side">
            <div className="small-wrapper">
              <Row className="login-forms signup-forms">
                <Col className="col-12">
                  <h1 className="section-heading">
                  Confirm account
                  </h1>
                  <p className="heading-detail">
                  please enter confirmation code.
                  </p>
                  <Form className="form" onSubmit={handleSubmit(submitData)}>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Code:</Form.Label>
                    <Field
                        label="Code"
                        name="code"
                        type="text"
                        numInputs={6}
                        component={ renderOTPField }
                        formClass="otpFieldsInput"
                    /> 
                    </Form.Group>
                    <Form.Text className="form-text">
                        Review your email!
                    </Form.Text>


                    <Button className="btn btn-primary" type="submit">
                      Continue
                    </Button>
                    <p className="heading-detail">
                    Didn't receive code  <a href="#" onClick={handleResendCode} >Resend</a>
                    </p>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

      </Container>
    </section>
)}

ConfirmAccount.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'confirmAcouuntForm',
  validate
})(withConfirmAccount(ConfirmAccount))
