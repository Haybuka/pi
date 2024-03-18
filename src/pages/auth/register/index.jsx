import React, { useState } from 'react';
import { ReactComponent as LoginLogo } from './loginLogo.svg';
import { ReactComponent as EyeSlash } from './eyeSlash.svg';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/button/button';
import AuthSlider from '../AuthSlider';
import Section from './Section';
import PiDropdown from './dropDown';
import GridWrapper from './Grid';
import { useGetBank } from '../../../api/bank';
import { toast } from 'react-toastify';
import { useFormik, FormikProvider } from 'formik';

import 'react-toastify/dist/ReactToastify.css';

// #1a56db
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onError = (error) => {
    toast(error?.response?.data.result.message.split('_').join(' '));
  };

  const onSuccess = (response) => {
    try {
      if (response.success.status !== 1) {
        throw new Error();
      }
      console.log(response, 'response here');
      // const data = response?.data;
      // const content = data.content;
      // const profile = content.profile;
    } catch (error) {}
  };

  const options = {
    onError,
    onSuccess,
  };

  const { data: bankData } = useGetBank(options);

  console.log(bankData?.content?.data);

  console.log(bankData);
  const gender = [{ name: 'Male' }, { name: 'Female' }, { name: 'Others' }];
  const state = [{ name: 'Lagos' }, { name: 'Kwarra' }, { name: 'Ibadan' }];
  const bank = [{ name: 'Access' }, { name: 'Gt Bank' }, { name: 'Wema' }];

  const formik = useFormik({
    initialValues: {
      username,
      password,
    },
    // validationSchema: yup.object().shape({
    //   username: yup.string().required('Above field cannot be blank.'),
    //   password: yup.string().required('Above field is required.'),
    // }),
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  const { handleBlur, errors, values, handleSubmit, setFieldValue } = formik;

  return (
    <main className="w-screen h-screen grid grid-cols-12">
      <section className=" bg-white col-span-12 md:col-span-12 flex justify-center items-center flex-col my-3">
        <LoginLogo />
        <form className="w-full px-6 md:w-[700px] my-4">
          <Section title={'Personal Details'}>
            <GridWrapper>
              <label className="block relative floated-label col-span-6">
                <input
                  // value={username}
                  type="text"
                  className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                  placeholder="John Doe"
                />
                <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                  fullname
                </p>
              </label>
              <label className="block relative floated-label w-full col-span-6">
                <input
                  value={username}
                  type="text"
                  className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                  placeholder="John Doe"
                />
                <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                  username
                </p>
              </label>
            </GridWrapper>
            <GridWrapper>
              <label className="block relative floated-label col-span-6">
                <input
                  value={password}
                  type="text"
                  className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                  placeholder="John Doe"
                />
                <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                  password
                </p>
              </label>
              <label className="block relative floated-label w-full col-span-6">
                <input
                  value={username}
                  type="text"
                  className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                  placeholder="John Doe"
                />
                <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                  phone
                </p>
              </label>
            </GridWrapper>
            <label className="block relative floated-label my-6 w-full">
              <input
                // value={password}
                type="text"
                className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                placeholder="John Doe"
              />
              <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                address
              </p>
            </label>
            <GridWrapper>
              <label className="block relative floated-label col-span-6">
                <PiDropdown title="State" data={state} />
              </label>
              <label className="block relative floated-label w-full col-span-6">
                <PiDropdown title="Gender" data={gender} />
              </label>
            </GridWrapper>
          </Section>
          <Section title={'Bank Details'}>
            <GridWrapper>
              <label className="block relative floated-label col-span-6">
                <PiDropdown title="Bank" data={bank} />
              </label>
              <label className="block relative floated-label w-full col-span-6">
                <input
                  value={username}
                  type="text"
                  className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                  placeholder="John Doe"
                />
                <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                  Account Number
                </p>
              </label>
            </GridWrapper>
            <label className="block relative floated-label my-6 w-full">
              <input
                type="text"
                className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                placeholder="John Doe"
              />
              <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                account name
              </p>
            </label>
          </Section>

          <Button text={`sign up`} classProp={`my-2`} />

          <p
            onClick={() => navigate('/')}
            className="w-full  text-black text-center py-3 rounded-2xl uppercase text-sm cursor-pointer"
          >
            Already have an account ?{' '}
            <span className="text-[#002D62] cursor-pointer">login</span>
          </p>
        </form>
      </section>
      <section className="hidden  h-full col-span-6 w-full p-3">
        <aside className=" h-full rounded-lg">
          <AuthSlider />
        </aside>
      </section>
    </main>
  );
};

export default Register;
