import React, { useState } from 'react'
import PropTypes from 'prop-types';
import WebTemplates ,{ Header,Home, Banner,Blogs, Card } from 'web-templates';
import { Row, Col } from 'react-bootstrap'
import ColorPicker from 'components/core/color-picker'

const CustomColor = (props) => {
    const [ colors ,setColors ] = useState({})
    // const [ loading, setLoading ] = useState(false)
    const handleChangeColor = (data) => {
        setColors(data)
    }
    return(
        <div>
            <Row>
                <Col className='col-md-8'>
                    <WebTemplates data={ props.data }>
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
                </Col>
                <Col className='col-md-4'>
                    <ColorPicker  colors={ colors } onChange={ handleChangeColor } />
                </Col>
            </Row>
        </div>
    )
}

CustomColor.propTypes = {
    data: PropTypes.object
};
export default CustomColor;