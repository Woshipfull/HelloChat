import * as yup from 'yup';

const signupSchema = yup.object().shape({
  username: yup.string().min(3, 'userNameLength').max(20, 'userNameLength').required('emptyField'),
  password: yup.string().min(6, 'passwordLength').required('emptyField'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwordConfirmation')
    .required('emptyField'),
});

const loginSchema = yup.object().shape({
  username: yup.string().required('emptyField'),
  password: yup.string().required('emptyField'),
});

export { signupSchema, loginSchema };
