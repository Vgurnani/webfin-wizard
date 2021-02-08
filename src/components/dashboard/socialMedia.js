import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Modal, Row, Col,Button } from 'react-bootstrap'
import { SOCIAL_MEDIA } from 'constants/app'
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
        <Modal show={ openModal } onHide={ () => {setOpenModal(false)} } className="logo-upload-modal">
            <Modal.Header closeButton>
                <div className="logo-upload-header">
                    Social Media
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="">
                    <Row>
                        <Col className="col-7">
                            {
                                SOCIAL_MEDIA.map((item, index) =>
                                    <div key={ index } className='form-group'>
                                        <div className={ 'styled-radio-btn' }>
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
                                    </div>)
                            }
                        </Col>
                        <Col className="col-5">
                            <div>
                                Link to
                                url:
                                {inputRadio &&
                                <input
                                    type='text'
                                    key={ inputRadio ? `notLoadedYet${ inputRadio }` : `loaded${ inputRadio }` }
                                    onChange={ handleChange }
                                    name='url'
                                    defaultValue={ values[ inputRadio ] }
                                    className='form-control'/>}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-btns">
                    { connecting ? <Button disabled={ true } variant="secondary">connecting...</Button> : <Button onClick={ () => connectData(values) } variant="secondary">connect</Button> }
                </div>
            </Modal.Footer>
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