import React from 'react'
import PropTypes from 'prop-types';
import{ Modal, Button, Row, Col } from 'react-bootstrap';
import { Field } from 'redux-form';
import { renderStyleMultipleRadio } from 'utils/formUtils'
const Niche = (props) => {
    const { onClose , assessmentData } = props

    return(
        <div className="niche-edit-modal">
            <Modal.Header closeButton>
                <div className="logo-upload-header">
                    <Row>
                        <Col className="col-12">
                            <Modal.Title>Niche</Modal.Title>
                        </Col>
                    </Row>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="category-wrapper">
                    <Field
                        name="nicheId"
                        options={ assessmentData.niches || [] }
                        component={ renderStyleMultipleRadio }
                        defaultValue={ 'no' }
                        placeholder={ 'gaveCraving' }
                        className='styled-radio-btn'
                        imgWidth="30px"
                        isIcons={ true }
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-btns text-right">
                    <Button onClick={ onClose } variant="primary">confirm</Button>
                </div>
            </Modal.Footer>
        </div>

    )
}
Niche.propTypes = {
    onClose: PropTypes.func,
    assessmentData: PropTypes.object
};
export default Niche;