import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'middleware/auth'
import { Modal, Form, Button, Accordion, Card  } from 'react-bootstrap'
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { getAssessment, updateAssessment  } from 'middleware/assessments'
import ColourPalette from 'components/edit-site/ColourPalette';
import Niche from 'components/edit-site/Niche'
import UploadLogo from 'components/edit-site/UploadLogo'
import Menu from 'components/edit-site/Menu'
import { change as reduxChange } from 'redux-form'
import searchIcon from '../../images/search.png';
import filterIcon from '../../images/filter.png';
import {
    PageDeleteIcon,
    PageLayoutIcon,
    OpenArrow,
    GreyDeleteIcon,
} from '../../utils/svg';

const EditSitePage =(props) => {
    const dispatch = useDispatch();
    const { handleSubmit , initialize } = props
    const [ open, setOpen ] = useState(false)
    const [ modalType, setModalType ] = useState(null)
    const { assessmentData } = useSelector((state) => state.assessment)
    const form  = useSelector((state) => state.form.assessmentUpdateForm)
    const data = useSelector(state => state.user.sessionData?.data?.data)
    const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)

    const user =  data?.user
    const site =  data?.sites[ 0 ]
    console.log(user,site)
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
        if(site){
            const formData = {
                nicheId: site.niche.id.toString(),
                colourId: site.colour.id.toString(),
                logoUrl: site.logoUrl
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
        setModalType(null)
        setOpen(false)
    }
    const handleSearch = (event) => {
        console.log(event)
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
    const renderModalView = () =>{
        switch(modalType){
        case 'niche':
            return <Niche  assessmentData={ assessmentData } onClose={ handleClose } />
        case 'colour':
            return <ColourPalette assessmentData={ assessmentData } onClose={ handleClose } />
        case 'logo':
            return <UploadLogo fieldName='logoUrl' previewFile={ form?.values?.logoUrl || assessmentData?.logoUrl } unsplashImages={ unsplashImages } clearImage={ clearImage } getBase64={ getBase64 } handleSearch={ handleSearch } assessmentData={ assessmentData } onClose={ handleClose } />
        case 'favicon':
            return <UploadLogo fieldName='faviconUrl' previewFile={ form?.values?.faviconUrl || assessmentData?.faviconUrl } unsplashImages={ unsplashImages } clearImage={ clearImage } getBase64={ getBase64 } handleSearch={ handleSearch } assessmentData={ assessmentData } onClose={ handleClose } />
        case 'menu':
            return <Menu onClose={ handleClose } />
        }
    }
    const submitData = (formData) => {
        dispatch(updateAssessment(site?.id, formData))
    }
    const niche = assessmentData?.niches?.filter((item) => item.value === form?.values?.nicheId.toString())[ 0 ] || site?.niche
    const colour = assessmentData?.colorPalette?.filter((item) => item.value === form?.values?.colourId.toString())[ 0 ] || site?.colour
    return(
        <main className="dashboard-data dashboard-edit-site-wrap">
            <section className="dashboard-body">
                <div className="dashboard-header">
                    <div className="dashboard-title">
                        <h1>Edit Site</h1>
                    </div>
                </div>
                <div className='edit-site-panel'>
                    <Form onSubmit={ handleSubmit(submitData) }>
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
                                        <span style={ { backgroundColor: colour?.colours?.split(',')[ 1 ] || colour?.colors[ 1 ] } }></span>
                                    </span>{ colour?.label }
                                </div>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Menu:</Form.Label>
                                <div className="edit-site-btn" onClick={ (event) => handleModal(event,'menu') }>Select..</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Site logo:</Form.Label>
                                <div className="edit-site-btn no-arrow" onClick={ (event) => handleModal(event,'logo') }>{form?.values?.logoUrl ||site?.logoUrl ? <img src={ form?.values?.logoUrl || site?.logoUrl } width={ 20 } /> : site?.websiteName }</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Site icon:</Form.Label>
                                <div className="edit-site-btn  no-arrow" onClick={ (event) => handleModal(event,'favicon') }>{form?.values?.faviconUrl || site?.faviconUrl ?  <img src={ form?.values?.faviconUrl || site?.faviconUrl } width={ 20 } /> : 'Select..'}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className="edit-header-footer">
                                <Form.Label>Header/Footer:</Form.Label>
                                <Button type='submit'>Edit</Button>
                            </Form.Group>
                        </div>
                        <Modal show={ open } onHide={ handleClose } className="logo-upload-modal">
                            {renderModalView()}
                        </Modal>
                    </Form>
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
                        <li className="active">
                            <div className="page-detail">
                                <div className="page-name">
                                    <h6>Home</h6>
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
                                    <h6>About</h6>
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
                <div className="trash-listing">
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
                </div>
            </section>
        </main>

    )
}
EditSitePage.propTypes = {
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func
};
export default reduxForm({
    form: 'assessmentUpdateForm',
    destroyOnUnmount: false
})(EditSitePage);