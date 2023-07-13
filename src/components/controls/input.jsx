import React from 'react';
import { Field, ErrorMessage } from 'formik';
// import TextError from '../../TextError';
const Input = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field
        id={name}
        name={name}
        {...rest}
        className="w-full rounded-lg py-2 px-2.5 text-sm text-gray-900 bg-white dark:bg-gray-700 border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#f47f30] peer"
      />
      {/* <ErrorMessage name={name} component={TextError} /> */}
    </div>
  );
};

export default Input;
