import React, { useState } from 'react'
import { forgetPasswordValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import withPublicRoute from '../../components/hoc/withPublicRoute'
import 
  {
    Container,
    Row,
    Col,
    Carousel

  }
from 'react-bootstrap';

import StepOne from  '../../components/assessment/step-one';
import StepTwo from  '../../components/assessment/step-two';


const AssessmentPage = (props) => {
  const [ step, setStep ] = useState(1)
  const { handleSubmit } = props
  const submitData = (data) => {
    setStep(step+1)
  }

    const prevPage = () =>  {
        setStep(step-1)
    }

  const handleView = () => {
    switch(step){
    case 1:
        return <StepOne handleSubmit={handleSubmit} submitData={submitData} />
    case 2:
        return <StepTwo handleSubmit={handleSubmit} prevPage={prevPage} submitData={submitData} />
    case 3:
        return null
    default:
        return null
    }
}
  return(
   
    <section className="forgot-password-section main-section main-form-section">
        <Container className="positionUnset">   
          
          <Row className="align-items-center positionUnset">
            <Col className="col-12 form-side">
              {handleView()}
            </Col>
          </Row>
        </Container>
    </section>
)
}
AssessmentPage.propTypes = {
  handleSubmit: PropTypes.func
};
export default reduxForm({
  form: 'forgetPassword',
  validate
})(withPublicRoute(AssessmentPage))

