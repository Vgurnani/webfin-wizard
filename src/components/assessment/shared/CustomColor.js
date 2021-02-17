import React from 'react'
import PropTypes from 'prop-types';
import WebTemplates ,{ Header,Home, Banner,Blogs, Card } from 'web-templates';

const CustomColor = (props) => {
    return(
        <div>
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
        </div>
    )
}
CustomColor.propTypes = {
    data: PropTypes.object
};
export default CustomColor;