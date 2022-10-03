import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import cn from 'classnames';

import { loginSchema } from '../schemas';

// SUBMIT!!!!
const onSubmit = (values, actions) => {
  console.log('HELLLLLLOOO!');
  console.log(values);
  console.log(actions);
};

const LoginForm = () => {
  const { values, handleChange, errors, touched, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  const classes = (type) => cn({ 'is-invalid': Object.hasOwn(errors, type) && Object.hasOwn(touched, type) });

  const { t } = useTranslation();

  return (
    <Form onSubmit={handleSubmit} className="is-invalid">
      <Form.Group>
        <h1 className="mb-4">{t('loginPage.title')}</h1>
        <FloatingLabel
          controlId="username"
          label={t('loginPage.name')}
          className="mb-3"
        >
          <Form.Control
            placeholder={t('loginPage.name')}
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
          label={t('loginPage.password')}
          className="mb-3"
        >
          <Form.Control
            placeholder={t('loginPage.password')}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes('password')}
          />
          <div className="invalid-tooltip">
            {t(`errors.${errors.password}`)}
          </div>
        </FloatingLabel>
        <Button variant="outline-info" className="w-100" type="submit">
          {t('loginPage.btn')}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
