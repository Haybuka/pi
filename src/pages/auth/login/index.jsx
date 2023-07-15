import React, { useState, useContext } from 'react';
import { ReactComponent as LoginLogo } from './loginLogo.svg';
import { ReactComponent as EyeSlash } from './eyeSlash.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import Inputs from '../../../components/input';
import { useLoginRequest } from '../../../api/login';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../components/button/button';
import { AuthContext } from '../../../context/authContext';

const Login = () => {
  const [username] = useState('');
  const [password] = useState('');
  const { handleProfileSet } = useContext(AuthContext);
  const onError = (error) => {
    toast(error?.response.data.result.message.split('_').join(' '));
  };

  const navigate = useNavigate('');

  const onSuccess = (response) => {
    const data = response?.data;
    const content = data.content;
    const profile = content.profile;
    toast(data.result.message);
    localStorage.setItem('__token__', content.token);
    localStorage.setItem('__profile__', JSON.stringify(profile));
    handleProfileSet(profile);
    navigate('/');
  };

  const options = {
    onError,
    onSuccess,
  };
  const { mutate: loginRequest } = useLoginRequest(options);

  const handleFormSubmit = (values) => {
    loginRequest(values);
  };

  const formik = useFormik({
    initialValues: {
      username,
      password,
    },
    validationSchema: yup.object().shape({
      username: yup.string().required('field cannot be blank.'),
      password: yup.string().required(' is required.'),
    }),
    onSubmit: (values) => {
      handleFormSubmit(values);
      setSubmitting(false);
    },
  });

  const {
    handleBlur,
    errors,
    values,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    setSubmitting,
  } = formik;
  return (
    <main className="w-screen h-screen grid grid-cols-12">
      <section className="hidden md:block h-full col-span-5 w-full p-3">
        <aside className="h-full bg-[#002D62] rounded-lg"></aside>
      </section>
      <section className=" bg-white col-span-12 md:col-span-7 flex justify-center items-center flex-col">
        <>
          <LoginLogo />
          <FormikProvider value={formik}>
            <form
              className="w-full px-6 md:w-[500px] my-4"
              onSubmit={handleSubmit}
            >
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
              <Button isSubmitting={isSubmitting} text={'login'} />

              <p className="my-4">
                Dont have an account ?
                <Link to="/register" className="text-[#002D62]">
                  {' '}
                  sign up
                </Link>
              </p>
              <p className="my-4 text-center">
                <span className="text-[#002D62">forgot password?</span>
              </p>
            </form>
          </FormikProvider>
        </>
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
    </main>
  );
};

export default Login;
