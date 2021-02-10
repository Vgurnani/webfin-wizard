import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Modal, Row, Col,Button,Form } from 'react-bootstrap'
import { SOCIAL_MEDIA } from 'constants/app'
import twitter  from './../../images/twitter-color.png'
const SocialMedia =(props) => {
    const [ values, setValues ] = useState({})
    const [ inputRadio , setInputRadio ] = useState('facebook')
    const { openModal , setOpenModal, connectData, connecting, socialMediaLinks } = props

    const handleChange = (event) => {
        values[ inputRadio ] = event.target.value
        setValues(values)
    }
    const handleRadioChange = (event) => {
        setInputRadio(event.target.value)
    }
    useEffect(() => {
        setValues(socialMediaLinks)
    },[ socialMediaLinks ])
    return(
        <Modal show={ openModal } onHide={ () => {setOpenModal(false)} } className="logo-upload-modal social-connect-modal">
            <Modal.Header closeButton>
                <div className="logo-upload-header">
                    <Row>
                        <Col className="col-12">
                            <Modal.Title>Social Media</Modal.Title>
                        </Col>
                    </Row>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="col-8 ">
                        <Row>
                            { SOCIAL_MEDIA.map((item, index) =>
                                <Col className="col-6" key={ index }>
                                    <div className='form-group'>
                                        <div className={ 'styled-radio-btn' } id={ item.value }>
                                            <input
                                                type="radio"
                                                onChange={ handleRadioChange }
                                                id={ item.value }
                                                name={ 'social-icon' }
                                                value={ item.value }
                                                className="styled-radio"
                                                checked={ item.value === (inputRadio || 'facebook') }
                                            />
                                            <div className='input-radio-label'>
                                                <span className='emojiText mb-0 mt-1'>
                                                    {item.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Col>)
                            }
                        </Row>
                    </Col>
                    <Col className="col-4 social-url-form">
                        <div className="social-url-title">
                            <h4>Link To: Twitter</h4>
                            <div className="social-url-img">
                                <img src={ twitter } />
                            </div>
                            <div className="form-group">
                                <Form.Label>URL:</Form.Label>
                                {inputRadio &&
                                <input
                                    type='text'
                                    key={ inputRadio ? `notLoadedYet${ inputRadio }` : `loaded${ inputRadio }` }
                                    onChange={ handleChange }
                                    placeholder="Enter your URL"
                                    label="URL"
                                    name='url'
                                    defaultValue={ values[ inputRadio ] }
                                    className='form-control'/>}
                            </div>
                        </div>
                        <div className="modal-btns">
                            { connecting ? <Button disabled={ true } variant="primary">connecting...</Button> : <Button onClick={ () => connectData(values) } variant="primary">connect</Button> }
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>)
}

SocialMedia.propTypes = {
    openModal: PropTypes.bool,
    setOpenModal: PropTypes.func,
    connectData: PropTypes.func,
    connecting: PropTypes.bool,
    socialMediaLinks: PropTypes.object
}

export default SocialMedia