import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { renderFileDrop } from 'utils/formUtils';
import { bytesToSize } from 'utils/helpers';
import ButtonLoader from 'components/core/loader/button-loader';
import { dataUrlToBase64,debounce } from 'utils/helpers';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import
{
    Button,
    Col,
    Row,
    Modal,
    Form
}
    from 'react-bootstrap';
const UploadLogo = (props) => {
    const { handleSubmit,allowExtenstions, submitData,loading,previewFile,clearImage ,fieldName, title ,unsplashImages ,getBase64,handleSearch } = props
    // const handleSelect = async(id) => {
    //     setSelectedUnsplash(id)
    //     const image = unsplashImages.filter((item) => item.id == id)[ 0 ];
    //     image && dataUrlToBase64(image.urls.regular,function(result){
    //         getBase64(result)
    //     });
    // }
    const [ selectedUnsplash, setSelectedUnsplash ] = useState(null);
    const unsplashLoading = useSelector((state) => state.assessment.unsplashLoading)
    const handleSelect = async(id) => {
        setSelectedUnsplash(id)
        const image = unsplashImages.filter((item) => item.id == id)[ 0 ];
        image && dataUrlToBase64(image.urls.regular,function(result){
            getBase64(result, fieldName)
        });
    }

    const clearImageFun = (event) => {
        setSelectedUnsplash(null)
        clearImage(event, fieldName)
    }

    return(
        <div className="">
            <Form onSubmit={ handleSubmit(submitData) }>
                <Modal.Header closeButton>
                    <div className="logo-upload-header">
                        <Row>
                            <Col className="col-6">
                                <Modal.Title>{title || `Site ${ fieldName === 'logoUrl' ? 'Logo' : 'Icon/ Favicon' }`}</Modal.Title>
                            </Col>
                            <Col className="col-6 search-wrapper">
                                <Form.Group>
                                    <input onChange={ (event) => debounce(handleSearch,event,1000) } name='search' className='form-control' />
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
                                    allowExtenstions={ allowExtenstions }
                                    placeholder={ `<a><i className='fa fa-plus'/> upload your ${ title || fieldName === 'logoUrl' ? 'Logo' : 'Icon/ Favicon' } </a>` }
                                    isDropText={ 'Drag your image' }
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
                                    { unsplashLoading ?  <div className='unsplash-emtpy'><div className="small-up-loader btn-loader ">
                                        <div className="lds-facebook"><div></div><div></div><div></div></div>
                                    </div></div> : null }
                                    {_.isEmpty(unsplashImages) && !unsplashLoading ? <div className='unsplash-emtpy'><p>No Records found</p></div> : <>
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
                                    </>
                                    }
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
                        <ButtonLoader
                            button={ <Button type='submit' variant="primary">confirm</Button> }
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

UploadLogo.propTypes = {
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
    allowExtenstions: PropTypes.array,
    title: PropTypes.string
};

export default UploadLogo