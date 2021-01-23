import React from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import webFinLogo from '../../public/images/header/webFin-logo.svg';

const Footer = () => (
  <footer className="site-footer">
    <Container>
      <Row className="footer-top">
        <Col className="col-6 footer-logo-copyright">
          <Link to="/" title="Logo">
            <img src={webFinLogo} alt="WebFin" />
          </Link>
          <span className="copyright">
          &copy; 2020 Powered by Geekbears
          </span>
        </Col>
        <Col className="col-6 footer-social-icon-menu text-right">
          <ul>
            <li>
              <Link to="/">
              Account
              </Link>
            </li>
            <li>
              <Link to="/">
              Assesment
              </Link>
            </li>
          </ul>
          <ul className="social-links">
            <li>
              <Link to="/">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1.3335H10C9.11597 1.3335 8.26812 1.68469 7.643 2.30981C7.01788 2.93493 6.66669 3.78277 6.66669 4.66683V6.66683H4.66669V9.3335H6.66669V14.6668H9.33335V9.3335H11.3334L12 6.66683H9.33335V4.66683C9.33335 4.49002 9.40359 4.32045 9.52862 4.19543C9.65364 4.0704 9.82321 4.00016 10 4.00016H12V1.3335Z" stroke="#506BF0" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.6666 5.3335C11.7275 5.3335 12.7449 5.75492 13.4951 6.50507C14.2452 7.25521 14.6666 8.27263 14.6666 9.3335V14.0002H12V9.3335C12 8.97987 11.8595 8.64074 11.6094 8.39069C11.3594 8.14064 11.0202 8.00016 10.6666 8.00016C10.313 8.00016 9.97387 8.14064 9.72382 8.39069C9.47377 8.64074 9.33329 8.97987 9.33329 9.3335V14.0002H6.66663V9.3335C6.66663 8.27263 7.08805 7.25521 7.8382 6.50507C8.58834 5.75492 9.60576 5.3335 10.6666 5.3335V5.3335Z" stroke="#506BF0" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.00004 6H1.33337V14H4.00004V6Z" stroke="#506BF0" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.66671 4.00016C3.40309 4.00016 4.00004 3.40321 4.00004 2.66683C4.00004 1.93045 3.40309 1.3335 2.66671 1.3335C1.93033 1.3335 1.33337 1.93045 1.33337 2.66683C1.33337 3.40321 1.93033 4.00016 2.66671 4.00016Z" stroke="#506BF0" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3333 1.99987C14.6949 2.45019 13.988 2.79461 13.24 3.01987C12.8385 2.55821 12.3048 2.231 11.7113 2.08249C11.1178 1.93397 10.493 1.97133 9.92135 2.1895C9.34974 2.40768 8.85892 2.79614 8.51528 3.30235C8.17164 3.80856 7.99176 4.40809 7.99996 5.01987V5.68653C6.82838 5.71691 5.66748 5.45708 4.62063 4.93017C3.57379 4.40325 2.6735 3.62562 1.99996 2.66653C1.99996 2.66653 -0.666707 8.66653 5.33329 11.3332C3.96031 12.2652 2.32473 12.7325 0.666626 12.6665C6.66663 15.9999 14 12.6665 14 4.99987C13.9993 4.81417 13.9815 4.62893 13.9466 4.44653C14.627 3.77553 15.1072 2.92834 15.3333 1.99987Z" stroke="#506BF0" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.0266 4.27984C14.9474 3.96344 14.7862 3.67355 14.5591 3.43944C14.332 3.20533 14.0471 3.03529 13.7333 2.9465C12.5866 2.6665 7.99997 2.6665 7.99997 2.6665C7.99997 2.6665 3.41331 2.6665 2.26664 2.97317C1.95281 3.06196 1.66796 3.232 1.44087 3.46611C1.21378 3.70022 1.0525 3.99011 0.973308 4.3065C0.763451 5.47021 0.660798 6.65071 0.666641 7.83317C0.65916 9.02453 0.761819 10.214 0.973308 11.3865C1.06061 11.6931 1.22551 11.9719 1.45207 12.1962C1.67863 12.4204 1.95919 12.5824 2.26664 12.6665C3.41331 12.9732 7.99997 12.9732 7.99997 12.9732C7.99997 12.9732 12.5866 12.9732 13.7333 12.6665C14.0471 12.5777 14.332 12.4077 14.5591 12.1736C14.7862 11.9395 14.9474 11.6496 15.0266 11.3332C15.2349 10.1782 15.3375 9.00673 15.3333 7.83317C15.3408 6.64181 15.2381 5.4523 15.0266 4.27984V4.27984Z" stroke="#506BF0" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 10.0133L10.3333 7.83332L6.5 5.65332V10.0133Z" stroke="#506BF0" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3334 1.3335H4.66671C2.82576 1.3335 1.33337 2.82588 1.33337 4.66683V11.3335C1.33337 13.1744 2.82576 14.6668 4.66671 14.6668H11.3334C13.1743 14.6668 14.6667 13.1744 14.6667 11.3335V4.66683C14.6667 2.82588 13.1743 1.3335 11.3334 1.3335Z" stroke="#506BF0" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.6667 7.5802C10.7489 8.13503 10.6542 8.70168 10.3958 9.19954C10.1375 9.69741 9.72877 10.1011 9.22776 10.3533C8.72675 10.6055 8.15897 10.6933 7.6052 10.6042C7.05142 10.515 6.53985 10.2536 6.14323 9.85698C5.74662 9.46036 5.48516 8.94878 5.39605 8.39501C5.30694 7.84124 5.39472 7.27346 5.64689 6.77245C5.89907 6.27144 6.3028 5.86269 6.80066 5.60436C7.29853 5.34603 7.86518 5.25126 8.42001 5.33353C8.98596 5.41746 9.50991 5.68118 9.91447 6.08574C10.319 6.4903 10.5828 7.01425 10.6667 7.5802Z" stroke="#506BF0" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.6666 4.3335H11.6733" stroke="#506BF0" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="footer-menu">
        <Col className="col-12">
          <ul>
          <li>
              <Link to="/">
              Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/">
              Terms & Conditions
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  </footer>
)

export default Footer
