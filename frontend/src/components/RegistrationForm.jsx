import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Form, FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import cn from 'classnames';
import axios from 'axios';
import { errorToast } from '../utils/toasts';

import { signupSchema } from '../utils/schemas';

const RegistrationForm = () => {
  const [userAlreadyExists, setUserAlreadyExists] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    await axios
      .post('/api/v1/signup', { username, password })
      .then(({ data }) => {
        window.localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      })
      .catch(({ response }) => {
        errorToast(t(`toasts.${response.statusText}`));
        setUserAlreadyExists(true);
        setTimeout(() => setUserAlreadyExists(false), 10000);
      });
  };

  const { values, handleChange, errors, touched, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        username: '',
        password: '',
        passwordConfirmation: '',
      },
      validationSchema: signupSchema,
      onSubmit,
    });

  const isFieldInvalid = (type) =>
    userAlreadyExists ||
    (Object.hasOwn(errors, type) && Object.hasOwn(touched, type));

  const classes = (type) => cn({ 'is-invalid': isFieldInvalid(type) });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <h1 className="mb-4">{t('signupPage.title')}</h1>
        <FloatingLabel
          controlId="username"
          label={t('signupPage.name')}
          className="mb-3"
        >
          <Form.Control
            placeholder={t('signupPage.name')}
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes('username')}
          />
          {errors.username && (
            <div className="invalid-tooltip">
              {t(`errors.${errors.username}`)}
            </div>
          )}
        </FloatingLabel>
        <FloatingLabel
          controlId="password"
          label={t('signupPage.password')}
          className="mb-3"
        >
          <Form.Control
            placeholder={t('signupPage.password')}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes('password')}
          />
          {errors.password && (
            <div className="invalid-tooltip">
              {t(`errors.${errors.password}`)}
            </div>
          )}
        </FloatingLabel>
        <FloatingLabel
          controlId="passwordConfirmation"
          label={t('signupPage.passwordConfirmation')}
          className="mb-3"
        >
          <Form.Control
            placeholder={t('signupPage.passwordConfirmation')}
            value={values.passwordConfirmation}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes('passwordConfirmation')}
          />
          {errors.passwordConfirmation && (
            <div className="invalid-tooltip">
              {t(`errors.${errors.passwordConfirmation}`)}
            </div>
          )}
        </FloatingLabel>
        <Button variant="outline-info" className="w-100" type="submit">
          {t('signupPage.btn')}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default RegistrationForm;
