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
      password: '',
      confirmPassword: '',
      newPassword: '',
    },
    validationSchema: yup.object({
      password: yup.string().required('Password is required'),
      newPassword: yup.string().required('New password is required'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
    }),
    onSubmit: (values) => {
      console.log({ values }, 'update password');
    },
  });

  const {
    handleBlur,
    errors,
    values,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = formik;

  return (
    <>
      <Tab.Panel className={classNames('rounded-xl p-3')}>
        <FormikProvider value={formik}>
          <form className="w-full  my-4" onSubmit={handleSubmit}>
            <div className="my-6">
              <Inputs
                type="password"
                name="password"
                displayName="current password"
                value={values.password}
                handleInputChange={setFieldValue}
                handleBlur={handleBlur}
                error={errors?.password}
              />
            </div>
            <div className="my-6">
              <Inputs
                type="password"
                name="newPassword"
                displayName="new password"
                value={values.newPassword}
                handleInputChange={setFieldValue}
                handleBlur={handleBlur}
                error={errors?.newPassword}
              />
            </div>
            <div className="my-6">
              <Inputs
                type="password"
                name="confirmPassword"
                displayName="confirm password"
                value={values.confirmPassword}
                handleInputChange={setFieldValue}
                handleBlur={handleBlur}
                error={errors?.confirmPassword}
              />
            </div>
            <Button isSubmitting={isSubmitting} text={'Change Password'} />
          </form>
        </FormikProvider>
      </Tab.Panel>
      {modalIsOpen && <PasswordResetModal handleModal={handleModalClose} />}
    </>
  );
};

export default UpdatePasswordForm;
