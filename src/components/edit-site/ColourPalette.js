import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import{ Modal, Button, Row, Col } from 'react-bootstrap';
import { Field } from 'redux-form';
import { renderStyleMultipleRadio } from 'utils/formUtils'
import CustomColor from 'components/assessment/shared/CustomColor'
import {  headerLinksTemplate } from 'utils/helpers'
import { AllColors } from 'constants/theme'

const ColourPalette = (props) => {
    const { onClose, colorPalette,setColorPalette, site, formValues,saveColorData  } = props
    const data = {
        colors: formValues.colors,
        logoUrl: formValues.logoUrl,
        logoText: formValues.websiteName,
        coverImage: formValues.coverImage,
        headerLinks: headerLinksTemplate(),
        readOnly: true
    }
    const [ customOpen, setCustomPopup ] = useState(false)
    useEffect(() => {
        if(formValues.colors){
            setCustomPopup(JSON.parse(formValues.colors).name === 'custom-color' )
        }

    },[ formValues.colors ])
    const handleColorsData = (colors) => {
        const obj = { label: 'Custom Color', value: colors,imageUrl: undefined }
        colorPalette.pop()
        colorPalette.push(obj)
        setColorPalette(colorPalette)
        saveColorData(colors)
    }
    const setCustomColor = () => {
        const obj = { label: 'Custom Color', value: JSON.parse(site.colors),imageUrl: undefined }
        colorPalette.pop()
        colorPalette.push(obj)
        return colorPalette
    }
    const handleColorChange = ( event ) => {
        site && JSON.parse(site.colors)?.name === 'custom-color' ? setColorPalette(setCustomColor()) : setColorPalette(AllColors())
        const obj = event.currentTarget.value &&  JSON.parse(event.currentTarget.value)
        obj.name === 'custom-color' ? setCustomPopup(!customOpen) : null
    }
    return(
        <div className="color-palette-popup">
            {
                customOpen ? <CustomColor backFun={ () => setCustomPopup(false) } colorPalette={ colorPalette } handleColorsData={ (colors) => handleColorsData(colors) } data={ data } />  : <>
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
                                    name="colors"
                                    options={ colorPalette || []  }
                                    component={ renderStyleMultipleRadio }
                                    defaultValue={ 'no' }
                                    handleChange={ handleColorChange }
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
                </>}
        </div>

    )
}
ColourPalette.propTypes = {
    onClose: PropTypes.func,
    assessmentData: PropTypes.object,
    colorPalette: PropTypes.array,
    formValues: PropTypes.func,
    setColorPalette: PropTypes.func,
    saveColorData: PropTypes.func,
    site: PropTypes.object
};
export default ColourPalette;