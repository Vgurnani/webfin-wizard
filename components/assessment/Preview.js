import React from 'react'
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { assessmentFormValidate as validate } from '../../utils/validates'
import TemplateLayoutOne from './shared/TemplateLayoutOne'
import 
  {
    Row,
    Col,
    Container,
    Form,
    Button
  }
from 'react-bootstrap';
import preview from '../../public/images/preview.png';

const Preview = (props) => {
    const {handleSubmit ,saveData} = props;
    return(


        <div className="assesment-step assesment-step-2">
            <Row  className="step-form">
                <Col className="col-12">
                    <Container>
                        <Form className="form" onSubmit={handleSubmit}>  
                        <div className="form-heading">   
                                <h2>
                                Congratulation! Here is your NEW website
                                </h2>
                            </div>
                            <Row className="color-palatte">
                                <Col className="col-12 color-palatte-preview">
                                    <div className="color-preview">
                                    {/*<TemplateLayoutOne />*/}
                                        <img src={preview} alt="Preview" style={{width: '-webkit-fill-available'}} />
                                    </div>
                                </Col>
                            </Row>
                                <div className="step-btns justify-content-center">
                                <div className="step-btn-right">
                                    <div className="step-btn">
                                    <Button className="btn btn-primary" type="submit">
                                    Save your work!
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
Preview.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    saveData: PropTypes.func
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
  })(Preview);