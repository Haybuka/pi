import { Tab } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import Button from '../button/button';
import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import PiSelect from '../piField/piSelect';
import GridWrapper from '../../pages/auth/register/Grid';
import PiField from '../piField';
import { useGetBank } from '../../api/bank';
import { useMerchantUpdateRequest } from '../../api/merchants/register';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UpdateAccountForm = () => {
  const userProfile = JSON.parse(localStorage.getItem('__profile__'));

  const onError = (error) => {
    const errorMsg = error?.message
      ? error?.message
      : `${error?.response?.data.result.message.split('_').join(' ')} ${
          error?.response?.data.result.details
        }`;
    toast.error(`${errorMsg}`);
  };

  const onSuccess = (response) => {
    try {
      if (response.data.statusCode === 200) {
        toast.success(
          ` ${response?.data?.result?.message} : ${response?.data?.result?.details}`
        );
      }
    } catch (error) {
      throw Error(error);
    }
  };

  const options = {
    onError,
    onSuccess,
  };

  const { mutate: updateMerchantRequest, isLoading: updateLoading } =
    useMerchantUpdateRequest(options);

  const formik = useFormik({
    initialValues: {
      name: '',
      bank: '',
      accountNumber: '',
      accountName: '',
      email: '',
      phone: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(' cannot be blank.'),
      email: yup.string().email('is invalid').required('is required'),

      bank: yup
        .object()
        .shape({
          id: yup.string(' be blank.'),
          bankName: yup.string(),
          enabled: yup.string(),
          health: yup.number(),
        })
        .required(),
      accountName: yup.string().required(' cannot be blank.'),
      phone: yup
        .string()
        .required('is a required field.')
        // .matches(/^[0-9]+$/, "Must be only digits")
        .min(11, ' format is invalid')
        .max(11, ' format is invalid')
        .typeError('A number is required'),
      accountNumber: yup
        .number()
        .positive()
        .integer()
        .typeError('A number is required')
        .required(' cannot be blank.'),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      delete values.gender;

      if (!values.bank) {
        toast.error('Bank field is blank');
        setSubmitting(false);
        return;
      }

      const data = {
        ...values,
        address: userProfile?.organization?.address,
        stateObj: userProfile?.organization.state,
        longitude: userProfile?.organization.location.coordinates.longitude,
        latitude: userProfile?.organization.location.coordinates.latitude,
        bank: values.bank.bankName,
        accountNumber: values.accountNumber,
        accountName: values.accountName,
        settlementCharge: 0,
        allowWithdrawal: 1,
      };
      updateMerchantRequest(data);
      resetForm();
    },
  });

  const { handleSubmit } = formik;

  const { data: bankData, isFetched: bankFetched } = useGetBank();
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    setBanks(
      bankData?.content?.data?.map((bank) => ({
        ...bank,
        name: bank?.bankName,
      }))
    );
  }, [bankFetched, bankData?.content?.data]);

  return (
    <>
      <Tab.Panel className={classNames('rounded-xl p-3')}>
        <FormikProvider value={formik}>
          <form className="w-full  my-4" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <p className="w-24 h-24 my-6 bg-gray-200 rounded-full"></p>
            </div>
            <PiField name={'name'} displayName={'Name'} type="text" />

            <GridWrapper>
              <PiField name={'email'} displayName={'Email'} type="email" />
              <PiField
                name={'phone'}
                displayName={'Phone Number'}
                type="text"
              />
            </GridWrapper>
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
            <Button isSubmitting={updateLoading} text={'Change Password'} />
          </form>
        </FormikProvider>
      </Tab.Panel>
    </>
  );
};

export default UpdateAccountForm;
