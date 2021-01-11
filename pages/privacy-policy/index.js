import React from 'react';
import PrivacyPolicyPage from '../../components/PrivacyPolicy';
import 
  {
    Container
  }
from 'react-bootstrap';


const PrivacyPolicy = () => {
    return(
        <section className="login-section main-section">
        <Container>
            <PrivacyPolicyPage />
        </Container>
        </section>
    )
}

export default PrivacyPolicy;
