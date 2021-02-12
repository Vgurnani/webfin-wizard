import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { renderFileDrop } from '../../../utils/formUtils'
import { dataUrlToBase64, bytesToSize } from '../../../utils/helpers'
import
{
    Button,
    Col,
    Row,
    Modal,
    Form
}
    from 'react-bootstrap';
const UploadImageModal = (props) => {
    const { openModal, handleToggleModal, fieldName,unsplashImages ,getBase64,clearImage, handleSearch, previewFile } = props
    const [ selectedUnsplash, setSelectedUnsplash ] = useState(null);
    const handleSelect = async(id) => {
        setSelectedUnsplash(id)
        const image = unsplashImages.filter((item) => item.id == id)[ 0 ];
        image && dataUrlToBase64(image.urls.regular,function(result){
            getBase64(result)
        });
    }

    const clearImageFun = (event) => {
        setSelectedUnsplash(null)
        clearImage(event)
    }
    return(
        <Modal show={ openModal } onHide={ handleToggleModal } className="logo-upload-modal">
            <Modal.Header closeButton>
                <div className="logo-upload-header">
                    <Row>
                        <Col className="col-6">
                            <Modal.Title>Images</Modal.Title>
                        </Col>
                        <Col className="col-6 search-wrapper">
                            <Form.Group>
                                <input onChange={ handleSearch } name='search' className='form-control' />
                            </Form.Group>

                        </Col>
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
                            {previewFile && <div className="preview-logo">

                                {typeof(previewFile) !== 'string' ?
                                    <span>
                                        {previewFile.name}-{bytesToSize(previewFile.size)}
                                    </span> :
                                    <img src={ previewFile } />
                                }
                                <span onClick={ clearImageFun } className="clear-logo">clear</span>
                            </div>}
                        </Col>
                        <Col className="col-8">
                            <div className="logo-gallery">
                                <ul>
                                    {unsplashImages.slice(0,10).map((item)=>{
                                        return( <li onClick={ () => handleSelect(item.id) } key={ item.id } className={ `${ selectedUnsplash === item.id ? 'active' : '' }` }>
                                            <img src={ item.urls.small } alt="media1" />
                                        </li>)
                                    })}
                                </ul>
                                <ul>
                                    {unsplashImages.slice(10,20).map((item)=>{
                                        return( <li onClick={ () => handleSelect(item.id) } key={ item.id } className={ `${ selectedUnsplash === item.id ? 'active' : '' }` }>
                                            <img src={ item.urls.small } alt="media1" />
                                        </li>)
                                    })}
                                </ul>
                            </div>
                            {/* <div className="logo-upload-progress">
                    <ProgressBar now={60} />
                    </div> */}
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-btns">
                    <Button variant="primary" onClick={ handleToggleModal }>Confirm</Button>
                </div>
            </Modal.Footer>
        </Modal>

    )
}

UploadImageModal.propTypes = {
    handleToggleModal: PropTypes.func,
    openModal: PropTypes.bool,
    handleSearch: PropTypes.func,
    getBase64: PropTypes.func,
    clearImage: PropTypes.func,
    previewImage: PropTypes.object,
    fieldName: PropTypes.string,
    unsplashImages: PropTypes.array,
    previewFile: PropTypes.object

};

export default UploadImageModal