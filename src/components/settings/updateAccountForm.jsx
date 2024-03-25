import { Tab } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import PasswordResetModal from './modal/modal';
import Button from '../button/button';
import Inputs from '../input';
import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import PiSelect from '../piField/piSelect';
import GridWrapper from '../../pages/auth/register/Grid';
import PiField from '../piField';
import { useGetBank } from '../../api/bank';
import { RegisterValidationSchema } from '../../util/validationSchema';
import { useMerchantUpdateRequest } from '../../api/merchants/register';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UpdateAccountForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const userProfile = JSON.parse(localStorage.getItem('__profile__'));

  const handleModalClose = () => {
    setModalIsOpen((prev) => false);
  };

  const onError = (error) => {
    const errorMsg = error?.message
      ? error?.message
      : `${error?.response?.data.result.message.split('_').join(' ')} ${
          error?.response?.data.result.details
        }`;
    toast.error(`${errorMsg}`);
    console.log({ error }, 'on error');
  };

  const onSuccess = (response) => {
    toast.success('Account created ');
  };

  const options = {
    onError,
    onSuccess,
  };

  const { mutate: updateUser, isLoading: updateLoading } =
    useMerchantUpdateRequest(options);

  // {
  //   name: '',
  //   address: '',
  //   phone: '',
  //   email: '',
  //   stateObj: {
  //     id: '',
  //     name: '',
  //   },
  //   lgObj: {
  //     id: '',
  //     name: '',
  //   },
  //   bank: '',
  //   accountNumber: '',
  //   accountName: '',
  //   accountdetails: {
  //     username: '',
  //     password: '',
  //     fullname: '',
  //   },
  // }
  const formik = useFormik({
    initialValues: {
      bank: '',
      accountNumber: '',
      accountName: '',
      accountdetails: {
        username: '',
        fullname: '',
      },
    },
    // validationSchema: yup.object().shape(RegisterValidationSchema),
    onSubmit: (values) => {
      delete values.gender;
      // const data = {
      //   ...values,
      //   bank: values.bank.bankName,
      //   longitude: coordinates.lng,
      //   latitude: coordinates.lat,
      //   settlementCharge: 0,
      //   allowWithdrawal: 1,
      //   phone: `+234${values.phone.replace(/^0+/, '')}`,
      // };
      console.log({ values });

      // createMerchantRequest(data);
    },
  });

  const { handleSubmit, setFieldValue, isSubmitting } = formik;

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
            {/* <GridWrapper>
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
            </GridWrapper> */}
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
            <Button isSubmitting={isSubmitting} text={'Change Password'} />
          </form>
        </FormikProvider>
      </Tab.Panel>
    </>
  );
};

export default UpdateAccountForm;
