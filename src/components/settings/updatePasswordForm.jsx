import { Tab } from '@headlessui/react';
import React, { useState } from 'react';
import PasswordResetModal from './modal/modal';
import Button from '../button/button';
import Inputs from '../input';
import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UpdatePasswordForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalClose = () => {
    setModalIsOpen((prev) => false);
  };
  // const handleSubmit = (e) => {

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    // validationSchema: yup.object().shape({
    //   username: yup.string().required('Above field cannot be blank.'),
    //   password: yup.string().required('Above field is required.'),
    // }),
    onSubmit: (values) => {
      console.log({ values }, 'update password');
    },
  });

  const { handleBlur, errors, values, handleSubmit, setFieldValue } = formik;

  return (
    <>
      <Tab.Panel className={classNames('rounded-xl p-3')}>
        <form>
          <label className="block relative floated-label my-6 col-span-6">
            <input
              type="text"
              className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
              placeholder="John Doe"
            />
            <p className="uppercase text-sm bg-white text-center translate-x-2 px-2">
              email
            </p>
          </label>
          {/* <button
            type="submit"
            onClick={}
            className="w-full bg-blue-700 text-white py-3 rounded-2xl capitalize"
          >
            reset
          </button> */}
          <Button
            type="submit"
            text={'reset'}
            handleClick={() => setModalIsOpen(true)}
          />
        </form>
        <FormikProvider value={formik}>
          <form className="w-full  my-4" onSubmit={handleSubmit}>
            <div className="my-6">
              <Inputs
                type="text"
                name="username"
                displayName="username"
                value={values.username}
                handleInputChange={setFieldValue}
                handleBlur={handleBlur}
                error={errors?.username}
              />
            </div>
            <div className="my-6">
              <Inputs
                type="password"
                name="password"
                displayName="password"
                value={values.password}
                handleInputChange={setFieldValue}
                handleBlur={handleBlur}
                error={errors?.password}
              />
            </div>
            <Button text={'Change Password'} />
          </form>
        </FormikProvider>
      </Tab.Panel>
      {modalIsOpen && <PasswordResetModal handleModal={handleModalClose} />}
    </>
  );
};

export default UpdatePasswordForm;
