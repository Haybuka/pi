import { Field } from 'formik';
import React from 'react';

const PiField = ({ name, placeholder = '', type = 'text', displayName }) => {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => {
        return (
          <label className="block relative floated-label col-span-12 my-3 sm:my-0 sm:col-span-6">
            <input
              defaultValue={''}
              type={type}
              className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
              // placeholder={placeholder}
              {...field}
            />
            <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
              {displayName}
            </p>

            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </label>
        );
      }}
    </Field>
  );
};

export default PiField;
