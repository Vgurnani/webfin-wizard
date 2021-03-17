import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { renderFileDrop } from 'utils/formUtils'
import { bytesToSize } from 'utils/helpers'
import ButtonLoader from 'components/core/loader/button-loader'
import WebTemplates ,{ Header, Home, Banner } from 'web-templates';
import { headerLinksTemplate } from 'utils/helpers'
import { HEADER } from 'constants/app'
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
    const { handleSubmit,allowExtenstions,form,site, submitData,loading,previewFile,clearImage ,fieldName, title } = props
    // const handleSelect = async(id) => {
    //     setSelectedUnsplash(id)
    //     const image = unsplashImages.filter((item) => item.id == id)[ 0 ];
    //     image && dataUrlToBase64(image.urls.regular,function(result){
    //         getBase64(result)
    //     });
    // }
    const data = {
        colors: form?.values?.colors,
        header: form?.values?.header,
        logoUrl: form?.values?.logoUrl,
        logoText: form?.values?.websiteName,
        faviconUrl: form?.values?.faviconUrl,
        coverImage: form?.values?.coverImage,
        headerLinks: headerLinksTemplate(),
        readOnly: true
    }

    const clearImageFun = (event) => {
        clearImage(event, fieldName)
    }
    const previewTemplate = () =>{
        return(<Col className="col-8 name-website-selector-preview wizard-preview">
            <h4>Preview</h4>
            <div className="blog-preview wizrd-blog-preview color-palate-preview wizard-home ">
                <div className='browser-tab-preview'>{data.faviconUrl && <img src={ data.faviconUrl } />}<span>{site?.websiteName}</span></div>
                <WebTemplates data={ data }>
                    <Header>
                        <Header.Left />
                        <Header.Right />
                    </Header>
                    <Home>
                        <Banner>
                            <h1>
                                <span>{ data && data.header?.heading || HEADER.HEADING }</span>

                            </h1>
                            <h5>{ data && data.header?.heading || HEADER.SUB_HEADING }</h5>
                            <div className="wizrd-form-wrapper">
                                <form className="wizrd-newsletter">
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Enter your email" type="text" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Subscribe!</button>
                                </form>
                            </div>
                        </Banner>

                    </Home>
                </WebTemplates>
            </div>
        </Col>)
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
                                    isDrop={ ()=> {} }
                                    allowExtenstions={ allowExtenstions }
                                    placeholder={ "<a><i className='fa fa-plus'/> upload your logo</a>" }
                                    isDropText={ 'Drag your images' }
                                />
                            </Col>
                            {fieldName === 'faviconUrl' ? previewTemplate() : <Col className="col-8 logo-preview-modal">
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
                            </Col>
                            }
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
    form: PropTypes.object,
    site: PropTypes.object,
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
