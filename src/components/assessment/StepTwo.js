import React,{ useEffect ,useState } from 'react'
import { Field } from 'redux-form';
import { useSelector ,useDispatch } from 'react-redux'
import { renderStyleMultipleRadio } from '../../utils/formUtils'
import {  headerLinksTemplate } from '../../utils/helpers'
import { assessmentFormValidate as validate } from '../../utils/validates'
import WebTemplates ,{ Header,Home, Banner,Blogs, Card, Tabs, Tab  } from 'web-templates';
import { reduxForm } from 'redux-form';
import { change as reduxChange } from 'redux-form'
import PropTypes from 'prop-types';
import CustomColor from 'components/assessment/shared/CustomColor'
import AssessmentHeader from 'pages/assessment/header'
import { AllColors } from 'constants/theme'
import { SAMPLE_BLOG } from 'constants/app'
import
{
    Form,
    Container,
    Col,
    Row,
    Modal
}
    from 'react-bootstrap';

const StepTwo = (props) => {
    const [ customColorOpen, setCustomColorOpen ] = useState(false)
    const dispatch = useDispatch()
    const { handleSubmit,onSubmit, prevPage } = props;
    const assessmentForm = useSelector((state) => state.form.assessmentForm)
    const data = {
        colors: assessmentForm?.values.colors,
        header: assessmentForm?.values.header,
        logoUrl: assessmentForm.values.logoUrl,
        logoText: assessmentForm.values.websiteName,
        coverImage: assessmentForm.values.coverImage,
        headerLinks: headerLinksTemplate(),
        readOnly: true
    }
    const setAllColors = () => {
        if(assessmentForm?.values?.colors){
            const colors = JSON.parse(assessmentForm?.values?.colors)
            const obj = { label: 'Custom Color', value: colors,imageUrl: undefined }
            const allColors = [ ... AllColors() ]
            if(colors.name === 'custom-color'){
                allColors.pop()
                allColors.push(obj)
            }
            return allColors
        }else{
            return AllColors()
        }
    }
    const [ colorPalette , setColorPalette ] = useState(setAllColors())
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(()=>{
        if(!assessmentForm?.values?.colors){
            dispatch(reduxChange('assessmentForm','colors',JSON.stringify(colorPalette?.filter((item)=> item.label === 'Clean White')[ 0 ]?.value)))
        }
    },[ assessmentForm?.values ])

    const handleColorChange = ( event ) => {
        const obj = event.currentTarget.value &&  JSON.parse(event.currentTarget.value)
        obj.name === 'custom-color' ?  setCustomColorOpen(!customColorOpen) : null
    }

    const handleColorsData = (colors) => {
        const obj = { label: 'Custom Color', value: colors,imageUrl: undefined }
        colorPalette.pop()
        colorPalette.push(obj)
        setColorPalette(colorPalette)
        dispatch(reduxChange('assessmentForm', 'colors', JSON.stringify(colors)))
        setCustomColorOpen(false)
    }
    const handleClick = () => {
        setCustomColorOpen(!customColorOpen)
    }
    return(
        <Form className="form" onSubmit={ handleSubmit(onSubmit) }>
            <AssessmentHeader  prevPage={ prevPage } { ...props } />
            <div className="assesment-step assesment-step-2">
                <Row  className="step-form">
                    <Col className="col-12">
                        <Container>

                            <Modal show={ customColorOpen } onHide={ () => setCustomColorOpen(false) } className="custom-color-modal"><CustomColor formName='assessmentForm' backFun={ () => setCustomColorOpen(false) } previewFile={ assessmentForm?.values?.coverImage } colorPalette={ colorPalette } handleColorsData={ (colors) => handleColorsData(colors) } data={ data } /></Modal>
                            <div className="form-heading">
                                <h2>
                                    Choose Your Color Palette!
                                </h2>
                            </div>
                            <Row className="color-palatte">
                                <Col className="col-6 color-palatte-selector">
                                    <Field
                                        name="colors"
                                        options={ colorPalette }
                                        component={ renderStyleMultipleRadio }
                                        handleChange={ handleColorChange }
                                        handleClick={ handleClick }
                                        placeholder={ 'gaveCraving' }
                                        isColors={ true }
                                        className='styled-radio-btn btn-outline'
                                        imgWidth="30px"
                                    />
                                </Col>
                                <Col className="col-6 color-palatte-preview wizard-preview">
                                    <h4>Preview</h4>
                                    <div className="color-preview wizard-home wizrd-blog-preview color-palate-preview">
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
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </div>
        </Form>
    )
}
StepTwo.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    saveData: PropTypes.func,
    colorPalette: PropTypes.object,
    valid: PropTypes.bool,
    prevPage: PropTypes.prevPage,
    onSubmit: PropTypes.func
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
})(StepTwo);