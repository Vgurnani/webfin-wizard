import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import{ Modal, Button, Row, Col,Form } from 'react-bootstrap';
import { Field } from 'redux-form';
import { renderStyleMultipleRadio } from 'utils/formUtils'
import CustomColor from 'components/assessment/shared/CustomColor'
import {  headerLinksTemplate } from 'utils/helpers'
import { AllColors } from 'constants/theme'
import { change as reduxChange } from 'redux-form'
import { useDispatch } from 'react-redux';
import ButtonLoader from 'components/core/loader/button-loader'

const ColourPalette = (props) => {
    const dispatch = useDispatch();
    const { colorPalette,setColorPalette,handleSubmit,submitData, site, formValues , loading } = props
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
    const saveColorData = (colors) => {
        dispatch(reduxChange('assessmentUpdateForm', 'colors', JSON.stringify(colors)))
    }
    const handleColorsData = (colors) => {
        const obj = { label: 'Custom Color', value: colors,imageUrl: undefined }
        colorPalette.pop()
        colorPalette.push(obj)
        setColorPalette(colorPalette)
        saveColorData(colors)
        formValues[ 'colors' ] = JSON.stringify(colors)
        submitData(formValues)
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
            <Form onSubmit={ handleSubmit(submitData) }>
                {
                    customOpen ? <CustomColor backFun={ () => setCustomPopup(false) } colorPalette={ colorPalette } handleColorsData={ (colors) => handleColorsData(colors) } loading={ loading } isSubmit={ true } data={ data } />  : <>

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
                                <ButtonLoader
                                    button={ <Button type='submit' variant="primary">confirm</Button> }
                                    loadButton= {
                                        <Button disabled={ true } type='button' variant="primary">saving..</Button>
                                    }
                                    loading={ loading }

                                />
                            </div>
                        </Modal.Footer>

                    </>}
            </Form>
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
    site: PropTypes.object,
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    loading: PropTypes.func
};
export default ColourPalette;