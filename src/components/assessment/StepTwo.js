import React,{ useEffect ,useState } from 'react'
import { Field } from 'redux-form';
import { useSelector ,useDispatch } from 'react-redux'
import { renderStyleMultipleRadio } from '../../utils/formUtils'
import { assessmentSaved, headerLinksTemplate } from '../../utils/helpers'
import { assessmentFormValidate as validate } from '../../utils/validates'
import WebTemplates ,{ Header,Home, Banner,Blogs, Card } from 'web-templates';
import { reduxForm } from 'redux-form';
import { change as reduxChange } from 'redux-form'
import PropTypes from 'prop-types';
import CustomColor from 'components/assessment/shared/CustomColor'
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

const StepTwo = (props) => {
    const [ isSave, setSave ] = useState(false)
    const [ customColorOpen, ] = useState(false)
    const dispatch = useDispatch()
    const { handleSubmit,prevPage ,colorPalette, saveData } = props;
    const assessmentForm = useSelector((state) => state.form.assessmentForm)
    const data = {
        colors: assessmentForm?.values.colors,
        logoUrl: assessmentForm.values.logoUrl,
        logoText: assessmentForm.values.websiteName,
        headerLinks: headerLinksTemplate(),
        readOnly: true
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(()=>{
        setSave(assessmentSaved('step2',assessmentForm?.values))
        if(!assessmentForm?.values?.colors){
            dispatch(reduxChange('assessmentForm','colors',JSON.stringify(colorPalette?.filter((item)=> item.label === 'Clean White')[ 0 ]?.value)))
        }
    },[ assessmentForm?.values ])

    const handleSave = () => {
        setSave(true)
        saveData()
    }

    return(
        <div className="assesment-step assesment-step-2">
            <Row  className="step-form">
                <Col className="col-12">
                    <Container>
                        <Form className="form" onSubmit={ handleSubmit }>
                            {customColorOpen ? <CustomColor data={ data } /> : <>
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
                                            defaultValue={ 'no' }
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
                                                        <h2 className="wizrd-section-heading">
                                                            Recent Blog Posts
                                                            <a href="">View All</a>
                                                        </h2>
                                                        <ul className="wizrd-blog-list">
                                                            <li>
                                                                <Card
                                                                    image={ 'https://homepages.cae.wisc.edu/~ece533/images/boat.png' }
                                                                >
                                                                    <h3>The Joy of Cooking</h3>
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet praesent eu accumsan, curabitur. Nulla viverra aliquam viverra id a.</p>
                                                                </Card>
                                                            </li>
                                                            <li>
                                                                <Card
                                                                    image={ 'https://homepages.cae.wisc.edu/~ece533/images/boat.png' }
                                                                >
                                                                    <h3>The Joy of Cooking</h3>
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet praesent eu accumsan, curabitur. Nulla viverra aliquam viverra id a.</p>
                                                                </Card>
                                                            </li>
                                                            <li>
                                                                <Card
                                                                    image={ 'https://homepages.cae.wisc.edu/~ece533/images/boat.png' }
                                                                >
                                                                    <h3>The Joy of Cooking</h3>
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet praesent eu accumsan, curabitur. Nulla viverra aliquam viverra id a.</p>
                                                                </Card>
                                                            </li>
                                                        </ul>
                                                    </Blogs>
                                                </Home>
                                            </WebTemplates>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="step-btns">
                                    <div className="step-btn-left">
                                        <Button onClick={ prevPage } type="button" variant="secondary" >
                                            Back
                                        </Button>
                                    </div>
                                    <div className="step-btn-right">
                                        <div className="step-btn">
                                            <Button type="button"  disabled={ !props.valid } onClick={ handleSave } variant="light" >
                                                { isSave ? 'Saved' : 'Save'}
                                            </Button>
                                        </div>
                                        <div className="step-btn">
                                            <span>
                                                { props.valid  ?
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
                            </>}
                        </Form>
                    </Container>
                </Col>
            </Row>
        </div>

    )
}
StepTwo.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    saveData: PropTypes.func,
    colorPalette: PropTypes.object,
    valid: PropTypes.bool,
    prevPage: PropTypes.prevPage
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
})(StepTwo);