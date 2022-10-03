import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import LoginForm from './LoginForm';

import loginImg from '../styles/images/login.jpeg';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className="col-12 col-md-8 col-xxl-6 text-center">
      <Card className="shadow-sm mb-2">
        <Card.Body className="p-1">
          <div className="d-flex flex-column flex-md-row px-2 my-5">
            <div className="col d-flex justify-content-center align-items-center">
              <img className="rounded-circle img-custom" src={loginImg} alt="login" />
            </div>
            <div className="col">
              <LoginForm />
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <p className="my-2">
            {t('loginPage.noAccount')}
            <Link to="/signup">{t('loginPage.link')}</Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default LoginPage;
