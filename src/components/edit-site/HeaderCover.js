import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import WebTemplates ,{ Header,Home, Banner,Blogs, Card ,Tabs, Tab } from 'web-templates';
import { Modal, Button,Form } from 'react-bootstrap'
import ButtonLoader from 'components/core/loader/button-loader'
import UploadImageModal from 'components/assessment/shared/UploadImageModal'
import { useDispatch, useSelector } from 'react-redux';
import { getUnsplash } from 'middleware/assessments'
import { change as reduxChange } from 'redux-form'
import { headerLinksTemplate } from 'utils/helpers'
import blogBanner from 'images/blog-banner.png'
import { HEADER , SAMPLE_BLOG } from 'constants/app'
import ColorPicker from 'components/core/color-picker'

const HeaderCover = (props) => {
    const { handleSubmit, formValues, previewFile, loading, submitData } = props
    const [ activeCustomColor , setActiveCustomColor ] = useState(false)
    const [ hsl,  setHsl ] = useState(null)
    const [ hsv,  setHsv ] = useState(null)
    const [ colors ,setColors ] = useState(formValues?.colors && JSON.parse(formValues.colors) || { })
    const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)
    const data = {
        colors: colors || formValues?.colors,
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
        setActiveCustomColor(false)
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
    const handleChange = (event,name) => {
        const colorsData =  Object.assign({}, colors)
        colorsData[ name ] = event.target.value
        setColors(colorsData)
        setActiveCustomColor(true)
        dispatch(reduxChange('assessmentUpdateForm', 'colors', JSON.stringify(colorsData)))
        dispatch(reduxChange('assessmentUpdateForm', 'coverImage', null))

    }
    const handleChangeColor = (d) => {
        const colorsData =  Object.assign({}, colors)
        colorsData[ 'header-background' ] = d.hex
        setColors(colorsData)
        setHsl(d.hsl)
        setHsv(d.hsv)
        dispatch(reduxChange('assessmentUpdateForm', 'colors', JSON.stringify(colorsData)))
        dispatch(reduxChange('assessmentUpdateForm', 'coverImage', null))

    }
    const handleClick = () => {
        setActiveCustomColor(true)
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
                <div className="back-to-home"></div>
                {/* <div className="logo-upload-header">
                    <Row>
                        <Col className="col-12">
                            <Modal.Title>Header</Modal.Title>
                        </Col>
                    </Row>
                </div> */}
            </Modal.Header>
            <Modal.Body>
                <div className="custom-color-row color-selector">
                    <div className='custom-color-preview'>
                        <h3 className="preview-head">Preview</h3>
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
                                                        <a href='#'>
                                                            <Card
                                                                image={ SAMPLE_BLOG.BLOG_IMAGE }
                                                            >
                                                                <h3>{ SAMPLE_BLOG.BLOG_NAME }</h3>
                                                                <div className="wizrd-blog-author">
                                                                    {/* <RichTextEditor readOnly={true} initialValue={blog?.content} /> */}
                                                                    <div className="wizrd-blog-author-img">
                                                                        <img src={ SAMPLE_BLOG.USER_IMAGE } alt="" />
                                                                    </div>
                                                                    <div className="wizrd-blog-author-name">
                                                                        { SAMPLE_BLOG.USER_NAME }
                                                                    </div>
                                                                </div>
                                                                <div className="wizrd-blog-date">
                                                                    <span>{ SAMPLE_BLOG.DATE }</span>
                                                                </div>
                                                            </Card>
                                                        </a>
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
                    <div className='custom-color-palate header-text-edit'>
                        <Form.Group>
                            <label>Heading</label>
                            <input className="form-control" type='text' name='heading' defaultValue={ data && data.header?.heading }  onChange={ handleHeaderChange } />
                        </Form.Group>
                        <Form.Group>
                            <label>Tag Line</label>
                            <input className="form-control" type='text' name='subHeading' defaultValue={ data && data.header?.subHeading } onChange={ handleHeaderChange } />
                        </Form.Group>
                        <div className="color-selector-label">
                            <label>Header Text</label>
                            {radioView('header-color','#FFFFFF', '#000000')}
                        </div>

                        {activeCustomColor && <ColorPicker active={ 'header-background' } obj={ { hsl: hsl,hsv: hsv } } colors={ colors } onChange={ handleChangeColor } />}
                    </div>
                    <div className="custom-color-preview header-banner-edit">
                        <h5>Choose an image OR color</h5>
                        <div className="header-color-img">
                            <div className="header-img">
                                <div tabIndex="0" className="undefined avatar-user">
                                    <div className="c-avatar cursor-pointer ">
                                        <div className="drag-image-box">
                                            <p onClick={ toggleImageModal } className="">
                                                <img src={ data.coverImage || previewFile || blogBanner } alt="cover"/>
                                            </p>
                                        </div>
                                        <p className="upload-file">
                                            <a onClick={ toggleImageModal }>
                                                <i className="fa fa-plus"></i>
                                                Change Header Image
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <UploadImageModal getBase64={ getBase64 } handleSearch={ handleSearch } clearImage={ clearImage } previewFile={ previewFile } fieldName={ 'coverImage' } unsplashImages={ unsplashImages } openModal={ openImageModal } handleToggleModal={ toggleImageModal } />
                            </div>
                            <div className="header-color">
                                <div className="color-selector-group">
                                    <div onClick={ () => handleClick('header-background') } className={ `color-box-view ${ activeCustomColor ? 'active' : '' }` }>
                                        <span className="color-selector-preview" style={ { background: colors[ 'header-background' ] } }></span>
                                        <input
                                            type='text'
                                            onChange={ (event) => handleChange(event,'header-background') }
                                            className='form-control'
                                            defaultValue={ colors[ 'header-background' ] }
                                            value={ colors[ 'header-background' ] }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-btns">
                    <Button type='submit' variant="secondary">cancel</Button>
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