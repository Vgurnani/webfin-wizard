import React from 'react'
import { Field } from 'redux-form';
import { renderStyleMultipleRadio } from '../../../utils/formUtils'
import PropTypes from 'prop-types';
import
{
    Button
}
    from 'react-bootstrap';
const FontStyleModal = (props) => {
    const { setOpen, fonts } = props;
    return(
        <div className="forget-forms signup-forms">
            <p>Fonts</p>
            <span onClick={ () => setOpen(false) }>close</span>
            <Field
                name="fontStyle"
                options={ fonts }
                component={ renderStyleMultipleRadio }
                defaultValue={ 'no' }
                placeholder={ 'gaveCraving' }
                className='styled-radio-btn btn-outline'
                imgWidth="30px"
                fontStyled={ true }
            />
            <div className="small-wrapper">
                <Button onClick={ () => setOpen(false) } className="btn btn-secondry" type="button">
                    confirm
                </Button>
            </div>
        </div>

    )
}
FontStyleModal.propTypes = {
    setOpen: PropTypes.func,
    fonts: PropTypes.object
};
export default FontStyleModal;