import React, { useState } from 'react';
import Inputs from '../input';
import { useFormik, FormikProvider, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Button from '../button/button';
import { useCreateCategoryRequest } from '../../api/products';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const onError = (error) => {
    console.log({ error }, 'error');
  };
  const onSuccess = (response) => {
    const data = response?.data?.content.message;
    toast(data);
  };
  const options = {
    onError,
    onSuccess,
  };

  const { mutate: createCategory } = useCreateCategoryRequest(options);

  const [name] = useState('');
  const [details] = useState('');

  const formik = useFormik({
    initialValues: {
      name,
      details,
      productDetails: [
        {
          field: '',
        },
      ],
      productOptions: [
        {
          optionTitle: '',
          optionName: '',
          fieldType: 0,
        },
      ],
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Above field is required.'),
      productDetails: yup
        .array()
        .of(
          yup.object().shape({
            field: yup.string().required('Above field is required.'),
          })
        )
        .min(1, 'Need at least one form field'),
      details: yup.string(),
      productOptions: yup
        .array()
        .of(
          yup.object().shape({
            optionTitle: yup.string(),
            fieldType: yup.string().required('required'),
            optionName: yup.string().required('Above field is required.'),
          })
        )
        .min(1, 'Need at least one form field'),
    }),
    onSubmit: (values) => {
      const data = { ...values };
      createCategory(data);
      setSubmitting(false);
      formik.resetForm();
    },
  });
  const {
    handleBlur,
    errors,
    values,
    handleSubmit,
    setFieldValue,
    setSubmitting,
  } = formik;

  // console.log(errors);

  return (
    <section className="text-black text-lg w-[800px] mx-auto">
      <h3 className="text-xl">Create new category</h3>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <div className="my-6">
            <Inputs
              type="text"
              name="name"
              displayName="name"
              value={values.name}
              handleInputChange={setFieldValue}
              handleBlur={handleBlur}
              error={errors?.name}
            />
          </div>
          <div className="my-6">
            <Inputs
              type="text"
              name="details"
              displayName="details"
              value={values.details}
              handleInputChange={setFieldValue}
              handleBlur={handleBlur}
              error={errors?.details}
            />
          </div>

          <article className="relative border rounded-lg py-4 px-3 my-6">
            <h4 className="bg-white absolute -top-[20px] translate-y-[5px] px-3">
              Product Details
            </h4>
            <FieldArray name="productDetails">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { productDetails } = values;
                // console.log(productDetails);
                return (
                  <div>
                    {productDetails.map((name, index) => {
                      // console.log(errors.productDetails[index].name);
                      return (
                        <section key={index} className="relative">
                          <div className="my-6">
                            <Inputs
                              type="text"
                              name={`productDetails.${[index]}.field`}
                              // {...getFieldProps(`${options.optionName}`)}
                              displayName="e.g brand"
                              // value={values.details}
                              handleInputChange={setFieldValue}
                              handleBlur={handleBlur}
                            />
                            <ErrorMessage
                              name={`productDetails.${[index]}.field`}
                              render={(msg) => (
                                <div className="text-[14px] text-red-500 block mt-1 capitalize">
                                  {msg}
                                </div>
                              )}
                            />
                          </div>
                          <p className="button-group w-1/2 mx-auto flex justify-center">
                            {index > 0 && (
                              <p
                                className="border px-3 py-2 mx-2 text-xl"
                                onClick={() => remove(index)}
                              >
                                -
                              </p>
                            )}
                            <p
                              className="border px-3 py-2 mx-2 text-xl"
                              onClick={() => push(index, '')}
                            >
                              +
                            </p>
                          </p>
                        </section>
                      );
                    })}
                  </div>
                );
              }}
            </FieldArray>
            <aside></aside>
          </article>
          <article className="relative border rounded-lg py-4 px-3 mb-6">
            <h4 className="bg-white absolute -top-[20px] translate-y-[5px] px-3">
              Product Options
            </h4>
            <FieldArray name="productOptions">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { productOptions } = values;
                return (
                  <div>
                    {productOptions.map((name, index) => {
                      // console.log(
                      //   values.productOptions[index].fieldType,
                      //   values.productOptions[index].optionName
                      // );
                      // console.log(index, name);
                      return (
                        <section key={index} className="relative">
                          <div>
                            <aside className="my-6">
                              <Inputs
                                type="text"
                                name={`productOptions.${[index]}.optionTitle`}
                                // {...getFieldProps(`${options.optionName}`)}
                                displayName="title"
                                // value={values.details}
                                handleInputChange={setFieldValue}
                                handleBlur={handleBlur}
                              />
                              <ErrorMessage
                                name={`productOptions.${[index]}.optionTitle`}
                                render={(msg) => (
                                  <div className="text-[14px] text-red-500 block mt-1 capitalize">
                                    {msg}
                                  </div>
                                )}
                              />
                            </aside>
                            <aside className="my-6">
                              <Inputs
                                type="text"
                                name={`productOptions.${[index]}.optionName`}
                                // {...getFieldProps(`${options.optionName}`)}
                                displayName="name"
                                // value={values.details}
                                handleInputChange={setFieldValue}
                                handleBlur={handleBlur}
                              />
                              <ErrorMessage
                                name={`productOptions.${[index]}.optionName`}
                                render={(msg) => (
                                  <div className="text-[14px] text-red-500 block mt-1 capitalize">
                                    {msg}
                                  </div>
                                )}
                              />
                            </aside>
                            <select
                              className="w-full py-3 px-4 outline-none focus:outline-none shadow-lg rounded-2xl block"
                              name={`productOptions.${[index]}.fieldType`}
                              // {...getFieldProps(
                              //   `productOptions.${[index]}.fieldType`
                              // )}
                              onChange={(event) => {
                                setFieldValue(
                                  `productOptions.${[index]}.fieldType`,
                                  Number(event.target.value)
                                );
                              }}
                            >
                              <option value="0">date</option>
                              <option value="1">date and time</option>
                              <option value="2">text</option>
                              <option value="3">number</option>
                              <option value="4">drop down</option>
                            </select>
                            {/* {values?.productOptions[index].fieldType ===
                              '4' && (
                              <>
                                <p>option value</p>
                              </>
                            )} */}
                          </div>
                          <p className="button-group w-1/2 mx-auto flex justify-center my-2">
                            {index > 0 && (
                              <p
                                className="border px-3 py-2 mx-2 text-xl"
                                onClick={() => remove(index)}
                              >
                                -
                              </p>
                            )}
                            <p
                              className="border px-3 py-2 mx-2 text-xl"
                              onClick={() => push(index, '')}
                            >
                              +
                            </p>
                          </p>
                        </section>
                      );
                    })}
                  </div>
                );
              }}
            </FieldArray>
            <aside></aside>
          </article>
          <Button text={'Create category'} />
        </form>
      </FormikProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

export default Index;
