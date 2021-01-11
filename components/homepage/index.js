import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import slider1 from '../../assets/images/home/slider-1.png';
import websiteBuilding from '../../assets/images/home/website-building.png';
import websiteComparison from '../../assets/images/home/website-comparison.png';
import basicPlan from '../../assets/images/home/basic-plan.png';
import premiumPlan from '../../assets/images/home/premium-plan.png';
import vipPlan from '../../assets/images/home/vip-plan.png';
const HomePage = (props) => {
  return( 
    <section className="main-section">
      <section className="home-banner">
        <Container>
          <Row className="align-items-center">
            <Col className="text-side col-7">
              <div className="text-wrap">
              <h1>
                Your website fast and easy, now (yes, seriously!).
              </h1>
              <p>
                Build a website, as easy as answering a couple of questions.
              </p>
              <button className="btn btn-primary">
              Get started  
              </button>
              </div>
            </Col>
            <Col className="img-side col-5">
              <Carousel controls={false}>  
                <Carousel.Item>
                 <img src={slider1} alt='slider1' />
                </Carousel.Item>
                <Carousel.Item>
                  <img src={slider1} alt='slider2'/>
                </Carousel.Item>
                <Carousel.Item>
                  <img src={slider1} alt='slider3'/>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="get-website">
        <div className="get-website-inner">
        <Container>
          <Row className="align-items-center">
            <Col className="heading-side col-7">  
              <div className="heading-side-inner">
              <h3>
              Get the website you want From scratch and without previous experience
              </h3>
              </div>
            </Col>
            <Col className="content-side col-5">
              <div className="content-side-inner">
                <p>
                You don’t need previous experience in design. <br/>Just let us know what kind of site you want and we’ll do the work fo you.
                </p>
                <button href="" className="btn-normal">Get Started</button>
              </div>
            </Col>
          </Row>
        </Container>        
        </div>
      </section>
      <section className="website-building">
        <Container>
          <Row className="align-items-center">
            <Col className="content-side col-6">  
            <div className="content-side-inner">
             <h4>Pain free website building</h4>    
             <p>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
             </p>
             <button className="btn-normal">Start now</button>
             </div>
            </Col>
            <Col className="col-6">
              <img src={websiteBuilding} alt="" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="website-comparison">
        <Container>
          <Row className="align-items-center">
          <Col className="col-6">
              <img src={websiteComparison} alt="" />
            </Col>
            <Col className="content-side col-6">     
            <div className="content-side-inner">
             <h4>Us in comparison</h4>
             <p>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
             </p>
             <ul>
               <li>Lorem ipsum dolor sit amet.</li>
               <li>Lorem ipsum dolor sit amet.</li>
               <li>Lorem ipsum dolor sit amet.</li>
               <li>Lorem ipsum dolor sit amet.</li>
             </ul>
             <button href='#' className="btn btn-primary">Get on creating</button>
             </div>
            </Col>
           
          </Row>
        </Container>
      </section>
      <section className="website-plan">
        <Container>     
          <h3>Select a plan</h3>
          <p>30 day money back warranty on your upgraded plan</p>
          <Row className="">
            <Col className="col-4">
              <div className="plan-detail">   
                <div className="plan-detail-inner">
                  <div className="plan-img">
                    <img src={basicPlan} alt="Basic Plan" />
                  </div>
                  <h4 className="plan-name">Basic Plan</h4>      
                  <ul className="plan-feature">
                    <li>Features</li>
                    <li>Features</li>
                    <li>Features</li>
                    <li>Features</li>
                  </ul>
                  <div className="plan-price">Free</div>
                  <div className="plan-action">
                    <button className="btn btn-secondary">Select</button>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="col-4">
              <div className="plan-detail">
                <div className="plan-detail-inner">
                  <div className="plan-img">
                    <img src={premiumPlan} alt="Premium Plan" />
                  </div>
                  <h4 className="plan-name">Premium Plan</h4>
                  <ul className="plan-feature">
                    <li>New Features</li>
                    <li>New Features</li>
                    <li>New Features</li>
                    <li>New Features</li>
                  </ul>
                  <div className="plan-price">$10<sub>/mo</sub></div>
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
                    <img src={vipPlan} alt="VIP Plan" />
                  </div>
                  <h4 className="plan-name">VIP Plan</h4>
                  <ul className="plan-feature">
                    <li>Get New Features</li>
                    <li>Get New Features</li>
                    <li>Get New Features</li>
                    <li>Get New Features</li>
                  </ul>
                  <div className="plan-price">$25<sub>/mo</sub></div>
                  <div className="plan-action">
                    <button className="btn btn-secondary">Select</button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          </Container>
      </section>  
      <section className="website-faq">
        <Container>             
          <Accordion defaultActiveKey="0" className="accordion-faq">
            <Card className="accordion-card">       
              <Card.Header className="accordion-card-header">
                <Accordion.Toggle as={Button} variant="link" eventKey="0" className="accordion-card-btn">
                Our FAQ
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="accordion-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="accordion-card">       
              <Card.Header className="accordion-card-header">
                <Accordion.Toggle as={Button} variant="link" eventKey="6" className="accordion-card-btn">
                How do I lorem ipsum dolor sit amet?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="6">
                <Card.Body className="accordion-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="accordion-card">       
              <Card.Header className="accordion-card-header">
                <Accordion.Toggle as={Button} variant="link" eventKey="1" className="accordion-card-btn">
                How do I lorem ipsum dolor sit amet?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body className="accordion-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="accordion-card">       
              <Card.Header className="accordion-card-header">
                <Accordion.Toggle as={Button} variant="link" eventKey="2" className="accordion-card-btn">
                How do I lorem ipsum dolor sit amet?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body className="accordion-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="accordion-card">       
              <Card.Header className="accordion-card-header">
                <Accordion.Toggle as={Button} variant="link" eventKey="3" className="accordion-card-btn">
                How do I lorem ipsum dolor sit amet?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body className="accordion-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="accordion-card">       
              <Card.Header className="accordion-card-header">
                <Accordion.Toggle as={Button} variant="link" eventKey="4" className="accordion-card-btn">
                How do I lorem ipsum dolor sit amet?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <Card.Body className="accordion-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="accordion-card">       
              <Card.Header className="accordion-card-header">
                <Accordion.Toggle as={Button} variant="link" eventKey="5" className="accordion-card-btn">
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
