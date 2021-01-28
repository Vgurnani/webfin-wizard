import React from 'react'
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { useSelector } from 'react-redux'
import { assessmentFormValidate as validate } from '../../utils/validates'
import TemplateLayoutOne from './shared/TemplateLayoutOne'
import WebTemplates ,{Header,Home, Banner,Blogs, Card} from 'web-templates';

import 
  {
    Row,
    Col,
    Container,
    Form,
    Button
  }
from 'react-bootstrap';
import preview from '../../public/images/preview.png';

const Preview = (props) => {
    const {handleSubmit ,saveData, colorPalette} = props;
    const assessmentForm = useSelector((state) => state.form.assessmentForm)
    const colorObject = colorPalette.filter((item) => item.value === assessmentForm.values.colourId)[0] || {}
    const data = {
		colors: colorObject?.colors || [],
		logoUrl: assessmentForm.values.logoUrl,
		logoText: assessmentForm.values.websiteName,
        readOnly: true,
        headerLinks: [{name: 'Home', url: '#'},{name: 'Blog', url: '#'},{name: 'About', url: '#'},{name: 'Contact', url: '#'}],
	}
    return(


        <div className="assesment-step assesment-step-final">
            <Row  className="step-form">
                <Col className="col-12">
                    <Container>
                        <Form className="form" onSubmit={handleSubmit}>  
                        <div className="form-heading">   
                                <h2>
                                Congratulation! Here is your NEW website
                                </h2>
                            </div>
                            <Row className="color-palatte">
                                <Col className="col-12 color-palatte-preview wizard-preview">
                                    <div className="color-preview wizard-blog-preview">
                                    {/*<TemplateLayoutOne />*/}
                                    <WebTemplates data={data}>
                                        <Header></Header>
                                        <Home>
                                        <Banner>
                                            <h1>
                                                <span>Simple Recipes for Healthier Families</span>

                                            </h1>
                                            <h5>Welcome to the most reliable source for healthy recipes!</h5>
                                            <div className="form-wrapper">
                                                <form className="newsletter">
                                                <div className="form-group">
                                                    <input className="form-control" placeholder="Enter your email" type="text" />
                                                </div>
                                                <button type="submit" className="btn btn-primary">Subscribe!</button>
                                                </form>
                                            </div>
                                        </Banner>
                                        <Blogs>
                                            <h2 className="section-heading">
                                                Recent Blog Posts
                                                <a href="">View All</a>
                                                </h2>
                                                <ul className="blog-list">
                                                    <li>
                                                        <Card 
                                                        image={'https://homepages.cae.wisc.edu/~ece533/images/boat.png'}
                                                        >
                                                        <h3>The Joy of Cooking</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet praesent eu accumsan, curabitur. Nulla viverra aliquam viverra id a.</p>
                                                        </Card>       
                                                    </li>
                                                    <li>
                                                        <Card 
                                                        image={'https://homepages.cae.wisc.edu/~ece533/images/boat.png'}
                                                        >
                                                        <h3>The Joy of Cooking</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet praesent eu accumsan, curabitur. Nulla viverra aliquam viverra id a.</p>
                                                        </Card>       
                                                    </li>
                                                    <li>
                                                        <Card 
                                                        image={'https://homepages.cae.wisc.edu/~ece533/images/boat.png'}
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
                                <div className="step-btn-left"></div>
                                <div className="step-btn-right">
                                    <div className="step-btn">
                                    <Button className="btn btn-primary" type="submit">
                                    Save your work!
                                    </Button>
                                  
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </div>
        
    )
}
Preview.propTypes = {
    handleSubmit: PropTypes.func,
    submitData: PropTypes.func,
    saveData: PropTypes.func,
    colorPalette: PropTypes.object
};
export default reduxForm({
    form: 'assessmentForm',
    destroyOnUnmount: false,
    validate
  })(Preview);