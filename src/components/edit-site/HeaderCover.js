import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import WebTemplates ,{ Header,Home, Banner,Blogs, Card ,Tabs, Tab } from 'web-templates';
import { Modal, Button, Row, Col,Form } from 'react-bootstrap'
import ButtonLoader from 'components/core/loader/button-loader'
import UploadImageModal from 'components/assessment/shared/UploadImageModal'
import { useDispatch, useSelector } from 'react-redux';
import { getUnsplash } from 'middleware/assessments'
import { change as reduxChange } from 'redux-form'
import avatarUrl from 'images/user-avatar.png'
import { headerLinksTemplate } from 'utils/helpers'
import blogBanner from 'images/blog-banner.png'
import { HEADER } from 'constants/app'

const HeaderCover = (props) => {
    const { handleSubmit, formValues, previewFile, loading, submitData } = props

    const [ colors ,setColors ] = useState(formValues?.colors && JSON.parse(formValues.colors) || { })
    const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)
    const data = {
        colors: formValues?.colors,
        header: formValues?.header,
        logoUrl: formValues?.logoUrl,
        logoText: formValues?.websiteName,
        coverImage: formValues?.coverImage,
        headerLinks: headerLinksTemplate(),
        readOnly: true
    }
    const [ header, setHeader ] = useState({ heading: data?.header?.heading , subHeading: data?.header?.subHeading  })
    const [ openImageModal, setOpenImage ] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        const query = 'cover'
        dispatch(getUnsplash('/photos',query))
    },[]);
    const getBase64 = (base64) => {
        dispatch(reduxChange('assessmentUpdateForm', 'coverImage', base64))
    }
    const handleSearch = (event) => {
        const query = event.target.value
        dispatch(getUnsplash('/photos',query))
    }
    const toggleImageModal = () => {
        setOpenImage(!openImageModal)
    }
    const handleRadio = (event) => {
        if(event.target.checked){
            const colorsData =  Object.assign({}, colors)
            colorsData[ event.target.name ] = event.target.value
            setColors(colorsData)
            dispatch(reduxChange('assessmentUpdateForm', 'colors', JSON.stringify(colorsData)))
        }
    }
    const clearImage = () => {
        dispatch(reduxChange('assessmentUpdateForm', 'coverImage', null))
    }
    const handleHeaderChange = (event) => {
        const headerObj = { ...header }
        headerObj[ event.target.name ] = event.target.value
        setHeader(headerObj)
        dispatch(reduxChange('assessmentUpdateForm', 'header', headerObj))
    }
    const radioView = (name,value1,value2) => {
        const colorsData =  Object.assign({}, colors)
        return(<div className="font-color-switcher">
            <div className="custom-radio white-color-font">
                <div className="radio-item">
                    <input type="radio" onChange={ handleRadio } value={ value1 } name={ name } id={ `${ name }-white` } checked={ colorsData[ name ] === value1 } required />
                    <label className="label-icon option-white" htmlFor={ `${ name }-white` }><span>A</span></label>
                </div>
            </div>
            <div className="custom-radio black-color-font">
                <div className="radio-item">
                    <input type="radio" onChange={ handleRadio } value={ value2 } name={ name } id={ `${ name }-black` } checked={ colorsData[ name ] === value2 } required />
                    <label className="label-icon option-black" htmlFor={ `${ name }-black` }><span>A</span></label>
                </div>
            </div>
        </div>)
    }
    return(<div className='custom-color-palatte'>
        <Form onSubmit={ handleSubmit(submitData) }>
            <Modal.Header closeButton>
                <div className="logo-upload-header">
                    <Row>
                        <Col className="col-12">
                            <Modal.Title>Header</Modal.Title>
                        </Col>
                    </Row>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="custom-color-row">
                    <div className='custom-color-preview'>
                        <div className='color-preview wizard-home wizrd-blog-preview color-palate-preview'>
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
                                        <h5>{ data && data.header?.subHeading || HEADER.SUB_HEADING }</h5>
                                        <div className="wizrd-form-wrapper">
                                            <form className="wizrd-newsletter">
                                                <div className="form-group">
                                                    <input className="form-control" placeholder="Enter your email" type="text" />
                                                </div>
                                                <button type="submit" className="btn btn-primary">Subscribe!</button>
                                            </form>
                                        </div>
                                    </Banner>
                                    <Blogs>

                                        <Tabs onSelect={ (index, label) => console.log(label + ' selected') }>
                                            <Tab label="Recent">
                                                <ul className="wizrd-blog-list">
                                                    <li>
                                                        <Card
                                                            image={ 'https://homepages.cae.wisc.edu/~ece533/images/boat.png' }
                                                        >
                                                            <h3>The Joy of Cooking</h3>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet praesent eu accumsan, curabitur. Nulla viverra aliquam viverra id a.</p>
                                                            <div className="blogger_deail mt-2">
                                                                <div className="bloggerImage">
                                                                    <img src={ avatarUrl } alt="" />
                                                                </div>
                                                                <div className="bloggerName">
                                                                    json miler
                                                                </div>
                                                                <div className="d-flex w-100 post-time mt-2">
                                                                    <span>March 10, 2021 11:10 PM</span>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </li>

                                                </ul>
                                            </Tab>
                                            <Tab label="Popular"></Tab>
                                        </Tabs>
                                    </Blogs>
                                </Home>
                            </WebTemplates>
                        </div>
                    </div>
                    <div className='custom-color-palate mt-5'>
                        <div className={ 'manage-header' }>
                            {radioView('header-color','#000000','#FFFFFF')}
                            <div tabIndex="0" className="undefined avatar-user"><div className="c-avatar cursor-pointer upload-file"><p className=""><a onClick={ toggleImageModal }><i className="fa fa-plus"> Change Header Image </i></a></p><div className="drag-image-box"><p className=""><img src={ data.coverImage || previewFile || blogBanner } alt="cover"/></p></div></div><p></p></div>
                            <UploadImageModal getBase64={ getBase64 } handleSearch={ handleSearch } clearImage={ clearImage } previewFile={ previewFile } fieldName={ 'coverImage' } unsplashImages={ unsplashImages } openModal={ openImageModal } handleToggleModal={ toggleImageModal } />

                        </div>
                        <Form.Group>
                            <label>Heading</label>
                            <input type='text' name='heading' defaultValue={ data && data.header?.heading }  onChange={ handleHeaderChange } />
                        </Form.Group>
                        <Form.Group>
                            <label>Tag Line</label>
                            <input type='text' name='subHeading' defaultValue={ data && data.header?.subHeading } onChange={ handleHeaderChange } />
                        </Form.Group>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-btns">
                    <ButtonLoader
                        button={ <Button type='submit' variant="primary">confirm</Button> }
                        loadButton= {
                            <Button disabled={ true } type='button' variant="primary">saving..</Button>
                        }
                        loading={ loading }

                    />          </div>
            </Modal.Footer>
        </Form>
    </div>)
}

HeaderCover.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    formValues: PropTypes.object,
    previewFile: PropTypes.string,
    loading: PropTypes.boolean
};

export default HeaderCover