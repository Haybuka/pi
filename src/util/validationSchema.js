import * as yup from 'yup';

export const RegisterValidationSchema = {
  name: yup.string().required(' cannot be blank.'),
  address: yup.string().required(' cannot be blank.'),
  email: yup.string().email('is invalid').required('is required'),
  phone: yup
    .number()
    .required("is a required field.")
    .positive()
    .integer()
    .typeError('A number is required'),
  bank: yup.object().shape({
    id: yup.string().required(' be blank.'),
    bankName: yup.string(),
    enabled: yup.string(),
    health: yup.number()
  }),
  accountName: yup.string().required(' cannot be blank.'),
  accountNumber: yup
    .number()
    .required("is a required field.")
    .positive()
    .integer()
    .typeError('A number is required'),

  accountdetails: yup.object().shape({
    username: yup.string().required(' be blank.'),
    password: yup.string().required(' is required.'),
    fullname: yup.string().required(' is required.'),
  }),
  stateObj: yup.object().shape({
    name: yup.string().required(' is required.'),
  }),
}
