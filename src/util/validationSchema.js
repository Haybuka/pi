import * as yup from 'yup';

export const RegisterValidationSchema = {
  name: yup.string().required(' cannot be blank.'),
  address: yup.string().required(' cannot be blank.'),
  email: yup.string().email('is invalid').required('is required'),
  phone: yup.string()
    .required("is a required field.")
    // .matches(/^[0-9]+$/, "Must be only digits")
    .min(11, ' format is invalid')
    .max(11, ' format is invalid')
    .typeError('A number is required'),
  bank: yup.object().shape({
    id: yup.string(' be blank.'),
    bankName: yup.string(),
    enabled: yup.string(),
    health: yup.number()
  }),
  accountName: yup.string(' cannot be blank.'),
  accountNumber: yup
    .number()
    .positive()
    .integer()
    .typeError('A number is required'),

  accountdetails: yup.object().shape({
    username: yup.string().min(6, "must be at least 6 characters long").required(' be blank.'),
    password: yup.string().required(' is required.'),
    fullname: yup.string().required(' is required.'),
  }),
  stateObj: yup.object().shape({
    name: yup.string().required(' is required.'),
    id: yup.string().required(' is required.'),
  }),
}
