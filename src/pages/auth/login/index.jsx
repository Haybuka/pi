import React, { useState, useContext } from 'react';
import { ReactComponent as LoginLogo } from './loginLogo.svg';
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

import 'react-toastify/dist/ReactToastify.css';
import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Login = () => {
  const [username] = useState('');
  const [password] = useState('');
  const [isAccountSwitch, setIsAccountSwitch] = useState(false);
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

  const handleSetAccountType = (type) => {
    setAccountType(type);
    setIsAccountSwitch((prev) => !prev);
    setTimeout(() => {
      setIsAccountSwitch((prev) => !prev);
    }, 1000);
  };

  return (
    <main className="w-screen h-screen grid grid-cols-12 place-item-center">
      <section className="hidden h-full col-span-5 p-3">
        <aside className="h-full rounded-lg">
          <AuthSlider />
        </aside>
      </section>
      <section className="  col-span-12  flex justify-center items-center flex-col">
        <>
          <LoginLogo />
          <FormikProvider value={formik}>
            <form
              className="w-full px-6 md:w-[600px] my-4"
              onSubmit={handleSubmit}
            >
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                  <Tab
                    onClick={() => handleSetAccountType('admin')}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'focus:outline-none',
                        selected
                          ? 'bg-white'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    Login as Admin
                  </Tab>
                  <Tab
                    onClick={() => handleSetAccountType('merchant')}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'focus:outline-none',
                        selected
                          ? 'bg-white'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    Login as Merchant
                  </Tab>
                </Tab.List>
              </Tab.Group>
              {isAccountSwitch ? (
                <div className="my-6">
                  <Button isSubmitting={isAccountSwitch} text={''} />
                </div>
              ) : (
                <>
                  {' '}
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
                </>
              )}

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
