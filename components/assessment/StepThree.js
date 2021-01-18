import React,{ useState } from 'react'
import { Field } from 'redux-form';
import { renderField ,renderFileDrop } from '../../utils/formUtils'
import { getLabel } from '../../utils/helpers'
import PropTypes from 'prop-types';
import FontStyleModal from './shared/FontStyleModal'
import { useSelector } from 'react-redux';
import { assessmentFormValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import 
  {
    Form,
    Button,
    Container,
    Col,
    Row,
  }
from 'react-bootstrap';
import enterIcon from '../../public/images/enter-icon.png';
const StepThree = (props) => {
    const [open, setOpen ] = useState(false)
    const form  = useSelector((state) => state.form.assessmentForm)
    const { handleSubmit, submitData , prevPage ,assessmentData, saveData} = props;
    return(
        <div className="assesment-step assesment-step-2">
            <Row  className="step-form">
                <Col className="col-12">
                    <Container>
                    <Form className="form" onSubmit={handleSubmit}>  
         
                    <div className="form-heading">   
                                <h2>
                                Name Your Website!
                                </h2>
                            </div>
                        
                            <Row className="name-website">
                                <Col className="col-6 name-website-selector">
                                <Field
                                name="websiteName"
                                component={ renderField }
                                placeholder={ 'Enter your website name' }
                            />
                            <Field
                                name="logoUrl"
                                component={ renderFileDrop }
                                placeholder={"<a><i className='fa fa-plus'/> upload your logo</a>"}
                            />
                            <p>Optional! if you have logo upload here</p>
                            <div className=''>
                            </div>
                                {/*<Button type="button" onClick={() => setOpen(!open)} >
                                Optional! Change Font
                                 </Button>*/}
                          
                        {form.values?.kind && <div><span>{getLabel(assessmentData.niches, form.values?.kind)}</span></div>}
                        {form.values?.colorPalette && <div><span>{getLabel(assessmentData.colorPalette, form.values?.colorPalette)}</span></div>}
                                </Col>
                                <Col className="col-6 name-website-selector"></Col>
                                </Row>
                                
                           
                        <div className="step-btns">
                                <div className="step-btn-left">
                                <Button type="button" onClick={prevPage} variant="secondary" >
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
                                    <span>
                                        <Button type="submit" variant="primary">
                                        Next
                                        </Button>
                                        </span>
                                        <span class="enter-btn">
                                            <a>
                                            or Press Enter
                                            <img src={enterIcon} alt="Enter" />
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                    {open && <FontStyleModal setOpen={setOpen} fonts={assessmentData.fonts} />}
                </Form>
                   
                    </Container>
                </Col>
            </Row>
        </div>
        
    )
}
StepThree.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    assessmentData: PropTypes.object,
    saveData: PropTypes.func
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
  })(StepThree);