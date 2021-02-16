import React,{ useState , useEffect } from 'react'
import { Field } from 'redux-form';
import { renderFieldChangeWG, renderStyleMultipleRadio } from '../../utils/formUtils'
import { getLabel ,assessmentSaved , headerLinksTemplate } from '../../utils/helpers'
import { getUnsplash ,getVerifiedDomain } from '../../middleware/assessments'
import PropTypes from 'prop-types';
import { assessmentFormValidate as validate } from '../../utils/validates'
import { reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux'
import { change as reduxChange } from 'redux-form'
import WebTemplates ,{ Header, Home, Banner } from 'web-templates';
import _ from 'lodash';
import
{
    Form,
    Button,
    Container,
    Col,
    Row,
}
    from 'react-bootstrap';
import enterIcon from '../../public/images/enter-icon.png';
import UploadImageModal from './shared/UploadImageModal'
const StepThree = (props) => {
    const [ isSave, setSave ] = useState(false)
    const dispatch = useDispatch()
    const [ openModal, setModalOpen ] = useState(false)
    const form  = useSelector((state) => state.form.assessmentForm)
    const domains  = useSelector((state) => state.assessment.domains)
    const domainLoading  = useSelector((state) => state.assessment.domainLoading)
    const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)
    const { handleSubmit, valid ,prevPage ,onSubmit,assessmentData, saveData, setStep } = props;
    const data = {
        colors: form?.values?.colors,
        logoUrl: form.values.logoUrl,
        logoText: form.values.websiteName,
        headerLinks: headerLinksTemplate(),
        readOnly: true
    }
    const handleToggleModal = () => {
        setModalOpen(!openModal)
    }

    useEffect(()=>{
        const query = form.values?.nicheId && getLabel(assessmentData.niches, form.values?.nicheId)
        dispatch(getUnsplash('/photos',query))
        window.scrollTo(0, 0);
    },[]);

    useEffect(()=>{
        setSave(assessmentSaved('step3',form?.values))
    },[ form?.values ])

    useEffect(()=>{
        if(!_.isEmpty(domains)){
            !domainLoading && dispatch(reduxChange('assessmentForm', 'domain', domains[ 0 ]))
        }
    },[ domains, domainLoading ])

    const handleSearch = (event) => {
        let query  = form.values?.nicheId && getLabel(assessmentData.niches, form.values?.nicheId)
        query = event.currentTarget.value || query
        dispatch(getUnsplash('/photos',query))
    }

    const getBase64 = (base64) => {
        dispatch(reduxChange('assessmentForm', 'logoUrl', base64))
    }

    const clearImage = () => {
        dispatch(reduxChange('assessmentForm', 'logoUrl', null))
    }
    const handleSave = () => {
        setSave(true)
        saveData()
    }

    const handleChange = (value) => {

        if(value){
            setTimeout(function(){
                dispatch(reduxChange('assessmentForm', 'domain', null))
                dispatch(getVerifiedDomain(value))
            },600)

        }else{dispatch({ type: 'CLEAR_DOMAINS' })}
    }

    const getDomains = () => {
        const result = domains?.map((item) => ({ label: item, value: item }))
        return _.isEmpty(result) ? form?.values?.websiteName && form.values?.domain && [ { label: form.values?.domain,value: form.values?.domain } ] : result
    }

    const handleSubmitData = (formData) => {
        if(formData.nicheId && formData.colors && formData.websiteName && formData.domain){
            onSubmit(formData)
        }
    }

    const domainsOptions = getDomains() || []
    return(
        <div className="assesment-step assesment-step-3">
            <Row  className="step-form">
                <Col className="col-12">
                    <Container>
                        <Form className="form" onSubmit={ handleSubmit(handleSubmitData) }>
                            <div className="form-heading">
                                <h2>
                                    Name Your Website!
                                </h2>
                            </div>

                            <Row className="name-website">
                                <Col className="col-6 name-website-selector">
                                    <div className="small-wrapper">
                                        <Field
                                            name="websiteName"
                                            component={ renderFieldChangeWG }
                                            handleChange={ handleChange }
                                            minLength={ 1 }
                                            placeholder={ 'Enter your website name' }

                                        />
                                        {domainLoading && <div className="small-loader">
                                            <div className="lds-facebook"><div></div><div></div><div></div></div>
                                        </div>}
                                        { form.values.websiteName &&
                                        <>
                                            <span>Choose an available domain</span>
                                            <Field
                                                name="domain"
                                                options={ domainsOptions || [] }
                                                component={ renderStyleMultipleRadio }
                                                defaultValue={ 'no' }
                                                placeholder={ 'domain' }
                                                className='styled-radio-btn'
                                                isIcons={ false }
                                            />
                                        </>
                                        }

                                        <p className="logo-optional">Optional: If you have a logo upload it here</p>
                                        <div className="upload-media-btn">
                                            <button type='button' onClick={ handleToggleModal }>upload your logo</button>

                                        </div>

                                        <ul className="cat-list">
                                            {form.values?.nicheId && <li onClick={ () => setStep(1) }>
                                                { getLabel(assessmentData.niches, form.values?.nicheId)}
                                            </li>}
                                            {form.values?.colors &&<li onClick={ () => setStep(2) }>
                                                {form.values?.colors && JSON.parse(form.values.colors).name}
                                            </li>}
                                        </ul>

                                    </div>
                                </Col>
                                <Col className="col-6 name-website-selector-preview wizard-preview">
                                    <h4>Preview</h4>
                                    <div className="blog-preview wizrd-blog-preview color-palate-preview wizard-home ">
                                        <WebTemplates data={ data }>
                                            <Header>
                                                <Header.Left />
                                                <Header.Right />
                                            </Header>
                                            <Home>
                                                <Banner>
                                                    <h1>
                                                        <span>Simple Recipes for Healthier Families</span>

                                                    </h1>
                                                    <h5>Welcome to the most reliable source for healthy recipes!</h5>
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
                                </Col>
                            </Row>

                            <div className="step-btns">
                                <div className="step-btn-left">
                                    <Button type="button" onClick={ prevPage } variant="secondary" >
                                        Back
                                    </Button>
                                </div>
                                <div className="step-btn-right">
                                    <div className="step-btn">
                                        <Button type="button"  disabled={ !valid || domainLoading } onClick={ handleSave } variant="light" >
                                            { isSave ? 'Saved' : 'Save' }
                                        </Button>
                                    </div>
                                    <div className="step-btn">
                                        <span>
                                            { valid && form?.values?.domain && !domainLoading ?
                                                <Button type="submit" variant="primary">
                                                    Next
                                                </Button>
                                                :
                                                <Button type="button" disabled={ true } variant="primary">
                                                    Next
                                                </Button>}
                                        </span>
                                        <span className="enter-btn">
                                            <a>
                                                or Press Enter
                                                <img src={ enterIcon } alt="Enter" />
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <UploadImageModal fieldName={ 'logoUrl' } clearImage={ clearImage } previewFile={ form.values?.logoUrl } getBase64={ getBase64 } handleSearch={ handleSearch } unsplashImages={ unsplashImages } openModal={ openModal } handleToggleModal={ handleToggleModal } />
                        </Form>
                    </Container>
                </Col>
            </Row>
        </div>

    )
}
StepThree.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    assessmentData: PropTypes.object,
    saveData: PropTypes.func,
    colorPalette: PropTypes.object,
    valid: PropTypes.valid,
    setStep: PropTypes.func,
    prevPage: PropTypes.func,
    onSubmit: PropTypes.func,
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
})(StepThree);