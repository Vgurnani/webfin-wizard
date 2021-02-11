import React from 'react'
import PropTypes from 'prop-types';
import{ Modal, Button, Row, Col } from 'react-bootstrap';
import { Field } from 'redux-form';
import { renderStyleMultipleRadio } from 'utils/formUtils'
const ColourPalette = (props) => {
    const { onClose , assessmentData } = props
    return(
        <div className="color-palette-popup">
            <Modal.Header closeButton>
                <div className="logo-upload-header">
                    <Row>
                        <Col className="col-12">
                            <Modal.Title>Color palette</Modal.Title>
                        </Col>
                    </Row>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="color-palatte">
                    <div className="color-palatte-selector">
                        <Field
                            name="colourId"
                            options={ assessmentData.colorPalette || []  }
                            component={ renderStyleMultipleRadio }
                            defaultValue={ 'no' }
                            placeholder={ 'gaveCraving' }
                            isColors={ true }
                            className='styled-radio-btn btn-outline'
                            imgWidth="30px"
                        />
                    </div>
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
ColourPalette.propTypes = {
    onClose: PropTypes.func,
    assessmentData: PropTypes.object
};
export default ColourPalette;