import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { renderFileDrop } from '../../../utils/formUtils'
import 
  {
    Button,
    Col,
	Row,
	Modal,
    Form
  }
from 'react-bootstrap';
const UploadImageModal = (props) => {
    const { openModal, handleToggleModal, unsplashImages , handleSearch} = props
    return(
        <Modal show={openModal} onHide={handleToggleModal} className="logo-upload-modal">
        <Modal.Header closeButton>
            <div className="logo-upload-header">
                <Row>
                    <Col className="col-6">
                        <Modal.Title>Images</Modal.Title>
                    </Col>
                    <Col className="col-6 search-wrapper">
                        <Form.Group>
                            <input onChange={handleSearch} name='search' className='form-control' />
                        </Form.Group>
                       
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
                        isDropText={'Drag your images'}
                    /> 
                </Col>
                <Col className="col-8">
                    <div className="logo-gallery">
                        <ul>
                            {unsplashImages.slice(0,10).map((item,key)=>{
                                return( <li>
                                    <img src={item.urls.small} alt="media1" />
                                </li>)
                            })}
                        </ul>
                        <ul>
                            {unsplashImages.slice(10,20).map((item,key)=>{
                                return( <li>
                                    <img src={item.urls.small} alt="media1" />
                                </li>)
                            })}
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

    )
}

UploadImageModal.propTypes = {
    handleToggleModal: PropTypes.func,
    openModal: PropTypes.bool,
    handleSearch: PropTypes.func

};

export default UploadImageModal