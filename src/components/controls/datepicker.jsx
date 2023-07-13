import { ErrorMessage, Field } from 'formik';
import React from 'react';
// import DateView from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker-min.module.css";
// import TextError from '../../TextError';

const Datepicker = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{name}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            // <DateView
            //   id={name}
            //   {...field}
            //   {...rest}
            //   selected={value}
            //   onChange={(val) => setFieldValue(name, val)}
            // />
            <p>hi</p>
          );
        }}
      </Field>
      {/* <ErrorMessage name={name} component={TextError} /> */}
    </div>
  );
};

export default Datepicker;
