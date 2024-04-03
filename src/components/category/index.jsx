import React, { useState } from 'react';
import Inputs from '../input';
import { useFormik, FormikProvider, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Button from '../button/button';
import {
  useCreateCategoryRequest,
  useUpdateCategoryRequest,
} from '../../api/products';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Upload from '../imageUpload/upload';
import Modal from '../modal/modal';

const Index = ({ isEdit = false, id, category = {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name] = useState('');
  const [details] = useState('');
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [imageId, setImageId] = useState('');

  const handleImageUpload = (data) => {
    setImageId(data);
    setModalIsOpen(true);
    setIsImageUpload(true);
  };

  const handleModalClose = () => {
    setModalIsOpen((prev) => false);
  };

  let initialValues = {
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
        fieldType: '2',
      },
    ],
  };

  let editValues = {
    name: category?.name,
    details: category?.details,
    productDetails: category?.productDetails,
    productOptions: category?.productOptions,
  };

  const onError = (error) => {
    const detail = error?.response.data?.result.details;
    toast.error(detail);
  };
  const onSuccess = (response) => {
    const message = response?.data?.result?.message;

    toast.success(message);

    resetForm();
    navigate('/');
  };
  const options = {
    onError,
    onSuccess,
  };

  const { mutate: createCategory } = useCreateCategoryRequest(options);
  const { mutate: updateCategory } = useUpdateCategoryRequest(options);

  const formik = useFormik({
    initialValues: !isEdit ? initialValues : editValues,
    // initialValues,
    validationSchema: yup.object().shape({
      name: yup.string().required('Name field is required.'),
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
            optionName: yup
              .string()
              .required('This Product field is required.'),
          })
        )
        .min(1, 'Need at least one form field'),
    }),
    onSubmit: (values) => {
      setSubmitting((prev) => true);
      if (!isEdit) {
        const data = { ...values };
        createCategory(data);
        setSubmitting((prev) => false);
      } else {
        const data = { id, ...values };
        updateCategory(data);
        setSubmitting((prev) => false);
      }
    },
  });
  const {
    handleBlur,
    errors,
    values,
    handleSubmit,
    setFieldValue,
    resetForm,
    getFieldProps,
  } = formik;

  return (
    <section className="text-black text-lg w-[800px] mx-auto">
      {isEdit ? (
        <h3 className="text-sm uppercase flex items-center gap-x-2">
          <span>Edit category</span>
          <span> . </span>
          <span
            onClick={handleImageUpload}
            className=" text-pi-500 cursor-pointer"
          >
            Upload Image
          </span>
        </h3>
      ) : (
        <h3 className="text-sm uppercase">create new category</h3>
      )}
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit} className="py-3">
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
            <h4 className="bg-white absolute -top-[18px] translate-y-[4px] px-3 text-sm uppercase">
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
                              {...getFieldProps(
                                `productDetails.${[index]}.field`
                              )}
                              displayName="e.g brand"
                              handleBlur={handleBlur}
                              handleInputChange={setFieldValue}
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
                          <div className="button-group w-1/2 mx-auto flex justify-center">
                            {index > 0 && (
                              <p
                                className="border px-3 py-2 mx-2 text-xl cursor-pointer rounded-xl hover:shadow-md active:shadow-sm"
                                onClick={() => remove(index)}
                              >
                                -
                              </p>
                            )}
                            <p
                              className="border px-3 py-2 mx-2 text-xl cursor-pointer rounded-xl hover:shadow-md active:shadow-sm"
                              onClick={() => push(index, '')}
                            >
                              +
                            </p>
                          </div>
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
            <h4 className="bg-white absolute -top-[18px] translate-y-[4px] px-3 text-sm uppercase">
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
                      return (
                        <section key={index} className="relative">
                          <div>
                            <aside className="my-6">
                              <Inputs
                                type="text"
                                name={`productOptions.${[index]}.optionTitle`}
                                {...getFieldProps(
                                  `productOptions.${[index]}.optionTitle`
                                )}
                                handleInputChange={setFieldValue}
                                displayName="title"
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
                                {...getFieldProps(
                                  `productOptions.${[index]}.optionName`
                                )}
                                handleInputChange={setFieldValue}
                                displayName="name"
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
                              {...getFieldProps(
                                `productOptions.${[index]}.fieldType`
                              )}
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
                          <div className="button-group w-1/2 mx-auto flex justify-center my-2">
                            {index > 0 && (
                              <p
                                className="border px-3 py-2 mx-2 text-xl cursor-pointer rounded-xl hover:shadow-md active:shadow-sm"
                                onClick={() => remove(index)}
                              >
                                -
                              </p>
                            )}
                            <p
                              className="border px-3 py-2 mx-2 text-xl cursor-pointer rounded-xl hover:shadow-md active:shadow-sm"
                              onClick={() => push(index, '')}
                            >
                              +
                            </p>
                          </div>
                        </section>
                      );
                    })}
                  </div>
                );
              }}
            </FieldArray>
            <aside></aside>
          </article>
          <Button
            text={isEdit ? 'Edit Category' : 'Create category'}
            isSubmitting={isSubmitting}
          />
          <p
            onClick={() => navigate('/categories')}
            className="text-red-700 bg-red-300 text-center  text-sm uppercase my-2 mb-6 py-3 rounded-2xl cursor-pointer"
          >
            Cancel
          </p>
        </form>
      </FormikProvider>

      {modalIsOpen && (
        <section className="w-full">
          <Modal
            handleModal={handleModalClose}
            classAdd={
              'w-full md:w-[800px] h-3/4 overflow-y-scroll relative bg-red-400'
            }
          >
            <Upload
              product={id}
              uploadType={'category'}
              handleModalClose={handleModalClose}
            />
          </Modal>
        </section>
      )}

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
