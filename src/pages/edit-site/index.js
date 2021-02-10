import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'middleware/auth'
import { Row , Col ,Modal, Form, Button  } from 'react-bootstrap'
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { getAssessment, updateAssessment  } from 'middleware/assessments'
import ColourPalette from 'components/edit-site/ColourPalette';
import Niche from 'components/edit-site/Niche'
import UploadLogo from 'components/edit-site/UploadLogo'
import { change as reduxChange } from 'redux-form'

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
        }
    }
    const submitData = (formData) => {
        dispatch(updateAssessment(site?.id, formData))
    }
    const niche = assessmentData?.niches?.filter((item) => item.value === form?.values?.nicheId.toString())[ 0 ] || site?.niche
    const colour = assessmentData?.colorPalette?.filter((item) => item.value === form?.values?.colourId.toString())[ 0 ] || site?.colour
    return(
        <main className="dashboard-data">
            <section className="dashboard-body">
                <div className="dashboard-header">
                    <div className="dashboard-title">
                        <h1>Edit Site</h1>
                    </div>
                </div>
                <div className='edit-site-panel'>
                    <Form className="form" onSubmit={ handleSubmit(submitData) }>
                        <Row>
                            <Col className='col-md-2'>
                                <span>Blog/Niche</span><br/>
                                <div onClick={ (event) => handleModal(event,'niche') }>
                                    <img src={ niche?.icon } />{ niche?.label}
                                </div>
                            </Col>
                            <Col className='col-md-2'>
                                <span>Color palette</span>
                                <div onClick={ (event) => handleModal(event,'colour') }>
                                    <span className="checkbox-colors round-border">
                                        <span style={ { backgroundColor: colour?.colours?.split(',')[ 1 ] } }></span>
                                    </span>{ colour?.label }</div>
                            </Col>
                            <Col className='col-md-2'>
                                <span>Menu</span>
                                <div onClick={ (event) => handleModal(event,'menu') }>Select..</div>
                            </Col>
                            <Col className='col-md-2'>
                                <span>Site logo</span>
                                <div onClick={ (event) => handleModal(event,'logo') }>{site?.logoUrl ? <img src={ site?.logoUrl } width={ 20 } /> : site?.websiteName }</div>
                            </Col>
                            <Col className='col-md-2'>
                                <span>Site icon</span>
                                <div onClick={ (event) => handleModal(event,'favicon') }>Select..</div>
                            </Col>
                            <Col className='col-md-2'>
                                <span>Header/Footer</span>
                                <Button type='submit'>Edit</Button>
                            </Col>
                        </Row>
                        <Modal show={ open } onHide={ handleClose } className="logo-upload-modal">
                            {renderModalView()}
                        </Modal>
                    </Form>
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