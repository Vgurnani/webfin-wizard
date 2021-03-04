import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'middleware/auth'
import { Modal, Form, Button } from 'react-bootstrap'
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { getAssessment, updateAssessment  } from 'middleware/assessments'
import ColourPalette from 'components/edit-site/ColourPalette';
import Niche from 'components/edit-site/Niche'
import UploadLogo from 'components/edit-site/UploadLogo'
import MenuLinks from 'components/edit-site/MenuLinks'
import _ from 'lodash';
import { change as reduxChange } from 'redux-form'
import searchIcon from '../../images/search.png';
import filterIcon from '../../images/filter.png';
import {
    //PageDeleteIcon,
    PageLayoutIcon,
    // OpenArrow,
    // GreyDeleteIcon,
} from '../../utils/svg';
import { AllColors } from 'constants/theme'

const EditSitePage =(props) => {
    const dispatch = useDispatch();
    const { handleSubmit , initialize } = props
    const [ open, setOpen ] = useState(false)
    const [ isValid, setIsValid ] = useState(true)
    const [ loadData, setLoadData ] = useState(false)
    const [ modalType, setModalType ] = useState(null)
    const { assessmentData ,updateAssessmentLoader } = useSelector((state) => state.assessment)
    const form  = useSelector((state) => state.form.assessmentUpdateForm)
    const data = useSelector(state => state.user.sessionData?.data?.data)
    const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)
    const [ menuLinks, setMenuLinks ] = useState(form?.values?.menuLinks)
    const [ colorPalette , setColorPalette ] = useState(AllColors())
    const site =  data?.sites[ 0 ]

    useEffect(() => {
        dispatch({
            type: 'SET_ACTIVE_SIDEBAR',
            payload: 'edit-site'
        })
        dispatch(getAssessment())
        dispatch(getCurrentUser());
        //dispatch(getUnsplash('/photos','cat'))
    }, [  ]);

    useEffect(() => {
        if(!_.isEmpty(form?.values?.menuLinks)){
            setMenuLinks(form?.values?.menuLinks)
        }
    }, [ form?.values?.menuLinks ])

    useEffect(() => {
        if(!_.isEmpty(form?.values?.colors && JSON.parse(form?.values?.colors)?.name === 'custom-color')){
            const obj = { label: 'Custom Color', value: JSON.parse(form?.values?.colors),imageUrl: undefined }
            colorPalette.pop()
            colorPalette.push(obj)
            setColorPalette(colorPalette)
        }
    }, [ form?.values?.colors ])

    useEffect(() => {
        if(site){
            const formData = {
                niche: JSON.stringify({ id: site.niche.id.toString(),label:  site.niche.label }),
                colors: site.colors,
                logoUrl: site.logoUrl,
                coverImage: site.coverImage,
                faviconUrl: site.faviconUrl,
                menuLinks: _.isEmpty(site.menuLinks ) ? [ { name: 'home',url: '/' } ] : site.menuLinks
            }
            initialize(formData)
        }

    }, [ site ])
    const handleModal = (event, type) => {
        event.preventDefault()
        setModalType(!open ? type : null)
        setOpen(!open)
    }
    const handleClose = () => {
        const updatedMenuLinks = _.filter(menuLinks,v => _.keys(v).length !== 0);
        setMenuLinks(updatedMenuLinks)
        dispatch(reduxChange('assessmentUpdateForm', 'menuLinks', updatedMenuLinks))
        setModalType(null)
        setOpen(false)
    }
    const handleSearch = () => {
        //let query  = getLabel(assessmentData.niches, '1')
        //query = event.currentTarget.value || query
        //dispatch(getUnsplash('/photos',query))
    }

    const getBase64 = (base64) => {
        dispatch(reduxChange('assessmentUpdateForm', 'logoUrl', base64))
    }

    const clearImage = (event, field) => {
        event.preventDefault()
        dispatch(reduxChange('assessmentUpdateForm', field, null))
    }
    const addMenuLinks = () =>{
        const obj = {}
        setLoadData(true)
        const menuLinksClone = Object.assign([],menuLinks)
        menuLinksClone.push(obj)
        setMenuLinks(menuLinksClone)
        setTimeout(()=>{
            setLoadData(false)
        })
    }

    const validUrls = () => {
        const names= menuLinks.map((item)=> item.name)
        const isDuplicateName =  !_.isEmpty(names.filter((item, index) => names.indexOf(item) != index))
        const urls= menuLinks.map((item)=> item.url)
        const isDuplicateUrl =  !_.isEmpty(urls.filter((item, index) => urls.indexOf(item) != index))
        if(isDuplicateName || isDuplicateUrl){
            setIsValid(false)
        }else{
            setIsValid(true)
        }
    }

    const removeMenuLink = (index) => {
        menuLinks.splice(index, 1);
        setMenuLinks(menuLinks)
        validUrls()
    }

    const generateUrl = (str) => {
        return '/'+str.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, '-').toLowerCase();
    }

    const handleChangeMenuLink = (event, index) =>{
        event.preventDefault();
        if(!event.target.value.match(/[&/\\#, +()@$~%.'":*?<>{}0-9]/g)){
            setLoadData(true)
            const name = event.target?.value?.toLowerCase()?.trim() && event.target?.value?.toLowerCase()?.trim().replace(/[&/\\#, +()@$~%.'":*?<>{}0-9]/g,'')
            const obj = { name: name, url: generateUrl(event.target.value.trim()) }
            menuLinks[ index ] = obj
            setMenuLinks(menuLinks)
            validUrls()
            dispatch(reduxChange('assessmentUpdateForm', 'menuLinks', menuLinks))
            setTimeout(()=> setLoadData(false))
        }
    }
    const submitData = (formData) => {
        dispatch(updateAssessment(site?.id, formData, site.domain, handleClose))
    }

    const renderModalView = () =>{
        switch(modalType){
        case 'niche':
            return <Niche form={ form } handleSubmit={ handleSubmit }  submitData= { submitData } assessmentData={ assessmentData } loading={ updateAssessmentLoader } />
        case 'colour':
            return <ColourPalette handleSubmit={ handleSubmit }  submitData= { submitData } formValues={ form.values }  site={ site }  setColorPalette={ setColorPalette } colorPalette={ colorPalette }  onClose={ handleClose }  loading={ updateAssessmentLoader } />
        case 'logo':
            return <UploadLogo handleSubmit={ handleSubmit }  submitData= { submitData }fieldName='logoUrl' previewFile={ form?.values?.logoUrl } unsplashImages={ unsplashImages } clearImage={ clearImage } getBase64={ getBase64 } handleSearch={ handleSearch } assessmentData={ assessmentData } loading={ updateAssessmentLoader } />
        case 'menulinks':
            return  <MenuLinks handleSubmit={ handleSubmit }  submitData= { submitData } isValid={ isValid } removeMenuLink={ removeMenuLink } handleChangeMenuLink={ handleChangeMenuLink } loadData={ loadData } menuLinks={ menuLinks } addMenuLinks={ addMenuLinks } loading={ updateAssessmentLoader } />
        case 'favicon':
            return <UploadLogo handleSubmit={ handleSubmit }  submitData= { submitData } fieldName='faviconUrl' previewFile={ form?.values?.faviconUrl } unsplashImages={ unsplashImages } clearImage={ clearImage } getBase64={ getBase64 } handleSearch={ handleSearch } assessmentData={ assessmentData } loading={ updateAssessmentLoader } />
        }
    }
    const niche = assessmentData?.niches?.filter((item) => item.value === form?.values?.nicheId && JSON.parse(form?.values?.nicheId).id)[ 0 ] || site?.niche
    return(
        <main className="dashboard-data dashboard-edit-site-wrap">
            <section className="dashboard-body">
                <div className="dashboard-header">
                    <div className="dashboard-title">
                        <h1>Edit Site</h1>
                    </div>
                </div>
                <div className='edit-site-panel'>
                    <div className="edit-site-btns">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Blog / Niche:</Form.Label>
                            <div className="edit-site-btn" onClick={ (event) => handleModal(event,'niche') }>
                                <img src={ niche?.icon } />{ niche?.label}
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Color palette:</Form.Label>
                            <div className="edit-site-btn" onClick={ (event) => handleModal(event,'colour') }>
                                <span className="checkbox-colors round-border">
                                    <span style={ { backgroundColor: form?.values?.colors && JSON.parse(form?.values?.colors)[ 'top-menu' ] } }></span>
                                </span>{ form?.values?.colors && JSON.parse(form?.values?.colors)?.name }
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Menu:</Form.Label>
                            <div className="edit-site-btn" onClick={ (event) => handleModal(event,'menulinks') }>Select..</div>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Site logo:</Form.Label>
                            <div className="logo-preview-btn edit-site-btn no-arrow" onClick={ (event) => handleModal(event,'logo') }>{form?.values?.logoUrl  ? <img src={ form?.values?.logoUrl || site?.logoUrl } width={ 20 } /> : site?.websiteName }</div>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Site icon:</Form.Label>
                            <div className="logo-preview-btn edit-site-btn  no-arrow" onClick={ (event) => handleModal(event,'favicon') }>{form?.values?.faviconUrl ?  <img src={ form?.values?.faviconUrl || site?.faviconUrl } width={ 20 } /> : 'Select..'}</div>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="edit-header-footer">
                            <Form.Label>Header/Footer:</Form.Label>
                        </Form.Group>
                    </div>
                    <Modal show={ open } onHide={ handleClose } className="logo-upload-modal">
                        {renderModalView()}
                    </Modal>
                </div>
                <div className="dashboard-header site-filter-header">
                    <div className="dashboard-title">
                        {/* <h3>Pages</h3> */}
                    </div>
                    <div className="dashboard-actions">
                        <Form className="search-form">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control className="form-control" placeholder="Search" />
                            </Form.Group>
                            <Button className="btn-search" type="submit">
                                <img src={ searchIcon } alt={ 'searchIcon' } />
                            </Button>
                        </Form>
                        <a className="btn-filter" href="/">
                            <img src={ filterIcon } alt={ 'filterIcon' } />
                        </a>
                    </div>
                </div>
                <div className="pages-listing">
                    <ul>
                        <li className="add-new-page">
                            <a className="btn">
                                Add Page
                            </a>
                        </li>
                        {site?.menuLinks?.map((item,index) => {
                            return(<PageView item={ item } key={ index } index={ index } />)
                        })}

                    </ul>
                </div>
                {/*<div className="trash-listing">
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={ Button } variant="link" eventKey="0">
                                    <span>
                                        <span className="heading-icon"><GreyDeleteIcon /></span>
                                        Trash
                                    </span>
                                    <OpenArrow />
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <div className="pages-listing">
                                        <ul>
                                            <li>
                                                <div className="page-detail">
                                                    <div className="page-name">
                                                        <h6>Recipes</h6>
                                                        <Form.Check
                                                            type="switch"
                                                            id="custom-switch"
                                                            label="Live"
                                                        />
                                                    </div>
                                                    <div className="page-layout">
                                                        <div className="page-layout-img">
                                                            <PageLayoutIcon />
                                                        </div>
                                                        <a>Edit</a>
                                                    </div>
                                                    <div className="page-action">
                                                        <div className="page-action-btns">
                                                            <a className="btn">View</a>
                                                            <a className="btn">Clone</a>
                                                        </div>
                                                        <div className="page-delete">
                                                            <a><PageDeleteIcon /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="page-detail">
                                                    <div className="page-name">
                                                        <h6>Contact</h6>
                                                        <Form.Check
                                                            type="switch"
                                                            id="custom-switch"
                                                            label="Live"
                                                        />
                                                    </div>
                                                    <div className="page-layout">
                                                        <div className="page-layout-img">
                                                            <PageLayoutIcon />
                                                        </div>
                                                        <a>Edit</a>
                                                    </div>
                                                    <div className="page-action">
                                                        <div className="page-action-btns">
                                                            <a className="btn">View</a>
                                                            <a className="btn">Clone</a>
                                                        </div>
                                                        <div className="page-delete">
                                                            <a><PageDeleteIcon /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
    </div>*/}
            </section>
        </main>

    )
}
EditSitePage.propTypes = {
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func
};

export const PageView = ( props ) => {
    const { item } = props
    if(item.name){
        return(
            <li className="active">
                <div className="page-detail">
                    <div className="page-name">
                        <h6>{ item?.name?.uppercase() }</h6>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Live"
                            checked={ true }
                        />
                    </div>
                    <div className="page-layout">
                        <div className="page-layout-img">
                            <PageLayoutIcon />
                        </div>
                        <a>Edit</a>
                    </div>
                    <div className="page-action">
                        {/*<div className="page-action-btns">
                            <a className="btn">View</a>
                            <a className="btn">Clone</a>
                        </div>
                        <div className="page-delete">
                            <a><PageDeleteIcon /></a>
                        </div>*/}
                    </div>
                </div>
            </li>)
    }else{ return null }

}
PageView.propTypes = {
    item: PropTypes.object,
};
String.prototype.uppercase = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
};
export default reduxForm({
    form: 'assessmentUpdateForm',
    destroyOnUnmount: false
})(EditSitePage);