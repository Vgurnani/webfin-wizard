import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { renderFileDrop } from '../../../utils/formUtils'
import media1 from '../../../public/images/media/media-1.jpg';
import media2 from '../../../public/images/media/media-2.jpg';
import media3 from '../../../public/images/media/media-3.jpg';
import media4 from '../../../public/images/media/media-4.jpg';
import media5 from '../../../public/images/media/media-5.jpg';
import media6 from '../../../public/images/media/media-6.jpg';
import media7 from '../../../public/images/media/media-7.jpg';
import media8 from '../../../public/images/media/media-8.jpg';
import media9 from '../../../public/images/media/media-9.jpg';
import media10 from '../../../public/images/media/media-10.jpg';
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
    const { openModal, handleToggleModal } = props
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
                            <input name='search' className='form-control' />
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
                        isDropText={'upload photo'}
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

    )
}

UploadImageModal.propTypes = {
    handleToggleModal: PropTypes.func,
    openModal: PropTypes.bool

};

export default UploadImageModal