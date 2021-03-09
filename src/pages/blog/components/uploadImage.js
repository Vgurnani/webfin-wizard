import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { renderFileDrop } from 'utils/formUtils'
import { bytesToSize } from 'utils/helpers'
import ButtonLoader from 'components/core/loader/button-loader'

import
{
    Button,
    Col,
    Row,
    Modal,
    Form
}
    from 'react-bootstrap';
const UploadImage = (props) => {
    const { submitData,loading,previewFile,clearImage ,fieldName } = props
    // const handleSelect = async(id) => {
    //     setSelectedUnsplash(id)
    //     const image = unsplashImages.filter((item) => item.id == id)[ 0 ];
    //     image && dataUrlToBase64(image.urls.regular,function(result){
    //         getBase64(result)
    //     });
    // }

    const clearImageFun = (event) => {
        clearImage(event, fieldName)
    }
    return(
        <div className="">
            <Form onSubmit={ () => {} }>
                <Modal.Body>
                    <Row>
                        <Col className="col-4">
                            <Field
                                name={ fieldName }
                                component={ renderFileDrop }
                                isDrop={ ()=> {} }
                                placeholder={ "<a><i className='fa fa-plus'/> upload your image</a>" }
                                isDropText={ 'Drag your image' }
                            />
                        </Col>
                        <Col className="col-8 logo-preview-modal">
                            <div className="logo-preview">
                                <h4>Preview</h4>
                                {previewFile && <div className="preview-logo">
                                    {typeof(previewFile) !== 'string' ?
                                        <span>
                                            {previewFile.name}-{bytesToSize(previewFile.size)}
                                        </span> :
                                        <img src={ previewFile } />
                                    }
                                </div>}
                                {previewFile && <span onClick={ clearImageFun } className="clear-logo">clear</span>}

                            </div>
                            {/* <div className="logo-upload-progress">
                    <ProgressBar now={60} />
                    </div> */}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-btns text-right">
                        <ButtonLoader
                            button={ <Button type='button' onClick={ () => submitData() } variant="primary">confirm</Button> }
                            loadButton= {
                                <Button disabled={ true } type='button' variant="primary">saving..</Button>
                            }
                            loading={ loading }

                        />
                    </div>
                </Modal.Footer>
            </Form>
        </div>

    )
}

UploadImage.propTypes = {
    submitData: PropTypes.func,
    handleSubmit: PropTypes.func,
    onClose: PropTypes.func,
    assessmentData: PropTypes.object,
    clearImage: PropTypes.func,
    getBase64: PropTypes.func,
    handleSearch: PropTypes.func,
    unsplashImages: PropTypes.array,
    previewFile: PropTypes.any,
    fieldName: PropTypes.string,
    loading: PropTypes.bool,
    title: PropTypes.string
};

export default UploadImage