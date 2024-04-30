import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';
import Button from '../button/button';
import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import PiSelect from '../piField/piSelect';
import GridWrapper from '../../pages/auth/register/Grid';
import PiField from '../piField';
import { useGetBank } from '../../api/bank';
import { useMerchantUpdateRequest } from '../../api/merchants/register';

import { useGetSelf } from '../../api/login';
import { useGetImageFile } from '../../api/getImageFile';

import { UpdateAccountValidationSchema } from '../../util/validationSchema';

import Upload from '../imageUpload/upload';
import Modal from '../modal/modal';

import { ReactComponent as EditPenLogo } from '../../images/icons/pen.svg';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import PlacesUi from '../../pages/auth/register/placesUi';
import { useGetAddressByLatLng } from '../../api/reverseGeoCode';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UpdateAccountForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalClose = () => {
    setModalIsOpen((prev) => false);
  };
  const { data: profile, isFetched: isProfileFetched } = useGetSelf();

  const logoRef = isProfileFetched && profile?.organization?.logo;

  const imageOptions = {
    fileAlias: logoRef,
    enabled: logoRef ? true : false,
  };

  const { data: imageFile = [], isFetched: imageFetched } =
    useGetImageFile(imageOptions);

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

  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const { mutate: updateMerchantRequest, isLoading: updateLoading } =
    useMerchantUpdateRequest(options);

  const addressConfig = {
    longitude: profile?.organization.location.coordinates.longitude
      ? profile?.organization.location.coordinates.longitude
      : coordinates.lng,
    latitude: profile?.organization.location.coordinates.latitude
      ? profile?.organization.location.coordinates.latitude
      : coordinates.lat,
  };
  const formik = useFormik({
    initialValues: {
      name: profile?.organization ? profile?.organization?.name : '',
      bank: '',
      accountNumber: '',
      accountName: '',
      email: profile ? profile?.email : '',
      phone: profile?.organization ? profile?.organization?.phone : '',
      longitude: profile?.organization.location.coordinates.longitude
        ? profile?.organization.location.coordinates.longitude
        : '',
      latitude: profile?.organization.location.coordinates.latitude
        ? profile?.organization.location.coordinates.latitude
        : '',
    },
    validationSchema: yup.object().shape(UpdateAccountValidationSchema),
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
        longitude: profile?.organization.location.coordinates.longitude
          ? profile?.organization.location.coordinates.longitude
          : coordinates.lng,
        latitude: profile?.organization.location.coordinates.latitude
          ? profile?.organization.location.coordinates.latitude
          : coordinates.lat,
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

  const { handleSubmit, setFieldValue, values } = formik;

  const { data: bankData, isFetched: bankFetched } = useGetBank();
  const { data: addressData = '', isFetched: fetchingAddress } =
    useGetAddressByLatLng(addressConfig);

  console.log({ addressData });
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    setBanks(
      bankData?.content?.data?.map((bank) => ({
        ...bank,
        name: bank?.bankName,
      }))
    );
  }, [bankFetched, bankData?.content?.data]);

  const handleAddress = (value) => {
    setFieldValue('address', value?.value);
    setCoordinates(value?.latlng);
    console.log(value, 'address');
  };

  return (
    <>
      <Tab.Panel className={classNames('rounded-xl p-3')}>
        <FormikProvider value={formik}>
          <form className="w-full  my-4" onSubmit={handleSubmit}>
            <div className="flex justify-center relative cursor-pointer ">
              <p
                onClick={() => setModalIsOpen(true)}
                className="w-32 h-32 my-6 bg-gray-200 rounded-full overflow-hidden hover:animate-pulse"
              >
                {imageFetched && (
                  <img
                    alt=""
                    className="w-full h-full"
                    src={imageFile[imageFile?.length - 1]?.fullPath}
                  />
                )}
              </p>
              <p className="absolute -bottom-0 -translate-x-1/2 left-1/2 z-10 h-10 w-10 ">
                {' '}
                <EditPenLogo />
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
            <div className="my-6">
              <PlacesUi
                name={'address'}
                displayName={'Address'}
                type="text"
                handleAddress={handleAddress}
                addressValue={addressData}
              />
            </div>
            <Button isSubmitting={updateLoading} text={'Update'} />
          </form>
        </FormikProvider>
        {modalIsOpen && (
          <Modal
            handleModal={handleModalClose}
            classAdd={
              'w-full md:w-[800px] h-2/4 overflow-y-scroll relative bg-red-400'
            }
          >
            <Upload id={0} handleModalClose={handleModalClose} />
          </Modal>
        )}
      </Tab.Panel>
    </>
  );
};

export default UpdateAccountForm;
