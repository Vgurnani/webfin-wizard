import React, { useState } from 'react'
//import { useSelected, useFocused, useSlate } from 'slate-react';
// import { useSlate } from 'slate-react';
import { Transforms } from 'slate';
import PropTypes from 'prop-types'
import { Button } from './button';
// import { Form } from 'react-bootstrap';
// import { Field } from 'redux-form';
import {
    ImageUploadEditor
} from '../../../utils/svg';
import ModalBox from 'components/core/modal';
import UploadImage from './uploadImage';
import { dataURLtoFile, getDomain, uId } from 'utils/helpers';
import { imageUpload } from 'middleware/assessments';
import { useSlate } from 'slate-react';

export const ImageElement = ({ attributes, children, element }) => {
    // const selected = useSelected()
    // const focused = useFocused()
    return (
        <div { ...attributes }>
            <div contentEditable={ false }>
                <img
                    src={ element.url }
                />
            </div>
            {children}
        </div>
    )
}

export const insertImage = (editor, url) => {
    const text = { text: '' }
    const image = { type: 'image', url, children: [ text ] }
    Transforms.insertNodes(editor, image)
}

export const InsertImageButton = ({ bogFormData, handleSubmit }) => {
    const editor = useSlate();
    const [ open, toggleModal ] = useState(false);
    const handleModal = () => {
        toggleModal(!open);
    }

    const submitData = async () => {
        if (bogFormData.slateImage && !bogFormData.slateImage.match('^(http|https)://')){
            const file = dataURLtoFile(bogFormData.slateImage,uId()+'.png')
            const newUrl = await imageUpload(getDomain(),'blog-images',file);
            console.log('newUrl', newUrl);
            insertImage(editor, newUrl)
        }
    }

    return (
        <>
            <ModalBox open={ open } handleClose={ handleModal } >
                <UploadImage submitData={ submitData } fieldName={ 'slateImage' } handleSubmit={ handleSubmit } title={ 'Add Image' } />
            </ModalBox>
            <Button
                onMouseDown={ event => {
                    event.preventDefault()
                    // const url = window.prompt('Enter the URL of the image:')
                    // if (!url) return
                    // insertImage(editor, url)
                    handleModal();
                } }
            >
                <ImageUploadEditor />
            </Button>
        </>
    )
}

InsertImageButton.propTypes = {
    bogFormData: PropTypes.any,
    handleSubmit: PropTypes.any
}

ImageElement.propTypes = {
    attributes: PropTypes.any,
    children: PropTypes.any,
    element: PropTypes.any,
}