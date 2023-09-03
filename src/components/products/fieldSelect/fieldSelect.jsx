import React, { useState } from 'react';
import { useFormik, FormikProvider } from 'formik';
import Inputs from '../../input';
import FormikControl from './formikControl';

const FieldSelection = ({ options }) => {
  // const [name, setName] = useState('');
  const handleInputType = (value) => {
    switch (value) {
      case 0:
        return 'date';
      case 1:
        return 'datetime-local';
      case 2:
        return 'text';
      case 3:
        return 'number';
      case 4:
        return 'drop-down';
      default:
        return 'date';
    }
  };
  const formik = useFormik({
    initialValues: {
      ...options?.name,
    },
    onSubmit: (values) => {
      // handleFormSubmit(values);
      console.log({ values });
    },
  });

  const { getFieldProps, handleSubmit, setFieldValue } = formik;
  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        {options.fieldType !== 4 ? (
          <div className="relative mt-6 w-full">
            <p className="text-lg font-semibold capitalize">
              {options?.optionName}
            </p>
            <label
              htmlFor={options.optionName}
              className="block text-md font-base text-black dark:text-gray-400 mb-2"
            >
              {options?.optionTitle}
            </label>
            <input
              type={`${handleInputType(options.fieldType)}`}
              {...getFieldProps(`${options.optionName}`)}
              className="w-full rounded-md px-2.5 text-sm text-gray-900 bg-white dark:bg-gray-700 border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#f47f30] peer"
            />
          </div>
        ) : (
          <div className="relative mt-6 w-full">
            <p className="text-lg font-semibold capitalize">
              {options?.optionName}
            </p>

            <label className="block text-md font-base text-black dark:text-gray-400 mb-2">
              {options?.optionTitle}
            </label>
            <select
              name="optionType"
              id="optionType"
              className="p-2 my-2 outline-none border-0 capitalize w-full"
            >
              <option>data</option>
            </select>
          </div>
        )}
      </form>
    </FormikProvider>
  );
};

export default FieldSelection;
