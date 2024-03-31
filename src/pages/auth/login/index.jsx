import React, { useState, useContext } from 'react';
import { ReactComponent as LoginLogo } from './loginLogo.svg';
import { ReactComponent as EyeSlash } from './eyeSlash.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import Inputs from '../../../components/input';
import {
  useAdminLoginRequest,
  useMerchantLoginRequest,
} from '../../../api/login';

import { toast } from 'react-toastify';
import Button from '../../../components/button/button';
import { AuthContext } from '../../../context/authContext';
import AuthSlider from '../AuthSlider';

import AccountType from './accountType';
import { IconOne, IconTwo } from './dropIcons';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username] = useState('');
  const [password] = useState('');
  const { handleProfileSet } = useContext(AuthContext);
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const [accountType, setAccountType] = useState('admin');
  const navigate = useNavigate('');
  const onError = (error) => {
    toast(error?.response?.data.result.message.split('_').join(' '));
  };

  const onSuccess = (response) => {
    const data = response?.data;
    const content = data.content;
    const profile = content.profile;
    toast(data.result.message);
    localStorage.setItem('__token__', content.token);
    localStorage.setItem('__profile__', JSON.stringify(profile));
    handleProfileSet(profile);
    navigate(from, { replace: true });
    window.location.reload();
  };

  const options = {
    onError,
    onSuccess,
  };
  const { mutate: loginAdminRequest, isLoading: adminLoading } =
    useAdminLoginRequest(options);
  const { mutate: loginMerchantRequest, isLoading: merchantLoading } =
    useMerchantLoginRequest(options);

  const handleAdminFormSubmit = (values) => {
    loginAdminRequest(values);
  };

  const handleMerchantFormSubmit = (values) => {
    loginMerchantRequest(values);
  };

  const formik = useFormik({
    initialValues: {
      username,
      password,
    },
    validationSchema: yup.object().shape({
      username: yup.string().required('Above field cannot be blank.'),
      password: yup.string().required('Above field is required.'),
    }),
    onSubmit: (values) => {
      accountType === 'admin'
        ? handleAdminFormSubmit(values)
        : handleMerchantFormSubmit(values);
    },
  });

  const { handleBlur, errors, values, handleSubmit, setFieldValue } = formik;

  const accountOptions = [
    {
      name: 'Admin',
      description: 'Measure actions your users take.',
      icon: IconOne,
      action: () => setAccountType('admin'),
    },
    {
      name: 'Merchant',
      description: 'Begin your journey.',
      icon: IconTwo,
      action: () => setAccountType('merchant'),
    },
  ];

  return (
    <main className="w-screen h-screen grid grid-cols-12 place-item-center">
      <section className="hidden h-full col-span-5 p-3">
        <aside className="h-full rounded-lg">
          <AuthSlider />
        </aside>
      </section>
      <section className="  col-span-12  flex justify-center items-center flex-col">
        {/* {accountType === 'merchant' ? (
          <aside
            className="uppercase text-sm my-4 absolute top-10 left-6 text-[#002D62] cursor-pointer"
            onClick={() => setAccountType('merchant')}
          >
            merchant
          </aside>
        ) : (
          <aside
            className="uppercase text-sm my-4 absolute top-10 left-6 text-[#002D62] cursor-pointer"
            onClick={() => setAccountType('admin')}
          >
            admin
          </aside>
        )} */}
        <AccountType accountOptions={accountOptions} user={accountType} />
        <>
          <LoginLogo />
          <FormikProvider value={formik}>
            <form
              className="w-full px-6 md:w-[600px] my-4"
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
              <Button
                isSubmitting={adminLoading || merchantLoading}
                text={'login'}
              />

              <p className="w-full  text-black py-3 rounded-2xl uppercase text-sm cursor-pointer">
                Dont have an account ?
                <Link to="/register" className="text-[#002D62]">
                  {' '}
                  sign up
                </Link>
              </p>
              <p className="my-4 text-center uppercase text-sm">
                <span className="text-[#002D62] underline">
                  forgot password?
                </span>
              </p>
            </form>
          </FormikProvider>
        </>
      </section>
    </main>
  );
};

export default Login;
