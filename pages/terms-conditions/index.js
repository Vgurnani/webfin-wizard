import React from 'react';
import TermsConditionPage from '../../components/TermsCondition';

import 
  {
    Container
  }
from 'react-bootstrap';


const TermsCondition = (props) => {
    return(
        
        <section className="login-section main-section">
        <Container>
            <TermsConditionPage />
        </Container>
        </section>
    )
}

export default TermsCondition;
