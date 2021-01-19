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
							{open && <FontStyleModal setOpen={setOpen} fonts={assessmentData.fonts} />}

							<Modal show={openModal} onHide={handleToggleModal}>
								<Modal.Header closeButton>
								<Modal.Title>Modal heading</Modal.Title>
								</Modal.Header>
								<Modal.Body>	
									<Field
										name="logoUrl"
										component={ renderFileDrop }
										placeholder={"<a><i className='fa fa-plus'/> upload your logo</a>"}
								/>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="secondary" onClick={handleToggleModal}>
											Close
									</Button>
									<Button  variant="primary">
											Save Changes
									</Button>
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