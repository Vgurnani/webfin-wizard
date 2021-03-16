import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import WebTemplates ,{ Header,Home, Banner,Blogs, Card ,Tabs, Tab } from 'web-templates';
import { Modal, Button } from 'react-bootstrap'
import ColorPicker from 'components/core/color-picker'
import UploadImageModal from './UploadImageModal'
import { useDispatch, useSelector } from 'react-redux'
import { change as reduxChange } from 'redux-form'
import blogBanner from 'images/blog-banner.png'
import {
    DesktopIcon,
    MobileIcon
} from '../../../utils/svg';
import ButtonLoader from 'components/core/loader/button-loader'
import { getUnsplash } from 'middleware/assessments'
import avatarUrl from 'images/user-avatar.png'

const CustomColor = (props) => {
    const { data, handleColorsData,formName, backFun, previewFile, isSubmit, loading } = props
    const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)
    const dispatch = useDispatch()
    const [ openImageModal, setOpenImage ] = useState(false)
    const [ objColors,  setObjColors ] = useState({})
    const [ colors ,setColors ] = useState(data.colors && JSON.parse(data.colors) || { })
    const [ active,setActiveBox ] = useState('top-menu')
    const [ header, setHeader ] = useState({ heading: data?.header?.heading , subHeading: data?.header?.subHeading  })
    const [ isHeaderBgColor, setHeaderBgColor ] = useState(false)

    useEffect(()=>{
        const query = 'cover'
        dispatch(getUnsplash('/photos',query))
    },[]);
    const handleSearch = (event) => {
        const query = event.target.value
        dispatch(getUnsplash('/photos',query))
    }
    // const [ loading, setLoading ] = useState(false)
    const handleChangeColor = (d) => {
        const colorsData =  Object.assign({}, colors)
        colorsData[ active ] = d.hex
        setColors(colorsData)
        setObjColors(d)
        if(active ==='header-background'){
            dispatch(reduxChange(formName, 'coverImage', null))
        }
    }
    const handleChange = (event,name) => {
        const colorsData =  Object.assign({}, colors)
        colorsData[ name ] = event.target.value
        setColors(colorsData)
        setActiveBox(name)
        if(name === 'header-background'){
            dispatch(reduxChange(formName, 'coverImage', null))
        }
    }
    const handleClick = (name) => {
        setActiveBox(name)
    }
    const handleRadio = (event) => {
        if(event.target.checked){
            const colorsData =  Object.assign({}, colors)
            colorsData[ event.target.name ] = event.target.value
            setColors(colorsData)
        }
    }

    const handleHeaderChange = (event) => {
        const headerObj = { ...header }
        headerObj[ event.target.name ] = event.target.value
        setHeader(headerObj)
        dispatch(reduxChange(formName, 'header', headerObj))
    }

    const toggleImageModal = () => {
        setOpenImage(!openImageModal)
    }
    const getBase64 = (base64) => {
        dispatch(reduxChange(formName, 'coverImage', base64))
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

    const inputViews = () => {

        return(<>
            <div className="color-selector-group">
                <label>Top Menu</label>
                <div onClick={ () => handleClick('top-menu') } className={ `color-box-view ${ active ==='top-menu' ? 'active' : '' }` }>
                    <span className="color-selector-preview" style={ { background: colors[ 'top-menu' ] } } ></span>
                    <input
                        type='text'
                        onChange={ (event) => handleChange(event,'top-menu') }
                        className='form-control'
                        defaultValue={ colors[ 'top-menu' ] }
                        value={ colors[ 'top-menu' ] }
                    />
                </div>
                <div className="font-switcher">
                    {radioView('top-menu-font','#000000','#FFFFFF')}
                </div>
            </div>
            <div className="color-selector-group">
                <label>Button</label>
                <div onClick={ () => handleClick('button') } className={ `color-box-view ${ active ==='button' ? 'active' : '' }` }>
                    <span className="color-selector-preview" style={ { background: colors[ 'button' ] } }></span>
                    <input
                        type='text'
                        onChange={ (event) => handleChange(event,'button') }
                        className='form-control'
                        defaultValue={ colors[ 'button' ] }
                        value={ colors[ 'button' ] }
                    />
                </div>
                <div className="font-switcher">
                    {radioView('button-font','#000000','#FFFFFF')}
                </div>
            </div>
            <div className="color-selector-group">
                <label>Background</label>
                <div onClick={ () => handleClick('background') } className={ `color-box-view ${ active ==='background' ? 'active' : '' }` }>
                    <span className="color-selector-preview" style={ { background: colors[ 'background' ] } }></span>
                    <input
                        type='text'
                        onChange={ (event) => handleChange(event,'background') }
                        className='form-control'
                        defaultValue={ colors[ 'background' ] }
                        value={ colors[ 'background' ] }
                    />
                </div>
                <div className="font-switcher">
                    {radioView('background-font','#000000','#FFFFFF')}
                </div>
            </div>
            {/*<div className="color-selector-group">
                <label>Box Shadow</label>
                <div onClick={ () => handleClick('box-shadow') } className={ `color-box-view ${ active ==='box-shadow' ? 'active' : '' }` }>
                    <span className="color-selector-preview" style={ { background: colors[ 'box-shadow' ] } } ></span>
                    <input
                        type='text'
                        onChange={ (event) => handleChange(event,'box-shadow') }
                        className='form-control'
                        defaultValue={ colors[ 'box-shadow' ] }
                        value={ colors[ 'box-shadow' ] }
                    />
                </div>
        </div>*/}
            <div className="color-selector-group home-bg">
                <label>Home Background</label>
                <div onClick={ () => handleClick('home-background') } className={ `color-box-view ${ active ==='home-background' ? 'active' : '' }` }>
                    <span className="color-selector-preview" style={ { background: colors[ 'home-background' ] } } ></span>
                    <input
                        type='text'
                        onChange={ (event) => handleChange(event,'home-background') }
                        className='form-control'
                        defaultValue={ colors[ 'home-background' ] }
                        value={ colors[ 'home-background' ] }
                    />
                </div>
                <div className="font-switcher">
                    {radioView('home-background-font','#000000','#FFFFFF')}
                </div>
            </div>
        </>)
    }
    const clearImage = () => {
        dispatch(reduxChange(formName, 'coverImage', null))
    }

    const selected = Object.assign({}, data);
    selected[ 'colors' ] = JSON.stringify(colors)
    return(
        <div className='custom-color-palatte'>
            <Modal.Header closeButton>
                <div className="back-to-home">
                    <a href='#' onClick={ backFun }>
                        <span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5 18L9.5 12L15.5 6" stroke="#1B1B1B" strokeLinejoin="round"/>
                            </svg>
                            Back
                        </span>
                    </a>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="custom-color-row">
                    <div className='custom-color-preview'>
                        <div className="preview-switch">
                            <span>
                                Desktop
                            </span>
                            <div className="preview-switcher-wrap">
                                <a className="preview-switcher active">
                                    <DesktopIcon />
                                </a>
                                <a className="preview-switcher">
                                    <MobileIcon />
                                </a>
                            </div>
                        </div>
                        <div className='color-preview wizard-home wizrd-blog-preview color-palate-preview'>
                            <WebTemplates data={ selected || props.data }>
                                <Header>
                                    <Header.Left />
                                    <Header.Right />
                                </Header>
                                <Home>
                                    <Banner>
                                        <h1>
                                            <span>{ data && data.header?.heading }</span>

                                        </h1>
                                        <h5>{ data && data.header?.subHeading }</h5>
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
                            {/*<Field
                                name={ 'coverImage' }
                                component={ renderFileDrop }
                                placeholder={ "<a><i className='fa fa-plus'/> Change Header Image </a>" }
                                isDropText={ data.coverImage ? `<img src=${ data.coverImage } alt='cover' />` : `<img src=${ blogBanner } alt='cover' />` }
                            />*/}
                            <label>
                                <input type="checkbox" name='isHeaderBgColor' checked={ isHeaderBgColor } onChange={ () => {
                                    setHeaderBgColor(!isHeaderBgColor)
                                    setActiveBox('top-menu')
                                } } />
                                No Header image
                            </label>
                            {!isHeaderBgColor && <>
                                <div tabIndex="0" className="undefined avatar-user"><div className="c-avatar cursor-pointer upload-file"><p className=""><a onClick={ toggleImageModal }><i className="fa fa-plus"> Change Header Image </i></a></p><div className="drag-image-box"><p className=""><img src={ data.coverImage || previewFile || blogBanner } alt="cover"/></p></div></div><p></p></div>
                                <UploadImageModal getBase64={ getBase64 } handleSearch={ handleSearch } clearImage={ clearImage } previewFile={ previewFile } fieldName={ 'coverImage' } unsplashImages={ unsplashImages } openModal={ openImageModal } handleToggleModal={ toggleImageModal } /> </>}

                            {isHeaderBgColor && <div className='color-selector'><div className="color-selector-group">
                                <label>Header Background</label>
                                <div onClick={ () => handleClick('header-background') } className={ `color-box-view ${ active == 'header-background' ? 'active' : '' }` }>
                                    <span className="color-selector-preview" style={ { background: colors[ 'header-background' ] } } ></span>
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
                            }

                        </div>
                        <ColorPicker active={ active } data={ data } colors={ objColors } onChange={ handleChangeColor } />
                        <label>Heading</label>
                        <input type='text' name='heading' defaultValue={ data && data.header?.heading }  onChange={ handleHeaderChange } />
                        <label>Sub Heading</label>
                        <input type='text' name='subHeading' defaultValue={ data && data.header?.subHeading } onChange={ handleHeaderChange } />
                    </div>

                </div>
                <div className="color-selector">
                    { inputViews() }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="modal-btns">
                    { isSubmit ? <ButtonLoader
                        button={ <Button variant="primary" onClick={ () => handleColorsData(colors) }>confirm</Button> }
                        loadButton= {
                            <Button disabled={ true } type='button' variant="primary">saving..</Button>
                        }
                        loading={ loading }

                    /> : <Button variant="primary" onClick={ () => handleColorsData(colors) }>Confirm</Button> }
                </div>
            </Modal.Footer>
        </div>
    )
}

CustomColor.propTypes = {
    formName: PropTypes.string,
    previewFile: PropTypes.string,
    data: PropTypes.object,
    handleColorsData: PropTypes.func,
    backFun: PropTypes.func,
    isSubmit: PropTypes.bool,
    formValues: PropTypes.object,
    loading: PropTypes.bool
};
export default CustomColor;