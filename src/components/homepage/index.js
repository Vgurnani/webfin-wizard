import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/appRoutes';
// import slider1 from '../../public/images/home/slider-1.png';
import sliderNew from '../homepage/assets/images/assesment.png';
import basicPlan from '../homepage/assets/images/mana.svg';
// import premiumPlan from '../homepage/assets/images/fantasy.svg';
// import vipPlan from '../homepage/assets/images/man-mage.svg';

import hamBurger from '../homepage/assets/images/hamburger.svg';
import megicStick from '../homepage/assets/images/stick-icon.svg';
import airplaneIcon from '../homepage/assets/images/airplane.svg';
import fitnessIcon from '../homepage/assets/images/fitness.svg';
import nailPolish from '../homepage/assets/images/nail-polish.svg';
import laptopIcon from '../homepage/assets/images/laptop.svg';
import paintPalette from '../homepage/assets/images/paint-palette.svg';
import pencilIcon from '../homepage/assets/images/pencil.svg';
import seoImg from '../homepage/assets/images/combo-chart.svg';
import mobileImg from '../homepage/assets/images/connection.svg';
import downloadSpeed from '../homepage/assets/images/fast-download.svg';
import emailImportant from '../homepage/assets/images/important-mail.svg';
import wizardIcon from '../homepage/assets/images/wizrd-white.png';
import checkIcon from '../homepage/assets/images/check.svg';
import hourglassIcon from '../homepage/assets/images/hourglass.svg';
import moneyIcon from '../homepage/assets/images/money.svg';
import arrowIcon from '../homepage/assets/images/arrow.svg';
import './home.sass';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1280 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};
const HomePage = () => {
    return(

        <section className="main-section">
            <section className="home-banner">
                <Container fluid>
                    <Row className="align-items-center">
                        <Col col={ 12 }>
                            <h1 className={ 'mainHeading text-center' }>Get a beautiful blog <span className="">in seconds!</span></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-side col-6" md="6" sm="12">
                            <div className="text-wrap">
                                <ListGroup className={ 'mainList' }>
                                    <ListGroup.Item> <img src={ megicStick } alt="" /> Get more traffic with a blazing fast blog made for seo.</ListGroup.Item>
                                    <ListGroup.Item> <img src={ megicStick } alt="" />  Ready to launch in minutes. Just start writting. </ListGroup.Item>
                                    <ListGroup.Item> <img src={ megicStick } alt="" />  Sign up on any device - even your phone! No coding or web design experience required.</ListGroup.Item>
                                </ListGroup>
                                <div className={ 'd-flex flex-column justify-content-center align-items-center mt-3' }>
                                    <Link to={ ROUTES.ASSESSMENT } className={ 'green-btn btn btn-primary' }>
                                        Try For Free! No Signup Needed
                                    </Link>
                                    <span className={ 'infoText mt-2' }>*No Credit Card Required</span>
                                </div>
                            </div>
                        </Col>
                        <Col className="img-side col-6" md="6" sm="12">
                            <Carousel controls={ false }>
                                <Carousel.Item>
                                    <img src={ sliderNew } alt='slider1' />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={ sliderNew } alt='slider2'/>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={ sliderNew } alt='slider3'/>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="how-it-work">
                <Container fluid>
                    <Row>
                        <Col col={ 12 }>
                            <h2 className={ 'text-center titleHeading' }>How It Work</h2>
                        </Col>
                    </Row>
                    <Row className={ 'align-items-stretch justify-content-between customGrid' }>
                        <div className={ 'rightArrow' }>
                            <div className={ 'box text-center d-flex flex-column' }>
                                <span className={ 'circleBox' }>1</span>
                                <h3 className={ 'mt-2' }>Choose a niche</h3>
                                <p>Pick a topic to get a blog personalized to your niche!</p>
                                <div className={ 'd- flex flex-row mt-auto mb-3' }>
                                    <img src={ hamBurger } alt="" />
                                    <img src={ airplaneIcon } alt="" />
                                    <img src={ fitnessIcon } alt="" />
                                    <img src={ nailPolish } alt="" />
                                    <img src={ laptopIcon } alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="arrow">
                            <img src={ arrowIcon } alt="Direction" />
                        </div>
                        <div className={ 'd-flex justify-content-center rightArrow manageBefore' }>
                            <div className={ 'box text-center' }>
                                <span className={ 'circleBox' }>2</span>
                                <h3 className={ 'mt-2' }>Choose a color palette</h3>
                                <p>Pick a topic to get a blog personalized to your niche!</p>
                                <div className={ 'd- flex flex-row' }>
                                    <img src={ paintPalette } alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="arrow">
                            <img src={ arrowIcon } alt="Direction" />
                        </div>
                        <div className={ 'd-flex justify-content-end' }>
                            <div className={ 'box text-center' }>
                                <span className={ 'circleBox' }>3</span>
                                <h3 className={ 'mt-2' }>Name Your Blog and Start Writing!</h3>
                                <p>Pick a topic to get a blog personalized to your niche!</p>
                                <div className={ 'd- flex flex-row' }>
                                    <img src={ pencilIcon } alt="" />
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>
            </section>
            <section className={ 'conversion_rate' }>
                <Container fluid>
                    <Row>
                        <Col col={ 4 } className={ 'text-center col-sm-4' }>
                            <div className="contentCircle">
                                <span className={ 'rate_circle' }>50%</span>
                                <p>of software companies voted SEO and Blogging as the <b>most effective</b> marketing channels</p>
                            </div>
                        </Col>
                        <Col col={ 4 } className={ 'text-center col-sm-4' }>
                            <div className="contentCircle">
                                <span className={ 'rate_circle' }>6X</span>
                                <p><b>Website conversion rate</b> is nearly six times higher for content marketing adopters than non-adopters</p>
                            </div>
                        </Col>
                        <Col col={ 4 } className={ 'text-center col-sm-4' }>
                            <div className="contentCircle">
                                <span className={ 'rate_circle' }>40%</span>
                                <p>the average amount of their entir marketing budget that softwere companies invest into <b>SEO and Blogging</b></p>
                            </div>
                        </Col>
                        <Col col={ 4 } className={ 'text-center col-sm-4' }>
                            <div className="contentCircle">
                                <span className={ 'rate_circle' }>82%</span>
                                <p>of marketing who blog see <b>positive ROI</b> from their inbond marketing</p>
                            </div>
                        </Col>
                        <Col col={ 4 } className={ 'text-center col-sm-4' }>
                            <div className="contentCircle">
                                <span className={ 'rate_circle' }>61%</span>
                                <p>of software companies voted SEO and Blogging as the <b>most effective</b> marketing channels</p>
                            </div>
                        </Col>
                        <Col col={ 4 } className={ 'text-center col-sm-4' }>
                            <div className="contentCircle">
                                <span className={ 'rate_circle' }>78%</span>
                                <p>of software companies voted SEO and Blogging as the <b>most effective</b> marketing channels</p>
                            </div>
                        </Col>
                        <Col col={ 12 }>
                            <ListGroup className={ 'inlineList' }>
                                <ListGroup.Item> <Link>1. helloroketto.com</Link></ListGroup.Item>
                                <ListGroup.Item> <Link>2. uplandsoftware.com</Link></ListGroup.Item>
                                <ListGroup.Item> <Link>3. hubspot.com</Link></ListGroup.Item>
                                <ListGroup.Item> <Link>2. thecontentcouncil.com</Link> </ListGroup.Item>
                                <ListGroup.Item> <Link>2. demandmetric.com</Link> </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="how-it-work wizardBlog">
                <Container fluid>
                    <Row>
                        <Col col={ 12 }>
                            <h2 className={ 'text-center titleHeading' }>What’s Included With <b>Every</b> Wizard Blog</h2>
                        </Col>
                    </Row>
                    <Row className={ 'align-items-stretch' } >
                        <Col col={ 3 } className={ 'mobileBottom' } sm="6" md="6" xl="3">
                            <div className={ 'box text-center boxAlign' }>
                                <span className={ 'circleBox' }>
                                    <img src={ seoImg } alt="SEO" />
                                </span>
                                <h3 className={ 'mt-2' }>SEO</h3>
                                <p>Our sites are built for Google Search so you get more traffic and rank higher, with no experience necessary</p>
                            </div>
                        </Col>
                        <Col col={ 3 } className={ 'd-flex justify-content-center mobileBottom boxAlign' } sm="6" md="6" xl="3">
                            <div className={ 'box text-center' }>
                                <span className={ 'circleBox' }>
                                    <img src={ mobileImg } alt="SEO" />
                                </span>
                                <h3 className={ 'mt-2' }>Mobile Responsive</h3>
                                <p>According to Google, over 50% of website traffic comes from mobile visitors</p>
                            </div>
                        </Col>
                        <Col col={ 3 } className={ 'd-flex justify-content-end mobileBottom boxAlign' } sm="6" md="6" xl="3">
                            <div className={ 'box text-center' }>
                                <span className={ 'circleBox' }>
                                    <img src={ downloadSpeed } alt="SEO" />
                                </span>
                                <h3 className={ 'mt-2' }>Performance + Security</h3>
                                <p>Get blazing fast load times, avoid crashes, and easily handle millions of visitors. Built with the same technology used by Netflix, NASA and Twitter.</p>
                            </div>
                        </Col>
                        <Col col={ 3 } className={ 'd-flex justify-content-end boxAlign' } sm="6" md="6" xl="3">
                            <div className={ 'box text-center' }>
                                <span className={ 'circleBox' }>
                                    <img src={ emailImportant } alt="SEO" />
                                </span>
                                <h3 className={ 'mt-2' }>Name Your Blog and Start Writing!</h3>
                                <p>Easily collect email subscribers with built in opt-in forms that help you build and grow and audience.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="old-way-wizard">
                <Container fluid>
                    <Row>
                        <Col col={ 12 }>
                            <h2 className={ 'text-center titleHeading' }>Here’s How Much <span className={ 'font-bold color-purple' }>Time</span> You Can Save <img src={ hourglassIcon } alt="Time" /></h2>
                        </Col>
                    </Row>
                    <Row className={ 'tableView' }>
                        <Col col={ 12 } className={ 'noPad' }>
                            <Table>
                                <thead>
                                    <tr>
                                        <th colSpan="2" className={ 'text-center' }>
                                            <h3 className={ 'tableTitle' }>The “Old Way”</h3>
                                        </th>
                                        <th className={ 'text-center' }>
                                            <img src={ wizardIcon } alt="Wizard" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Website Set Up </td>
                                        <td>1 Week to Months</td>
                                        <td><img src={ checkIcon } alt="Check"/> 1-5 Minutes </td>
                                    </tr>
                                    <tr>
                                        <td>SEO Research </td>
                                        <td>1 Day Per Post</td>
                                        <td><img src={ checkIcon } alt="Check"/> Done For You</td>
                                    </tr>
                                    <tr>
                                        <td>Content Creation</td>
                                        <td>1-2 Days Per Post</td>
                                        <td><img src={ checkIcon } alt="Check"/> 2-4 Hours Per Post</td>
                                    </tr>
                                    <tr>
                                        <td>Marketing Distribution </td>
                                        <td>1-2 Hours Per Day</td>
                                        <td><img src={ checkIcon } alt="Check"/> 15-30 Minutes Per Day</td>
                                    </tr>
                                    <tr>
                                        <td>Email Marketing</td>
                                        <td>2-3 Hours</td>
                                        <td><img src={ checkIcon } alt="Check"/> Done For You</td>
                                    </tr>
                                    <tr>
                                        <td>Mobile Responsive</td>
                                        <td>2-3 Hours</td>
                                        <td><img src={ checkIcon } alt="Check"/> Included</td>
                                    </tr>
                                    <tr>
                                        <td>Maintenance/Plug-in Updates</td>
                                        <td>4 Hours Per Week</td>
                                        <td><img src={ checkIcon } alt="Check"/> Included</td>
                                    </tr>
                                    <tr>
                                        <td>Professional Web Design</td>
                                        <td>4-7 Days</td>
                                        <td><img src={ checkIcon } alt="Check"/> Done For You</td>
                                    </tr>
                                    <tr>
                                        <td>Royalty-Free Image Library</td>
                                        <td>1 Hour Per Post</td>
                                        <td><img src={ checkIcon } alt="Check"/> Included</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>
                                            <p className={ 'mb-1' }>Set Up Time: <span className={ 'colorRed' }>Weeks to Months</span></p>
                                            <p className={ 'mb-1' }>Time Per Blog Post: <span className={ 'colorRed' }>3-4 Days</span></p>
                                            <p className={ 'mb-1' }>Maintenance: <span className={ 'colorRed' }>4 Hours Per Week</span></p>
                                        </td>
                                        <td>
                                            <p className={ 'mb-1' }>Set Up Time: <span className={ 'colorPurple' }>1-5 Minutes</span></p>
                                            <p className={ 'mb-1' }>Time Per Blog Post: <span className={ 'colorPurple' }>2-4 Hours</span></p>
                                            <p className={ 'mb-1' }>Maintenance Per Day:<span className={ 'colorPurple' }> None!</span></p>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    <Row>
                        <Col col={ 12 }>
                            <h2 className={ 'text-center titleHeading mt-4' }>Here’s How Much <span className={ 'font-bold color-purple' }>Money</span> You Can Save <img src={ moneyIcon } alt="Money" /></h2>
                        </Col>
                    </Row>
                    <Row className={ 'tableView' }>
                        <Col col={ 12 } className={ 'noPad' }>
                            <Table>
                                {/* <thead>
                                    <tr>
                                        <th colSpan="2" className={ "text-center" }>
                                            <h3 className={ "tableTitle" }>The “Old Way”</h3>
                                        </th>
                                        <th className={ "text-center" }>
                                            <img src={ wizardIcon } alt="Wizard" />
                                        </th>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    <tr>
                                        <td>Managed Cloud Hosting </td>
                                        <td>$29/Month</td>
                                        <td><img src={ checkIcon } alt="Check"/> Included</td>
                                    </tr>
                                    <tr>
                                        <td>Custom Domain</td>
                                        <td>$12/Year</td>
                                        <td><img src={ checkIcon } alt="Check"/> Included</td>
                                    </tr>
                                    <tr>
                                        <td>Premium Themes</td>
                                        <td>$99/Year</td>
                                        <td><img src={ checkIcon } alt="Check"/> Included</td>
                                    </tr>
                                    <tr>
                                        <td>Email Marketing</td>
                                        <td>$10/Month</td>
                                        <td><img src={ checkIcon } alt="Check"/> Included</td>
                                    </tr>
                                    <tr>
                                        <td>SEO Research Tool</td>
                                        <td>$99/Month</td>
                                        <td><img src={ checkIcon } alt="Check"/> Included</td>
                                    </tr>
                                    <tr>
                                        <td>Premium Security + SSL</td>
                                        <td>$15/Month</td>
                                        <td><img src={ checkIcon } alt="Check"/> Included</td>
                                    </tr>
                                    <tr>
                                        <td>Professional Website Set-Up & Design</td>
                                        <td>$1,000 one time (+Monthly Maintence Fee)</td>
                                        <td><img src={ checkIcon } alt="Check"/> Included</td>
                                    </tr>
                                    <tr>
                                        <td>Royalty-Free Image Library</td>
                                        <td>$29/Month</td>
                                        <td><img src={ checkIcon } alt="Check"/> Included</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>
                                            <p className={ 'mb-1' }>Set Up Fee: <span className={ 'colorRed' }>$1,000</span></p>
                                            <p className={ 'mb-1' }>Recurring Fees: <span className={ 'colorRed' }>$180/Month</span></p>
                                        </td>
                                        <td>
                                            <p className={ 'mb-1 allIncludes' }>All Included <span className={ 'colorPurple' }>$29/Month</span></p>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="website-plan pt-3 pb-5">
                <Container fluid>
                    <h3 className={ 'titleHeading mb-0' }>Pricing</h3>
                    <Form className="select_plan">
                        <p className="switch_text">Annually</p>
                        <Form.Check type="switch" id="custom-switch" label="" />
                        <p className="">Monthly</p>
                    </Form>
                    <h4 className={ 'subheading mb-0' }>Switch to annually to get <strong>2 months FREE</strong></h4>
                    <Row>
                        <Col sm="12">
                            <Carousel controls={ true } responsive={ responsive }>
                                <Carousel.Item>
                                    <div className="plan-detail">
                                        <div className="plan-detail-inner">
                                            <div className="plan-img">
                                                <img src={ basicPlan } alt="Basic Plan" />
                                            </div>
                                            <h4 className="plan-name">Wizrd</h4>
                                            <ul className="plan-feature">
                                                <li>Get a beautiful blog in seconds!</li>
                                                <li>1 Website + 1 Custom Sub-Domain</li>
                                                <li>1,000 Views / Month</li>
                                                <li>1 user</li>
                                                <li>100 MB of space </li>
                                                <li>2 Blog posts / Month </li>
                                                <li>No credit card required </li>
                                            </ul>
                                            <div className="plan-price">Free</div>
                                            <div className="plan-action">
                                                <button className="btn btn-secondary">Try Now</button>
                                                <span className={ 'getText mt-3' }>Get Yours In Minutes</span>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className="plan-detail">
                                        <div className="plan-detail-inner">
                                            <div className="plan-img">
                                                <img src={ basicPlan } alt="Basic Plan" />
                                            </div>
                                            <h4 className="plan-name">Wizrd</h4>
                                            <ul className="plan-feature">
                                                <li>Get a beautiful blog in seconds!</li>
                                                <li>1 Website + 1 Custom Sub-Domain</li>
                                                <li>1,000 Views / Month</li>
                                                <li>1 user</li>
                                                <li>100 MB of space </li>
                                                <li>2 Blog posts / Month </li>
                                                <li>No credit card required </li>
                                            </ul>
                                            <div className="plan-price">Free</div>
                                            <div className="plan-action">
                                                <button className="btn btn-secondary">Try Now</button>
                                                <span className={ 'getText mt-3' }>Get Yours In Minutes</span>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className="plan-detail">
                                        <div className="plan-detail-inner">
                                            <div className="plan-img">
                                                <img src={ basicPlan } alt="Basic Plan" />
                                            </div>
                                            <h4 className="plan-name">Wizrd</h4>
                                            <ul className="plan-feature">
                                                <li>Get a beautiful blog in seconds!</li>
                                                <li>1 Website + 1 Custom Sub-Domain</li>
                                                <li>1,000 Views / Month</li>
                                                <li>1 user</li>
                                                <li>100 MB of space </li>
                                                <li>2 Blog posts / Month </li>
                                                <li>No credit card required </li>
                                            </ul>
                                            <div className="plan-price">Free</div>
                                            <div className="plan-action">
                                                <button className="btn btn-secondary">Try Now</button>
                                                <span className={ 'getText mt-3' }>Get Yours In Minutes</span>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row>
                    {/* <Row className="">
                        <Col className="col-4">
                            <div className="plan-detail">
                                <div className="plan-detail-inner">
                                    <div className="plan-img">
                                        <img src={ basicPlan } alt="Basic Plan" />
                                    </div>
                                    <h4 className="plan-name">Wizrd</h4>
                                    <ul className="plan-feature">
                                        <li>Get a beautiful blog in seconds!</li>
                                        <li>1 Website + 1 Custom Sub-Domain</li>
                                        <li>1,000 Views / Month</li>
                                        <li>1 user</li>
                                        <li>100 MB of space </li>
                                        <li>2 Blog posts / Month </li>
                                        <li>No credit card required </li>
                                    </ul>
                                    <div className="plan-price">Free</div>
                                    <div className="plan-action">
                                        <button className="btn btn-secondary">Try Now</button>
                                        <span className={ 'getText mt-3' }>Get Yours In Minutes</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="col-4">
                            <div className="plan-detail">
                                <div className="plan-detail-inner">
                                    <div className="plan-img">
                                        <img src={ basicPlan } alt="Basic Plan" />
                                    </div>
                                    <h4 className="plan-name">Wizrd <span>Plus</span></h4>
                                    <ul className="plan-feature">
                                        <li>1 Website + 1 Custom Sub-Domain</li>
                                        <li>5,000 Views / Month</li>
                                        <li>1 User </li>
                                        <li>200 MB of space </li>
                                        <li>4 Blog posts / Month</li>
                                        <li>No credit card required </li>
                                    </ul>
                                    <div className="plan-price">Free</div>
                                    <div className="plan-action">
                                        <button className="btn btn-secondary">Try Now</button>
                                        <span className={ 'getText mt-3' }>Get Yours In Minutes</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="col-4">
                            <div className="plan-detail">
                                <div className="plan-detail-inner">
                                    <div className="plan-img">
                                        <img src={ premiumPlan } alt="Premium Plan" />
                                    </div>
                                    <h4 className="plan-name">Wizrd <span className={ 'purple-color' }>Pro</span></h4>
                                    <ul className="plan-feature">
                                        <li>1 Website </li>
                                        <li>Connect Custom Domain</li>
                                        <li>25,000 Views / Month</li>
                                        <li>1 User </li>
                                        <li>5 GB space</li>
                                        <li>Free SSL</li>
                                        <li>Cancel Anytime</li>
                                        <li><strong>Collect email subscribers (Up to 1,000)</strong></li>
                                        <li>Remove “Powered by Wizrd”</li>
                                        <li>Customize colors to match your brand</li>
                                    </ul>
                                    <div className="plan-price">$29<sub>/mo</sub></div>
                                    <div className="plan-action">
                                        <button  className="btn btn-secondary">Select</button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="col-4">
                            <div className="plan-detail">
                                <div className="plan-detail-inner">
                                    <div className="plan-img">
                                        <img src={ premiumPlan } alt="Premium Plan" />
                                    </div>
                                    <h4 className="plan-name">Wizrd <span className={ 'purple-color' }>Pro</span></h4>
                                    <ul className="plan-feature">
                                        <li>1 Website </li>
                                        <li>Connect Custom Domain</li>
                                        <li>100,000 Views / Month</li>
                                        <li>1 User </li>
                                        <li>10 GB space</li>
                                        <li>Free SSL</li>
                                        <li>Cancel Anytime</li>
                                        <li>Collect email subscribers (Up to 10,000)</li>
                                        <li>Remove “Powered by Wizrd”</li>
                                    </ul>
                                    <div className="plan-price">$49<sub>/mo</sub></div>
                                    <div className="plan-action">
                                        <button className="btn btn-secondary">Select</button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row> */}
                </Container>
            </section>
            <section className="website-faq">
                <Container>
                    <Accordion className="accordion-faq">
                        <Card className="accordion-card">
                            <Card.Header className="accordion-card-header">
                                <Accordion.Toggle as={ Button } variant="link" eventKey="0" className="accordion-card-btn">
                                    Our FAQ
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body className="accordion-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="accordion-card">
                            <Card.Header className="accordion-card-header">
                                <Accordion.Toggle as={ Button } variant="link" eventKey="6" className="accordion-card-btn">
                                    How do I lorem ipsum dolor sit amet?
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="6">
                                <Card.Body className="accordion-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="accordion-card">
                            <Card.Header className="accordion-card-header">
                                <Accordion.Toggle as={ Button } variant="link" eventKey="1" className="accordion-card-btn">
                                    How do I lorem ipsum dolor sit amet?
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body className="accordion-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="accordion-card">
                            <Card.Header className="accordion-card-header">
                                <Accordion.Toggle as={ Button } variant="link" eventKey="2" className="accordion-card-btn">
                                    How do I lorem ipsum dolor sit amet?
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body className="accordion-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="accordion-card">
                            <Card.Header className="accordion-card-header">
                                <Accordion.Toggle as={ Button } variant="link" eventKey="3" className="accordion-card-btn">
                                    How do I lorem ipsum dolor sit amet?
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body className="accordion-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="accordion-card">
                            <Card.Header className="accordion-card-header">
                                <Accordion.Toggle as={ Button } variant="link" eventKey="4" className="accordion-card-btn">
                                    How do I lorem ipsum dolor sit amet?
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="4">
                                <Card.Body className="accordion-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="accordion-card">
                            <Card.Header className="accordion-card-header">
                                <Accordion.Toggle as={ Button } variant="link" eventKey="5" className="accordion-card-btn">
                                    How do I lorem ipsum dolor sit amet?
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="5">
                                <Card.Body className="accordion-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Card.Body>
                            </Accordion.Collapse>
                        </Card>

                    </Accordion>
                </Container>
            </section>
        </section>)
}

export default HomePage
