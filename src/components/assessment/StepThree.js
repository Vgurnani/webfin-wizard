import React,{ useState , useEffect } from 'react'
import { Field } from 'redux-form';
import { renderFieldWG  } from '../../utils/formUtils'
import { getLabel ,assessmentSaved } from '../../utils/helpers'
import { getUnsplash } from '../../middleware/assessments'
import PropTypes from 'prop-types';
import { assessmentFormValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux'
import { change as reduxChange } from 'redux-form'

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
import preview from '../../public/images/preview.png';
import UploadImageModal from './shared/UploadImageModal'
const StepThree = (props) => {
	const [ isSave, setSave ] = useState(false)
	const dispatch = useDispatch()
	const [openModal, setModalOpen ] = useState(false)
	const form  = useSelector((state) => state.form.assessmentForm)
	const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)
    const { handleSubmit ,prevPage ,assessmentData, saveData} = props;
    const handleToggleModal = () => {
        setModalOpen(!openModal)
	}
	
	useEffect(()=>{
		const query = form.values?.nicheId && getLabel(assessmentData.niches, form.values?.nicheId)
		dispatch(getUnsplash('/photos',query))
	},[])
	useEffect(()=>{
        setSave(assessmentSaved('step3',form?.values))
    },[form?.values])

	const handleSearch = (event) => {
		let query  = form.values?.nicheId && getLabel(assessmentData.niches, form.values?.nicheId)
		query = event.currentTarget.value || query
		dispatch(getUnsplash('/photos',query))
	}

	const getFile = (file) => {
		dispatch(reduxChange('assessmentForm', 'logoUrl', file))
	}

	const clearImage = () => {
		dispatch(reduxChange('assessmentForm', 'logoUrl', null))
	}
	const handleSave = () => {
        setSave(true)
        saveData()
	}
		
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
										<div className="small-wrapper">
												<Field
														name="websiteName"
														component={ renderFieldWG }
														placeholder={ 'Enter your website name' }
														
												/>
										
												<p className="logo-optional">Optional! if you have logo upload here</p>
												<div className="upload-media-btn">
												<button type='button' onClick={handleToggleModal}>upload your logo</button>
												</div>
												
											
												<ul className="cat-list">
														{form.values?.nicheId && <li>
														{ getLabel(assessmentData.niches, form.values?.nicheId)}
														</li>}
														{form.values?.colourId &&<li>
														{getLabel(assessmentData.colorPalette, form.values?.colourId)}
														</li>}
												</ul>
										
										</div>
								</Col>
								<Col className="col-6 name-website-selector">
										<div className="blog-preview">
												<img src={preview} alt="Preview" />
										</div>
								</Col>
							</Row>
																				
							<div className="step-btns">
								<div className="step-btn-left">
								<Button type="button" onClick={prevPage} variant="secondary" >
												Back  
												</Button>
								</div> 
								<div className="step-btn-right">
										<div className="step-btn">
												<Button type="button"  disabled={!props.valid} onClick={handleSave} variant="light" >
												{ isSave ? 'Saved' : 'Save' }  
												</Button>
										</div>
										<div className="step-btn">
										<span>
										{ props.valid  ? 
                                         <Button type="submit" variant="primary">
                                         Next
                                         </Button>
                                        : 
                                        <Button type="button" disabled={true} variant="primary">
                                        Next
                                        </Button>}
												</span>
												<span className="enter-btn">
														<a>
														or Press Enter
														<img src={enterIcon} alt="Enter" />
														</a>
												</span>
										</div>
								</div>
							</div>
							<UploadImageModal  clearImage={clearImage} previewFile={form.values?.logoUrl} getFile={getFile} handleSearch={handleSearch} unsplashImages={unsplashImages} openModal={openModal} handleToggleModal={handleToggleModal} />
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