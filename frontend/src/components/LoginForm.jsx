import cn from 'classnames';
import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { errorToast } from '../utils/toasts';
import { loginSchema } from '../utils/schemas';

const LoginForm = () => {
  const [noUserExist, setNoUserExist] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await axios
      .post('/api/v1/login', values)
      .then(({ data }) => {
        window.localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      })
      .catch(({ response }) => {
        errorToast(t(`toasts.${response.statusText}`));
        setNoUserExist(true);
        setTimeout(() => setNoUserExist(false), 10000);
      });
  };

  const { values, handleChange, errors, touched, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  const isFieldInvalid = (type) =>
    noUserExist || (Object.hasOwn(errors, type) && Object.hasOwn(touched, type));

  const classes = (type) => cn({ 'is-invalid': isFieldInvalid(type) });

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
          {errors.username && (
            <div className="invalid-tooltip">
              {t(`errors.${errors.username}`)}
            </div>
          )}
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
          {errors.password && (
            <div className="invalid-tooltip">
              {t(`errors.${errors.password}`)}
            </div>
          )}
        </FloatingLabel>
        <Button variant="outline-info" className="w-100" type="submit">
          {t('loginPage.btn')}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
