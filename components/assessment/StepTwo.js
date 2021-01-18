import React from 'react'
import { Field } from 'redux-form';
import { renderStyleMultipleRadio } from '../../utils/formUtils'
import { assessmentFormValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import 
  {
    Form,
    Button,
    Container,
    Col,
    Row,
  }
from 'react-bootstrap';
const StepTwo = (props) => {
    const { handleSubmit,prevPage ,colorPalette, saveData} = props;
    return(
        <div className="assesment-step assesment-step-2">
            <Row  className="step-form">
                <Col className="col-12">
                    <Container>
                        <Form className="form" onSubmit={handleSubmit}>  
                        <div className="form-heading">   
                                <h2>
                                Choose Your Color Palette!
                                </h2>
                            </div>
                            <Row className="color-palatte">
                                <Col className="col-6 color-palatte-selector">
                                    <Field
                                        name="colourId"
                                        options={ colorPalette }
                                        component={ renderStyleMultipleRadio }
                                        defaultValue={ 'no' }
                                        placeholder={ 'gaveCraving' }
                                        isColors={true}
                                        className='styled-radio-btn btn-outline'
                                        imgWidth="30px"
                                    />
                                </Col>
                                <Col className="col-6 color-palatte-preview">

                                </Col>
                            </Row>
                       
                                    
                                
                                
                               
                                
                                <div className="step-btns">
                                <div className="step-btn-left">
                                <Button type="button" variant="secondary" >
                                        Back  
                                        </Button>
                                </div> 
                                <div className="step-btn-right">
                                    <div className="step-btn">
                                        <Button type="button" onClick={saveData} variant="light" >
                                        Save  
                                        </Button>
                                    </div>
                                    <div className="step-btn">
                                        <Button type="submit" variant="primary">
                                        Next
                                        </Button>
                                      
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </div>
        
    )
}
StepTwo.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    saveData: PropTypes.func
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
  })(StepTwo);