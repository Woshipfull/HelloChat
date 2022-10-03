import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import cn from 'classnames';

import { signupSchema } from '../schemas';

// SUBMIT!!!!
const onSubmit = (values, actions) => {
  console.log('HELLLLLLOOO!');
  console.log(values);
  console.log(actions);
};

const RegistrationForm = () => {
  const { values, handleChange, errors, touched, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: signupSchema,
    onSubmit,
  });

  const classes = (type) => cn({ 'is-invalid': Object.hasOwn(errors, type) && Object.hasOwn(touched, type) });

  const { t } = useTranslation();

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
          <div className="invalid-tooltip">
            {t(`errors.${errors.username}`)}
          </div>
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
          <div className="invalid-tooltip">
            {t(`errors.${errors.password}`)}
          </div>
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
          <div className="invalid-tooltip">
            {t(`errors.${errors.passwordConfirmation}`)}
          </div>
        </FloatingLabel>
        <Button variant="outline-info" className="w-100" type="submit">
          {t('signupPage.btn')}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default RegistrationForm;
