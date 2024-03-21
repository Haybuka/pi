import { useState } from 'react';
import { ReactComponent as LoginLogo } from './loginLogo.svg';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/button';
import AuthSlider from '../AuthSlider';
import Section from './Section';
import GridWrapper from './Grid';
import { useGetBank } from '../../../api/bank';
import { toast } from 'react-toastify';
import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';
import PiField from '../../../components/piField';
import PiSelect from '../../../components/piField/piSelect';
import { useEffect } from 'react';
import { RegisterValidationSchema } from '../../../util/validationSchema';
import { useMerchantRegisterRequest } from '../../../api/merchants/register';
import useGeolocation from '../../../hooks/useGeoLocation';
import { useGetStates } from '../../../api/utils';
import PlacesUi from './placesUi';

// #1a56db
const Register = () => {
  const navigate = useNavigate();

  const onError = (error) => {
    toast.error(
      `${error?.response?.data.result.message.split('_').join(' ')} ${
        error?.response?.data.result.details
      }`
    );
    console.log({ error }, 'on error');
  };

  const onSuccess = (response) => {
    toast.success('Account created ');
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const options = {
    onError,
    onSuccess,
  };

  const { data: bankData, isFetched: bankFetched } = useGetBank();
  const { mutate: createMerchantRequest, isLoading: merchantLoading } =
    useMerchantRegisterRequest(options);

  const { data: states, isFetched: statesFetched } = useGetStates();

  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

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
    validationSchema: yup.object().shape(RegisterValidationSchema),
    onSubmit: (values) => {
      delete values.gender;
      const data = {
        ...values,
        bank: values.bank.bankName,
        longitude: coordinates.lng,
        latitude: coordinates.lat,
        settlementCharge: 0,
        allowWithdrawal: 1,
      };

      createMerchantRequest(data);
    },
  });

  const { handleSubmit, setFieldValue } = formik;

  const handleAddress = (value) => {
    setFieldValue('address', value?.value);
    setCoordinates(value?.latlng);
  };

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

              <PiField name={'name'} displayName={'Company Name'} type="text" />
              <GridWrapper>
                <PiField
                  name={'accountdetails.fullname'}
                  displayName={'Fullname'}
                  type="text"
                />

                <PiField
                  name={'accountdetails.username'}
                  displayName={'Username'}
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
                  displayName={'Phone Number  +234'}
                  type="text"
                />
              </GridWrapper>
              <PiField name={'email'} displayName={'Email'} type="email" />
              <p className="my-8"></p>
              <PlacesUi
                name={'address'}
                displayName={'Address'}
                type="text"
                handleAddress={handleAddress}
              />
              <GridWrapper>
                {statesFetched ? (
                  <PiSelect
                    name={'stateObj'}
                    data={states?.content}
                    title="State"
                  />
                ) : (
                  <label className="block relative floated-label col-span-6">
                    <p>Fetching States</p>
                  </label>
                )}
                <PiSelect name={'gender'} data={gender} title="Gender" />
              </GridWrapper>
            </Section>
            <Section title={'Bank Details'}>
              <div className="my-4 mb-12">
                {bankFetched ? (
                  <PiSelect name={'bank'} data={banks} title="Bank" />
                ) : (
                  <label className="block relative floated-label col-span-6">
                    <p>Fetching Banks</p>
                  </label>
                )}
              </div>

              <GridWrapper>
                <PiField
                  name={'accountName'}
                  displayName={'Account Name'}
                  type="text"
                />

                <PiField
                  name={'accountNumber'}
                  displayName={'Account Number'}
                  type="text"
                />
              </GridWrapper>
            </Section>

            <Button
              isSubmitting={merchantLoading}
              text={`sign up`}
              classProp={`my-2`}
            />

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
