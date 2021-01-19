import React,{ useState } from 'react'
import { Field } from 'redux-form';
import { renderFieldWG ,renderFileDrop } from '../../utils/formUtils'
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
	Modal
  }
from 'react-bootstrap';
import enterIcon from '../../public/images/enter-icon.png';
import preview from '../../public/images/preview.png';
import  Link from 'next/link';
import media1 from '../../public/images/media/media-1.jpg';
import media2 from '../../public/images/media/media-2.jpg';
import media3 from '../../public/images/media/media-3.jpg';
import media4 from '../../public/images/media/media-4.jpg';
import media5 from '../../public/images/media/media-5.jpg';
import media6 from '../../public/images/media/media-6.jpg';
import media7 from '../../public/images/media/media-7.jpg';
import media8 from '../../public/images/media/media-8.jpg';
import media9 from '../../public/images/media/media-9.jpg';
import media10 from '../../public/images/media/media-10.jpg';
const StepThree = (props) => {
		const [open, setOpen ] = useState(false)
		const [openModal, setModalOpen ] = useState(false)
    const form  = useSelector((state) => state.form.assessmentForm)
    const { handleSubmit, submitData , prevPage ,assessmentData, saveData} = props;
		const handleToggleModal = () => {
			setModalOpen(!openModal)
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
												<button type='button' onClick={handleToggleModal} className=''>upload your logo</button>
											
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
												<span className="enter-btn">
														<a>
														or Press Enter
														<img src={enterIcon} alt="Enter" />
														</a>
												</span>
										</div>
								</div>
							</div>
							

							<Modal show={true} className="logo-upload-modal">
								<Modal.Header closeButton>
                                    <div className="logo-upload-header">
                                        <Row>
                                            <Col className="col-6">
                                                <Modal.Title>Images</Modal.Title>
                                            </Col>
                                            <Col className="col-6 search-wrapper">
                                                <Field
                                                    name="search"
                                                    component={ renderFieldWG }
                                                    placeholder={ 'Search' }
                                                />
                                            </Col>
                                        </Row>
                                    </div>
								</Modal.Header>
								<Modal.Body>	
								
                                <div className="">
                                    <Row>
                                        <Col className="col-4">
                                            <Field
                                                name="logoUrl"
                                                component={ renderFileDrop }
                                                placeholder={"<a><i className='fa fa-plus'/> upload your logo</a>"}
                                            /> 
                                        </Col>
                                        <Col className="col-8">
                                            <div className="logo-gallery">
                                                <ul>
                                                    <li>
                                                        <img src={media1} alt="media1" />
                                                    </li>
                                                    <li>
                                                        <img src={media2} alt="media2" />
                                                    </li>
                                                    <li>
                                                        <img src={media3} alt="media3" />
                                                    </li>
                                                    <li class="selected">
                                                        <img src={media4} alt="media4" />
                                                    </li>
                                                    <li>
                                                        <img src={media5} alt="media5" />
                                                    </li>
                                                    <li>
                                                        <img src={media6} alt="media6" />
                                                    </li>
                                                    <li>
                                                        <img src={media7} alt="media7" />
                                                    </li>
                                                    <li>
                                                        <img src={media8} alt="media8" />
                                                    </li>
                                                    <li>
                                                        <img src={media9} alt="media9" />
                                                    </li>
                                                    <li>
                                                        <img src={media10} alt="media10" />
                                                    </li>
                                                    <li>
                                                        <img src={media1} alt="media1" />
                                                    </li>
                                                    <li>
                                                        <img src={media2} alt="media2" />
                                                    </li>
                                                    <li>
                                                        <img src={media3} alt="media3" />
                                                    </li>
                                                    <li class="selected">
                                                        <img src={media4} alt="media4" />
                                                    </li>
                                                    <li>
                                                        <img src={media5} alt="media5" />
                                                    </li>
                                                    <li>
                                                        <img src={media6} alt="media6" />
                                                    </li>
                                                    <li>
                                                        <img src={media7} alt="media7" />
                                                    </li>
                                                    <li>
                                                        <img src={media8} alt="media8" />
                                                    </li>
                                                    <li>
                                                        <img src={media9} alt="media9" />
                                                    </li>
                                                    <li>
                                                        <img src={media10} alt="media10" />
                                                    </li>
                                                    </ul>
                                                    <ul>
                                                    <li>
                                                        <img src={media1} alt="media1" />
                                                    </li>
                                                    <li>
                                                        <img src={media2} alt="media2" />
                                                    </li>
                                                    <li>
                                                        <img src={media3} alt="media3" />
                                                    </li>
                                                    <li class="selected">
                                                        <img src={media4} alt="media4" />
                                                    </li>
                                                    <li>
                                                        <img src={media5} alt="media5" />
                                                    </li>
                                                    <li>
                                                        <img src={media6} alt="media6" />
                                                    </li>
                                                    <li>
                                                        <img src={media7} alt="media7" />
                                                    </li>
                                                    <li>
                                                        <img src={media8} alt="media8" />
                                                    </li>
                                                    <li>
                                                        <img src={media9} alt="media9" />
                                                    </li>
                                                    <li>
                                                        <img src={media10} alt="media10" />
                                                    </li>
                                                    <li>
                                                        <img src={media1} alt="media1" />
                                                    </li>
                                                    <li>
                                                        <img src={media2} alt="media2" />
                                                    </li>
                                                    <li>
                                                        <img src={media3} alt="media3" />
                                                    </li>
                                                    <li class="selected">
                                                        <img src={media4} alt="media4" />
                                                    </li>
                                                    <li>
                                                        <img src={media5} alt="media5" />
                                                    </li>
                                                    <li>
                                                        <img src={media6} alt="media6" />
                                                    </li>
                                                    <li>
                                                        <img src={media7} alt="media7" />
                                                    </li>
                                                    <li>
                                                        <img src={media8} alt="media8" />
                                                    </li>
                                                    <li>
                                                        <img src={media9} alt="media9" />
                                                    </li>
                                                    <li>
                                                        <img src={media10} alt="media10" />
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <div className="logo-upload-progress">
                                            <ProgressBar now={60} />
                                            </div> */}
                                        </Col>
                                    </Row>
                                </div>
								</Modal.Body>
								<Modal.Footer>
									<div className="modal-btns">
                                        <Button variant="secondary">Unsplash</Button>
                                        <Button variant="primary">Confirm</Button>
                                    </div>
								</Modal.Footer>
							</Modal>
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