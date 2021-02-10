import React from 'react'
import PropTypes from 'prop-types';
import{ Modal, Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import { renderStyleMultipleRadio } from 'utils/formUtils'
const Niche = (props) => {
    const { onClose , assessmentData } = props
    console.log(assessmentData)
    return(
        <div className="">
            <Modal.Header closeButton>
                <div className="logo-upload-header">
                    What kind of blog do you want?
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
                <div className="modal-btns">
                    <Button onClick={ onClose } variant="secondary">confirm</Button>
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