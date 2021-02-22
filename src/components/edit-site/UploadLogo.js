import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { renderFileDrop } from 'utils/formUtils'
import { bytesToSize } from 'utils/helpers'
import
{
    Button,
    Col,
    Row,
    Modal,
}
    from 'react-bootstrap';
const UploadLogo = (props) => {
    const { onClose , assessmentData,previewFile,clearImage ,fieldName } = props
    const [ selectedUnsplash, setSelectedUnsplash ] = useState(null);
    console.log(selectedUnsplash, assessmentData)
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
            <Modal.Header closeButton>
                <div className="logo-upload-header">
                    <Row>
                        <Col className="col-6">
                            <Modal.Title>Site {fieldName === 'logoUrl' ? 'Logo' : 'Icon/ Favicon'}</Modal.Title>
                        </Col>
                        {/*<Col className="col-6 search-wrapper">
                            <Form.Group>
                                <input onChange={ handleSearch } name='search' className='form-control' />
                            </Form.Group>

                        </Col>*/}
                    </Row>
                </div>
            </Modal.Header>
            <Modal.Body>

                <div className="">
                    <Row>
                        <Col className="col-4">
                            <Field
                                name={ fieldName }
                                component={ renderFileDrop }
                                isDrop={ ()=> { setSelectedUnsplash(null)} }
                                placeholder={ "<a><i className='fa fa-plus'/> upload your logo</a>" }
                                isDropText={ 'Drag your images' }
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
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-btns text-right">
                    <Button variant="primary" onClick={ onClose }>Confirm</Button>
                </div>
            </Modal.Footer>
        </div>

    )
}

UploadLogo.propTypes = {
    onClose: PropTypes.func,
    assessmentData: PropTypes.object,
    clearImage: PropTypes.func,
    getBase64: PropTypes.func,
    handleSearch: PropTypes.func,
    unsplashImages: PropTypes.array,
    previewFile: PropTypes.any,
    fieldName: PropTypes.string
};

export default UploadLogo