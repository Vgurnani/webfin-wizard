import React from 'react'
import PropTypes from 'prop-types';
import{ Modal, Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import { renderStyleMultipleRadio } from 'utils/formUtils'
const ColourPalette = (props) => {
    const { onClose , assessmentData } = props
    return(
        <div className="">
            <Modal.Header closeButton>
                <div className="logo-upload-header">
                    Choose Your Color Palette!
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="category-wrapper">
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
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-btns">
                    <Button onClick={ onClose } variant="secondary">confirm</Button>
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