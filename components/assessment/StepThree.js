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
      Row,
      Col,
    Form,
    Button
  }
from 'react-bootstrap';
const StepThree = (props) => {
    const [open, setOpen ] = useState(false)
    const form  = useSelector((state) => state.form.assessmentForm)
    const { handleSubmit, submitData , prevPage ,assessmentData} = props;
    return(<Row>
        <Col className='col-md-6'>
            <div className="forget-forms signup-forms">
                <Form className="form" onSubmit={handleSubmit}>  
                    <div className="forget-form-inner">
                        <div className="forget-forms-element">
                            <h1 className="section-heading">   
                             Choose color paletters
                            </h1>
                        
                            <div className="small-wrapper">
                                
                            <Field
                                name="websiteName"
                                component={ renderField }
                                placeholder={ 'Enter your website name' }
                            />
                            <Field
                                name="sd"
                                component={ renderFileDrop }
                                placeholder={"<a><i className='fa fa-plus'/> upload your logo</a>"}
                            />
                            <p>Optional! if you have logo upload here</p>
                            <div className=''>
                            </div>
                                <Button type="button" onClick={() => setOpen(!open)} >
                                Optional! Change Font
                                </Button>
                            </div>
                        </div>
                        {form.values?.kind && <div><span>{getLabel(assessmentData.niches, form.values?.kind)}</span></div>}
                        {form.values?.colorPalette && <div><span>{getLabel(assessmentData.colorPalette, form.values?.colorPalette)}</span></div>}
                        <div className="">
                        <div className="small-wrapper">
                            <Button className="btn btn-primary" type="button" onClick={prevPage}>
                            Back
                            </Button>
                            <Button className="btn btn-secondry" type="button">
                            Save
                            </Button>
                            <Button className="btn btn-primary" type="submit">
                            Continue
                            </Button>
                            </div>
                        </div>   
                    </div>
                    {open && <FontStyleModal setOpen={setOpen} fonts={assessmentData.fonts} />}
                </Form>
            </div>
            </Col>
            <Col className='col-md-6'></Col>

            </Row>
        
    )
}
StepThree.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    assessmentData: PropTypes.object
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
  })(StepThree);