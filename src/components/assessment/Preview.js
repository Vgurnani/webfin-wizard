import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { useSelector } from 'react-redux'
import { headerLinksTemplate } from 'utils/helpers'
import { assessmentFormValidate as validate } from '../../utils/validates'
import WebTemplates ,{ Header,Home, Banner,Blogs, Card, Tabs,Tab } from 'web-templates';
import AssessmentHeader from 'pages/assessment/header'
import { SAMPLE_BLOG } from 'constants/app'
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