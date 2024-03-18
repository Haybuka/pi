import React, { useState } from 'react';
import { ReactComponent as LoginLogo } from './loginLogo.svg';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/button';
import AuthSlider from '../AuthSlider';
import Section from './Section';
import GridWrapper from './Grid';
import { useGetBank } from '../../../api/bank';
import { toast } from 'react-toastify';
import { useFormik, FormikProvider, Field } from 'formik';

import 'react-toastify/dist/ReactToastify.css';
import PiField from '../../../components/piField';
import PiSelect from '../../../components/piField/piSelect';
import { useEffect } from 'react';

// #1a56db
const Register = () => {
  const navigate = useNavigate();

  const onError = (error) => {
    toast(error?.response?.data.result.message.split('_').join(' '));
  };

  const onSuccess = (response) => {
    try {
      if (response.success.status !== 1) {
        throw new Error();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const options = {
    onError,
    onSuccess,
  };

  const { data: bankData, isFetched: bankFetched } = useGetBank(options);

  const [banks, setBanks] = useState([]);

  useEffect(() => {
    setBanks(
      bankData?.content?.data?.map((bank) => ({
        ...bank,
        name: bank?.bankName,
      }))
    );
  }, [bankFetched, bankData?.content?.data]);

  const gender = [{ name: 'Male' }, { name: 'Female' }, { name: 'Others' }];

  const state = [
    { name: 'Lagos', id: 1 },
    { name: 'Kwarra', id: 2 },
    { name: 'Ibadan', id: 3 },
  ];

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      stateObj: {
        id: '',
        name: '',
      },
      bank: '',
      accountNumber: '',
      accountName: '',
      accountdetails: {
        username: '',
        password: '',
        fullname: '',
      },
    },
    // validationSchema: yup.object().shape({
    //   username: yup.string().required('Above field cannot be blank.'),
    //   password: yup.string().required('Above field is required.'),
    // }),
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  const { handleSubmit } = formik;

  return (
    <main className="w-screen h-screen grid grid-cols-12">
      <section className=" bg-white col-span-12 md:col-span-12 flex justify-center items-center flex-col my-3">
        <LoginLogo />
        <FormikProvider value={formik}>
          <form
            className="w-full px-6 md:w-[700px] my-4"
            onSubmit={handleSubmit}
          >
            <Section title={'Personal Details'}>
              <p className="my-4"></p>

              <PiField name={'name'} displayName={'Company name'} type="text" />
              <GridWrapper>
                <PiField
                  name={'accountdetails.fullname'}
                  displayName={'fullname'}
                  type="text"
                />

                <PiField
                  name={'accountdetails.username'}
                  displayName={'username'}
                  type="text"
                />
              </GridWrapper>
              <GridWrapper>
                <PiField
                  name={'accountdetails.password'}
                  displayName={'password'}
                  type="password"
                />
                <PiField
                  name={'phone'}
                  displayName={'phone number'}
                  type="text"
                />
              </GridWrapper>
              <PiField name={'email'} displayName={'email'} type="email" />
              <p className="my-4"></p>
              <PiField name={'address'} displayName={'address'} type="text" />
              <GridWrapper>
                <PiSelect name={'stateObj'} data={state} title="state" />
                <PiSelect name={'gender'} data={gender} title="gender" />
              </GridWrapper>
            </Section>
            <Section title={'Bank Details'}>
              <GridWrapper>
                {bankFetched ? (
                  <PiSelect name={'bank'} data={banks} title="bank" />
                ) : (
                  <label className="block relative floated-label col-span-6">
                    <p>Fetching Banks</p>
                  </label>
                )}

                <PiField
                  name={'accountNumber'}
                  displayName={'account number'}
                  type="text"
                />
              </GridWrapper>
              <PiField
                name={'accountName'}
                displayName={'account name'}
                type="text"
              />
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
        </FormikProvider>
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
