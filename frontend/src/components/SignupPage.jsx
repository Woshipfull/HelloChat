import React from 'react';
import { Card } from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';

import loginImg from '../styles/images/login.jpeg';

const SignupPage = () => (
  <div className="col-12 col-md-8 col-xxl-6 text-center">
    <Card className="shadow-sm mb-2">
      <Card.Body className="p-1">
        <div className="d-flex flex-column flex-md-row px-2 my-5">
          <div className="col d-flex justify-content-center align-items-center">
            <img className="rounded-circle img-custom" src={loginImg} alt="login" />
          </div>
          <div className="col">
            <RegistrationForm />
          </div>
        </div>
      </Card.Body>
    </Card>
  </div>
);

export default SignupPage;
