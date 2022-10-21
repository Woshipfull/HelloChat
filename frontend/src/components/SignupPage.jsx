import React from 'react';
import { Card } from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';

import signupImg from '../styles/images/signup.png';

const SignupPage = () => (
  <div className="d-flex flex-fill justify-content-center align-items-center pt-2 pb-3">
    <div className="col-12 col-md-8 col-xxl-6 text-center">
      <Card className="shadow-sm mb-2">
        <Card.Body className="p-1">
          <div className="d-flex flex-column flex-md-row px-2 my-5">
            <div className="col d-flex justify-content-center align-items-center">
              <img className="img-custom" src={signupImg} alt="login" />
            </div>
            <div className="col">
              <RegistrationForm />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  </div>
);

export default SignupPage;
