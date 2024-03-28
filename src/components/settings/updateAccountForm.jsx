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
import { useGetSelf } from '../../api/login';
import { useGetImageFile } from '../../api/getImageFile';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UpdateAccountForm = () => {
  const { data: profile, isFetched: isProfileFetched } = useGetSelf();

  const logoRef = isProfileFetched && profile?.organization?.logo;

  const imageOptions = {
    fileAlias: logoRef,
    enabled: logoRef ? true : false,
  };
  const { data: imageFile = [], isFetched: imageFetched } =
    useGetImageFile(imageOptions);

  console.log(profile);
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
      name: profile?.organization ? profile?.organization?.name : '',
      bank: '',
      accountNumber: '',
      accountName: '',
      email: profile ? profile?.email : '',
      phone: profile?.organization ? profile?.organization?.phone : '',
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
        address: profile?.organization?.address,
        stateObj: profile?.organization.state,
        longitude: profile?.organization.location.coordinates.longitude,
        latitude: profile?.organization.location.coordinates.latitude,
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
              <p className="w-32 h-32 my-6 bg-gray-200 rounded-full overflow-hidden">
                {imageFetched && (
                  <img
                    alt=""
                    className="w-full h-full"
                    src={imageFile[imageFile?.length - 1]?.fullPath}
                  />
                )}
              </p>
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
