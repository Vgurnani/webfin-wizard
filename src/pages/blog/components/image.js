import React, { useState, useRef } from 'react'
//import { useSelected, useFocused, useSlate } from 'slate-react';
// import { useSlate } from 'slate-react';
import { Transforms } from 'slate';
import PropTypes from 'prop-types'
import { Button } from './button';
// import { Form } from 'react-bootstrap';
// import { Field } from 'redux-form';
import {
    ImageUploadEditor,
    ToolIcon
} from '../../../utils/svg';
import { Modal , Row, Col } from 'react-bootstrap';
import UploadImage from './uploadImage';
import { dataURLtoFile, getDomain, uId } from 'utils/helpers';
import { imageUpload } from 'middleware/assessments';
import { useSlate, useSelected, useFocused } from 'slate-react';
import { useSelector } from 'react-redux'

export const ImageElement = ({ attributes, children, element }) => {
    const selected = useSelected()
    const [ showTool, setToolOpen ] = useState(false)
    const editor = useSlate();
    const focused = useFocused()
    const imageDiv = useRef();
    const handleRemove = () =>{
        Transforms.removeNodes(editor, element)
    }
    return (
        <div  { ...attributes } >
            <div ref={ imageDiv } contentEditable={ false }>
                <img
                    src={ element.url }
                    style={ {
                        display: 'block',
                        maxWidth: '100%',
                        maxHeight: '20em',
                        boxShadow: `${ selected && focused ? '0 0 0 3px #B4D5FF' : 'none' }`
                    } }
                />
                {selected && focused && <a href='javascript:void(0)' onClick={ () => { setToolOpen(!showTool)} }><ToolIcon/></a>}
                {selected && focused && showTool && <ul className='dropdown-menu slate-custom-tool show'>
                    <li className='dropdown-item'><a href='javascript:void(0)' onClick={ () => handleRemove() } >Delete</a></li>
                </ul>}
            </div>
            {children}
        </div>
    )
}

export const insertImage = (editor, url) => {
    const text = { text: '' }
    const image = [ { type: 'image', url, children: [ text ] },{
        type: 'paragraph',
        children: [
            { text: '' },
        ],
    } ]
    Transforms.insertNodes(editor, image)
}

export const InsertImageButton = ({ bogFormData, handleSubmit }) => {
    const form = useSelector((state) => state.form.blogForm )
    const editor = useSlate();
    const [ loading , setLoader ] = useState(false)
    const [ open, toggleModal ] = useState(false);
    const handleModal = () => {
        toggleModal(!open);
    }

    const submitData = async () => {
        if (bogFormData.slateImage && !bogFormData.slateImage.match('^(http|https)://')){
            setLoader(true)
            const file = dataURLtoFile(bogFormData.slateImage,uId()+'.png')
            const newUrl = await imageUpload(getDomain(),'blog-images',file);
            insertImage(editor, newUrl)
            setLoader(false)
            toggleModal(!open);
        }
    }

    return (
        <>
            <Modal show={ open }  onHide={ handleModal } className="logo-upload-modal" >
                <Modal.Header closeButton>
                    <div className="logo-upload-header">
                        <Row>
                            <Col className="col-6">
                                <Modal.Title>Add image</Modal.Title>
                            </Col>
                        </Row>
                    </div>
                </Modal.Header>
                <UploadImage loading={ loading } previewFile={ form?.values?.slateImage } submitData={ submitData } fieldName={ 'slateImage' } handleSubmit={ handleSubmit } title={ 'Add Image' } />
            </Modal>
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