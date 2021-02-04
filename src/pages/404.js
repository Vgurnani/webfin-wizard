import React from 'react'
import
{
    Row,
    Col,
    Container
}
    from 'react-bootstrap';
import { Link } from 'react-router-dom'
import notFound from '../public/images/notFound.png';
/* eslint-disable */

const NotFoundPage = () => (
    <section className="login-section main-section">
        <Container>
            <section className="page-section not-found-page">
                <Row className="align-items-center">
                    <Col className="col-6">
                        <h1>    404 Page not found.</h1>
                        <div className="not-found-btns">
                            <Link to='/' className="btn btn-primary">Return home</Link><br/>
                            <p>We're unable to find the page you are looking for. </p>
                        </div>
                    </Col>
                    <Col className="col-6 text-center">
                        <figure>
                            <img src={ notFound } alt="404 Not found" />
                        </figure>
                    </Col>
                </Row>
            </section>

        </Container>
    </section>

)

export default NotFoundPage
