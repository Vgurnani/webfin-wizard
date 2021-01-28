import React,{ useState , useEffect } from 'react'
import { Field } from 'redux-form';
import { renderFieldWG ,renderDebounceField, renderStyleMultipleRadio } from '../../utils/formUtils'
import { getLabel ,assessmentSaved } from '../../utils/helpers'
import { getUnsplash ,getVerifiedDomain} from '../../middleware/assessments'
import PropTypes from 'prop-types';
import { assessmentFormValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux'
import { change as reduxChange } from 'redux-form'
import WebTemplates ,{Header, Home, Banner} from 'web-templates';
import _ from 'lodash';
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
import UploadImageModal from './shared/UploadImageModal'
const StepThree = (props) => {
	const [ isSave, setSave ] = useState(false)
	const dispatch = useDispatch()
	const [openModal, setModalOpen ] = useState(false)
	const form  = useSelector((state) => state.form.assessmentForm)
	const domains  = useSelector((state) => state.assessment.domains)
	const domainLoading  = useSelector((state) => state.assessment.domainLoading)
	const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)
	const { handleSubmit ,prevPage ,assessmentData, colorPalette, saveData, setStep } = props;
	const colorObject = colorPalette.filter((item) => item.value === form.values.colourId)[0] || {}
	const data = {
		colors: colorObject?.colors || [],
		logoUrl: form.values.logoUrl,
		logoText: form.values.websiteName,
		readOnly: true
	}
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
	
	useEffect(()=>{
		if(!_.isEmpty(domains)){
			dispatch(reduxChange('assessmentForm', 'domain', domains[0]))
		}
	},[domains])

	const handleSearch = (event) => {
		let query  = form.values?.nicheId && getLabel(assessmentData.niches, form.values?.nicheId)
		query = event.currentTarget.value || query
		dispatch(getUnsplash('/photos',query))
	}

	const getBase64 = (base64) => {
		dispatch(reduxChange('assessmentForm', 'logoUrl', base64))
	}

	const clearImage = () => {
		dispatch(reduxChange('assessmentForm', 'logoUrl', null))
	}
	const handleSave = () => {
        setSave(true)
        saveData()
	}
	
	const handleChange = (value) => {
		if(value){
			dispatch(getVerifiedDomain(value))
		} else {
			dispatch({type: 'CLEAR_DOMAINS'})
			dispatch(reduxChange('assessmentForm', 'domain', null))
			
		}
		
			
	}

	const getDomains = () => {
		const result = domains?.map((item) => ({label: item, value: item}))
		return _.isEmpty(result) ? form?.values?.websiteName && [{label: form.values.domain,value: form.values.domain}] : result
	}

	const domainsOptions = getDomains() || []
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
														component={ renderDebounceField }
														defaultValue={ form?.values?.websiteName}
														handleChange={handleChange}
														minLength={1}
														placeholder={ 'Enter your website name' }
														
												/>
												{domainLoading && <span>loading...</span>}
												
												{!_.isEmpty(domainsOptions) && !domainLoading && form?.values?.websiteName &&
													<>
														<span>domain</span>
														<Field
															name="domain"
															options={ domainsOptions || []}
															component={ renderStyleMultipleRadio }
															defaultValue={ 'no' }
															placeholder={ 'domain' }
															className='styled-radio-btn'
															isIcons={false}
														/>
													</>
												}
										
												<p className="logo-optional">Optional! if you have logo upload here</p>
												<div className="upload-media-btn">
												<button type='button' onClick={handleToggleModal}>upload your logo</button>
												
												</div>
												
												
											
												<ul className="cat-list">
														{form.values?.nicheId && <li onClick={() => setStep(1)}>
														{ getLabel(assessmentData.niches, form.values?.nicheId)}
														</li>}
														{form.values?.colourId &&<li onClick={() => setStep(2)}>
														{getLabel(assessmentData.colorPalette, form.values?.colourId)}
														</li>}
												</ul>
										
										</div>
								</Col>
								<Col className="col-6 name-website-selector wizard-preview">
									<h4>Preview</h4>
										<div className="blog-preview wizard-blog-preview ">
											<WebTemplates data={data}>
												<Header></Header>
												<Home>
												<Banner>
													<h1>
													<span>Simple Recipes for Healthier Families</span>
													</h1>
													<h5>Welcome to the most reliable source for healthy recipes!</h5>
												</Banner>
												</Home>
											</WebTemplates>
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
												<Button type="button"  disabled={!props.valid || domainLoading} onClick={handleSave} variant="light" >
												{ isSave ? 'Saved' : 'Save' }  
												</Button>
										</div>
										<div className="step-btn">
										<span>
										{ props.valid && form?.values?.domain && !domainLoading ?
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
							<UploadImageModal  clearImage={clearImage} previewFile={form.values?.logoUrl} getBase64={getBase64} handleSearch={handleSearch} unsplashImages={unsplashImages} openModal={openModal} handleToggleModal={handleToggleModal} />
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
	saveData: PropTypes.func,
	colorPalette: PropTypes.object,
	setStep: PropTypes.func
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
  })(StepThree);