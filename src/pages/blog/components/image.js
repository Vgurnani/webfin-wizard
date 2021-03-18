import React, { useState, useRef, useEffect } from 'react'
//import { useSelected, useFocused, useSlate } from 'slate-react';
// import { useSlate } from 'slate-react';
import { Transforms } from 'slate';
import PropTypes from 'prop-types'
import { Button } from './button';
import { Form } from 'react-bootstrap';
import useOutsideClick  from 'components/hoc/OutsideClick'
// import { Field } from 'redux-form';
import {
    ImageUploadEditor,
    ToolIcon
} from '../../../utils/svg';
import { Modal , Row, Col } from 'react-bootstrap';
import UploadImage from './uploadImage';
import { dataURLtoFile, getDomain, uId , debounce } from 'utils/helpers';
import { imageUpload } from 'middleware/assessments';
import { useSlate, useSelected, useFocused } from 'slate-react';
import { useSelector , useDispatch } from 'react-redux'
import { getUnsplash } from 'middleware/assessments'
import { change as reduxChange } from 'redux-form'

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

export const InsertImageButton = ({ blogFormData, handleSubmit }) => {
    const inputRef = useRef(null)
    const form = useSelector((state) => state.form.blogForm )
    const userData = useSelector(state => state.user.sessionData?.data?.data)
    const site = userData?.sites[ 0 ] || {}
    const editor = useSlate();
    const dispatch = useDispatch()
    const [ loading , setLoader ] = useState(false)
    const [ open, toggleModal ] = useState(false);
    const handleModal = () => {
        toggleModal(!open);
    }
    useEffect(() => {
        dispatch(getUnsplash('/photos',site?.niche?.label ))
    },[ site.niche ])
    const handleSearch = (event) => {
        const query = event.target.value || site?.niche?.label
        dispatch(getUnsplash('/photos',query))
    }

    const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)

    const submitData = async () => {
        if (blogFormData.slateImage && !blogFormData.slateImage.match('^(http|https)://')){
            setLoader(true)
            const file = dataURLtoFile(blogFormData.slateImage,uId()+'.png')
            const newUrl = await imageUpload(getDomain(),'blog-images',file);
            insertImage(editor, newUrl)
            setLoader(false)
            toggleModal(!open);
        }
    }
    const getBase64 = (base64) =>{
        dispatch(reduxChange('blogForm', 'slateImage', base64))
    }
    const clearImage = () =>{
        dispatch(reduxChange('blogForm', 'slateImage', null))
    }
    useOutsideClick(inputRef, () => {
        inputRef.current.blur()
    });

    return (
        <>
            <Modal show={ open }  onHide={ handleModal } className="logo-upload-modal" >
                <Modal.Header closeButton>
                    <div className="logo-upload-header">
                        <Row>
                            <Col className="col-6">
                                <Modal.Title>Add Image </Modal.Title>
                            </Col>
                            <Col className="col-6 search-wrapper">
                                <Form.Group>
                                    <input ref={ inputRef } onClick={ () => {
                                        inputRef.current.focus()
                                    } } onChange={ (event) => debounce(handleSearch,event,1000) } disabled={ false } name='search' className='form-control' />
                                </Form.Group>

                            </Col>
                        </Row>
                    </div>
                </Modal.Header>

                <UploadImage
                    loading={ loading }
                    unsplashImages={ unsplashImages }
                    getBase64={ getBase64 }
                    clearImage={ clearImage }
                    previewFile={ form?.values?.slateImage }
                    submitData={ submitData }
                    fieldName={ 'slateImage' }
                    handleSubmit={ handleSubmit }
                    title={ 'Add Image' }
                />
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
    blogFormData: PropTypes.any,
    handleSubmit: PropTypes.any
}

ImageElement.propTypes = {
    attributes: PropTypes.any,
    children: PropTypes.any,
    element: PropTypes.any,
}