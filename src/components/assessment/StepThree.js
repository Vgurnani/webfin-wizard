import React,{ useState , useEffect } from 'react'
import { Field } from 'redux-form';
import { renderFieldChangeWG, renderStyleMultipleRadio } from '../../utils/formUtils'
import { getLabel, headerLinksTemplate } from '../../utils/helpers'
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
    Container,
    Col,
    Row,
}
    from 'react-bootstrap';
import UploadImageModal from './shared/UploadImageModal'
import AssessmentHeader from 'pages/assessment/header'

const StepThree = (props) => {
    const dispatch = useDispatch()
    const [ openModal, setModalOpen ] = useState(false)
    const form  = useSelector((state) => state.form.assessmentForm)
    const domains  = useSelector((state) => state.assessment.domains)
    const domainLoading  = useSelector((state) => state.assessment.domainLoading)
    const unsplashImages  = useSelector((state) => state.assessment.unsplashImages)
    const { handleSubmit ,prevPage ,assessmentData, setStep } = props;
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
        if(!_.isEmpty(domains)){
            !domainLoading && dispatch(reduxChange('assessmentForm', 'domain', domains[ 0 ]))
        }
    },[ domains, domainLoading ])

    const handleSearch = (event) => {
        let query  = form.values?.nicheId && getLabel(assessmentData.niches, form.values?.nicheId)
        query = event.target.value || query
        dispatch(getUnsplash('/photos',query))
    }

    const getBase64 = (base64) => {
        dispatch(reduxChange('assessmentForm', 'logoUrl', base64))
    }

    const clearImage = () => {
        dispatch(reduxChange('assessmentForm', 'logoUrl', null))
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

    const domainsOptions = getDomains() || []
    return(
        <Form className="form" onSubmit={ handleSubmit(() => {}) }>
            <AssessmentHeader prevPage={ prevPage } { ... props }/>
            <div className="assesment-step assesment-step-3">
                <Row  className="step-form">
                    <Col className="col-12">
                        <Container>

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
                                                {form.values?.colors && JSON.parse(form.values.colors).name && JSON.parse(form.values.colors).name.replace('-',' ').upcaseWithSpace()}
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
                            <UploadImageModal fieldName={ 'logoUrl' } clearImage={ clearImage } previewFile={ form.values?.logoUrl } getBase64={ getBase64 } handleSearch={ handleSearch } unsplashImages={ unsplashImages } openModal={ openModal } handleToggleModal={ handleToggleModal } />
                        </Container>
                    </Col>
                </Row>
            </div>
        </Form>

    )
}
String.prototype.upcaseWithSpace = function () {
    let data = this.split(' ')
    data = data.map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    return data.join(' ')
};
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