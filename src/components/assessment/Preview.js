import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { useSelector } from 'react-redux'
import { headerLinksTemplate } from 'utils/helpers'
import { assessmentFormValidate as validate } from '../../utils/validates'
import WebTemplates ,{ Header,Home, Banner,Blogs, Card } from 'web-templates';
import AssessmentHeader from 'pages/assessment/header'
import
{
    Row,
    Col,
    Container,
    Form,
}
    from 'react-bootstrap';

const Preview = (props) => {
    const { handleSubmit ,prevPage, finalSubmit } = props;
    const assessmentForm = useSelector((state) => state.form.assessmentForm)
    const data = {
        colors: assessmentForm?.values?.colors || [],
        logoUrl: assessmentForm?.values?.logoUrl,
        logoText: assessmentForm?.values?.websiteName,
        coverImage: assessmentForm?.values?.coverImage,
        readOnly: true,
        headerLinks: headerLinksTemplate(),
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return(
        <Form className="form" onSubmit={ handleSubmit(finalSubmit) }>
            <AssessmentHeader isFinalScreen={ true } prevPage={ prevPage } { ... props }/>
            <div className="assesment-step assesment-step-final">
                <Row  className="step-form">
                    <Col className="col-12">
                        <Container>

                            <div className="form-heading">
                                <h2>
                                    Congratulations! Here is your NEW website
                                </h2>
                            </div>
                            <Row className="color-palatte">
                                <Col className="col-12 final-blog-preview wizard-preview">
                                    <div className="color-preview wizard-home wizrd-blog-preview final-preview">
                                        {/*<TemplateLayoutOne />*/}
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
                        </Container>
                    </Col>
                </Row>
            </div>
        </Form>

    )
}
Preview.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    colorPalette: PropTypes.object,
    prevPage: PropTypes.func,
    finalSubmit: PropTypes.func
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
})(Preview);