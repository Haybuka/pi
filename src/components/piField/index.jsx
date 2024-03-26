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
          <label className="block relative floated-label col-span-12 my-4  sm:my-0 sm:col-span-6">
            <input
              type={type}
              className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-md rounded-2xl"
              {...field}
            />
            <p className="uppercase bg-white text-sm ">{displayName}</p>

            {meta.touched && meta.error && (
              <div className="error my-2 text-sm text-red-500">
                {`${displayName} ${meta.error}`}
              </div>
            )}
          </label>
        );
      }}
    </Field>
  );
};

export default PiField;
