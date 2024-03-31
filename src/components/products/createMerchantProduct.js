import React, { useState } from 'react'
import styles from './products.module.css'
import { useCreateMerchantProductRequest, useUpdateMerchantProductRequest } from '../../api/products';
import Inputs from '../input';
import { useFormik, FormikProvider, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Button from '../button/button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCreateMerchantProductImageRequest } from '../../api/merchants/products';
import { useGetImageFile } from '../../api/getImageFile';

const CreateMerchantProduct = ({ category, id, isEdit = false }) => {


  const [file, setFile] = useState()
  const [fileUpload, setFileUpload] = useState()
  const navigate = useNavigate()
  const handleInputType = (value) => {
    // console.log(value)
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
        return 'text';
    }
  };

  const handleFileChange = (e) => {
    if (e?.target?.files[0]?.type.includes("image")) {
      setFile(URL.createObjectURL(e?.target?.files[0]))
      setFileUpload(e?.target?.files[0])

    } else {
      toast.error("invalid file type")
    }

  }

  const handleImageUpload = () => {

    const formData = new FormData();
    formData.append("id", id);
    formData.append("images", file);
    // uploadImageRequest(formData)
  }

  let initialValues = {
    baseAmount: category?.baseAmount ? category?.baseAmount : '',
    ...category
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

  const { mutate: createProduct } = useCreateMerchantProductRequest(options);
  const { mutate: updateProduct } = useUpdateMerchantProductRequest(options);

  //Code to grap images
  const imageRef = category ? category?.images : category.catImage;


  const imageOptions = {
    fileAlias: imageRef,
    enabled: imageRef ? true : false,
  };

  console.log({ imageOptions })

  const { data: imageFile = [], isFetched: imageFetched } =
    useGetImageFile(imageOptions);


  let validationShape = {
    baseAmount: yup.number("Value must be a number").min(1).required("base amount rewuired"),

    productDetails: yup
      .array()
      .of(
        yup.object().shape({
          description: yup.string().required('field is required.'),
        })
      ),
    productOptions: yup
      .array()
      .of(
        yup.object().shape({
          optionName: yup.string().required('field is required.'),
          options: yup.lazy((value) => {

            switch (typeof value) {
              case 'string':
                return yup.string().required('Required field').typeError('Required field')
              case 'number':
                return yup.string().required('Required field').typeError('Required field')

              default:
                return yup.array()
                  .of(
                    yup.object().shape({
                      option: yup.string().required('field is required.'),
                      price: yup.string().required('field is required.')
                    })
                  )
            }
          }),

        })
      ),
  }



  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape(validationShape),
    onSubmit: (value) => {
      const values = { category: category.id, ...value };
      delete values.catImage
      delete values.id
      delete values.listOnHome




      if (!isEdit) {
        // console.log(values)
        let newValues = values.productOptions.map((options, id) => {
          if (options.fieldAction === null) {
            options.fieldAction = 2
            console.log("action is null")
          }
          return options
        })

        // console.log(newValues, "new values")
        const data = { ...values, productOptions: newValues };
        console.log(data)
        createProduct(data);
      } else {
        const data = { id: id, ...values };
        console.log({ data })
        updateProduct(data);
      }
    },
  });

  const {
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
    getFieldProps,
    errors
  } = formik;


  return (
    <section className="text-black my-6 w-full">
      <aside className="border justify-between items-center mb-2 bg-white p-4 rounded-lg">
        <article className="flex w-full justify-between items-center">
          <section className='flex items-center'>
            <div className="w-[120px] h-[120px] mx-auto bg-gray-100 rounded-full overflow-hidden">
              {imageFetched && (
                <img
                  alt=""
                  className="w-full h-full aspect-square "
                  src={
                    imageFile[imageFile?.length - 1]?.fullPath
                  }
                />
              )}
              {/* {file && <img src={file} alt='product ' className='w-full h-full' />} */}
            </div>
            <div className='ml-3'>
              <h3 className="uppercase text-sm"> Name : {category?.name}</h3>
              <p className="uppercase text-sm my-2"> {category?.details}</p>
            </div>
          </section>
        </article>
      </aside>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit} className='grid-cols-12 gap-2'>

          <article className="relative border py-4 px-3 my-10 col-span-6 min-h-[200px] rounded-lg ">
            <h4 className="bg-white absolute -top-[18px] translate-y-[4px] px-3 text-sm uppercase">
              Product Details
            </h4>
            <aside>
              <div className="my-6">
                <Inputs
                  type="text"
                  name={`baseAmount`}
                  {...getFieldProps(
                    `baseAmount`
                  )}
                  displayName={`Base amount`}
                  handleBlur={handleBlur}
                  handleInputChange={setFieldValue}
                />
                <ErrorMessage
                  name={`baseAmount`}
                  render={(msg) => (
                    <div className="text-[12px] text-red-400 block mt-2 uppercase">
                      {msg}
                    </div>
                  )}
                />
              </div>
              {
                category?.productDetails?.map((details, index) => (
                  <div className="my-6" key={index}>
                    <Inputs
                      type="text"
                      name={`productDetails.${[index]}.description`}
                      {...getFieldProps(
                        `productDetails.${[index]}.description`
                      )}
                      displayName={`${details.field}`}
                      handleBlur={handleBlur}
                      handleInputChange={setFieldValue}
                    />
                    <ErrorMessage
                      name={`productDetails.${[index]}.description`}

                      render={(msg) => (
                        <div className="text-[12px] uppercase text-red-400 block mt-2 ">
                          {details.field} {msg}
                        </div>
                      )}
                    />
                  </div>
                ))
              }
            </aside>



          </article>
          <article className="relative border py-4 px-8 my-10 col-span-6 min-h-[300px] rounded-lg ">
            <h4 className="bg-white absolute -top-[18px] translate-y-[4px] px-3 text-sm uppercase">
              Product options
            </h4>
            <aside>
              {
                category?.productOptions?.map((details, id) => (
                  <section key={id}>
                    {details.fieldType === 4 ?
                      (
                        <FieldArray name={`productOptions.${[id]}.options`}>
                          {(fieldArrayProps) => {
                            const { push, remove, form } = fieldArrayProps;
                            const { values } = form;
                            const { productOptions } = values;

                            let options = productOptions[id]?.options === null ? [{ option: "", price: '' }] : productOptions[id]?.options

                            return (

                              <div className='my-10 relative border py-4 px-8 col-span-6 min-h-[250px] rounded-lg '>
                                <h4 className="bg-white absolute -top-[18px] translate-y-[4px] px-3 text-sm uppercase">
                                  {productOptions[id].optionTitle}
                                </h4>

                                {options?.map((name, index) => {
                                  return (

                                    <section key={index} className="relative ">

                                      <aside className='grid grid-cols-12 gap-2 place-items-center'>
                                        <div className="my-2 col-span-5 w-full">
                                          <Inputs
                                            type="text"
                                            name={`productOptions.${[id]}.options.${[index]}.option`}
                                            {...getFieldProps(
                                              `productOptions.${[id]}.options.${[index]}.option`
                                            )}

                                            displayName={productOptions[id].optionTitle}
                                            handleBlur={handleBlur}
                                            handleInputChange={setFieldValue}
                                          />
                                          <ErrorMessage
                                            name={`productOptions.${[id]}.options.${[index]}.option`}
                                            render={(msg) => {
                                              return (
                                                <div className="text-[12px] uppercase text-red-400 block mt-2 ">
                                                  {`${productOptions[id].optionTitle} ${msg}`}
                                                </div>
                                              )
                                            }}
                                          />
                                        </div>
                                        <div className="my-2 col-span-5 w-full">
                                          <Inputs
                                            type="number"
                                            name={`productOptions.${[id]}.options.${[index]}.price`}
                                            {...getFieldProps(
                                              `productOptions.${[id]}.options.${[index]}.price`
                                            )}

                                            displayName={`cost of ${productOptions[id].optionTitle}`}
                                            handleBlur={handleBlur}
                                            handleInputChange={setFieldValue}
                                          />
                                          <ErrorMessage
                                            name={`productOptions.${[id]}.options.${[index]}.price`}
                                            render={(msg) => {
                                              return (


                                                <div className="text-[12px] uppercase text-red-400 block mt-2 ">
                                                  {` cost of ${productOptions[id].optionTitle} ${msg}`}
                                                </div>

                                              )
                                            }}
                                          />
                                        </div>
                                        <div className="button-group w-1/2 mx-auto flex justify-center col-span-2">
                                          {index > 0 && (
                                            <p
                                              className="border px-3 py-2 mx-2 text-xl cursor-pointer rounded-xl hover:shadow-md active:shadow-sm"
                                              onClick={() => remove(id)}
                                            >
                                              -
                                            </p>
                                          )}
                                          <p
                                            className="border px-3 py-2 mx-2 text-xl cursor-pointer rounded-xl hover:shadow-md active:shadow-sm"
                                            onClick={() => push({ option: "", price: "" })}
                                          >
                                            +
                                          </p>
                                        </div>
                                      </aside>
                                      <aside className='flex justify-evenly items-center'>


                                      </aside>

                                    </section>

                                  );
                                })}
                                <div className="my-4">
                                  <p className="uppercase bg-white text-sm translate-x-2 my-4">How does this affect base amount ?</p>

                                  <select
                                    defaultValue={2}
                                    className="w-full py-3 px-4 outline-none focus:outline-none shadow-lg rounded-2xl block text-sm uppercase"
                                    name={`productOptions.${[id]}.fieldAction`}
                                    {...getFieldProps(
                                      `productOptions.${[id]}.fieldAction`,
                                    )}
                                    onChange={(event) => {
                                      setFieldValue(
                                        `productOptions.${[id]}.fieldAction`,
                                        Number(event.target.value ? event.target.value : "2")
                                      );
                                    }}
                                  >
                                    <option value="0">add to base amount</option>
                                    <option value="1">multiply with base amount</option>
                                    <option value="2">no effect</option>
                                  </select>
                                  <ErrorMessage
                                    name={`productOptions.${[id]}.fieldAction`}

                                    render={(msg) => (
                                      <div className="text-[12px] uppercase text-red-400 block mt-2 ">
                                        {msg} hi
                                      </div>
                                    )}
                                  />
                                </div>

                              </div>
                            );
                          }}
                        </FieldArray>
                      )
                      :
                      (
                        <div className="my-6">
                          <Inputs

                            type={handleInputType(details?.fieldType)}
                            name={`productOptions.${[id]}.options`}
                            {...getFieldProps(
                              `productOptions.${[id]}.options`
                            )}
                            displayName={`${details.optionTitle}`}
                            handleBlur={handleBlur}
                            handleInputChange={setFieldValue}
                          />
                          <ErrorMessage
                            // name={`productOptions.${[id]}.optionName`}
                            name={`productOptions.${[id]}.options`}

                            render={(msg) => {
                              console.log({ msg })
                              return (
                                (
                                  <div className="text-[12px] uppercase text-red-400 block mt-2 ">
                                    {details.optionTitle} {msg}
                                  </div>
                                )
                              )
                            }}
                          />
                        </div>)

                    }
                    {/* <ErrorMessage
                      name={`productOptions.${[id]}.options`}

                      render={(msg) => (
                        <div className="text-[12px] uppercase text-red-400 block mt-2 ">
                          {details.optionTitle} {msg}
                        </div>
                      )}
                    /> */}
                  </section>
                ))
              }
            </aside>

          </article>
          <Button text="Submit" />

        </form>
      </FormikProvider>

    </section>
  )
}

export default CreateMerchantProduct

