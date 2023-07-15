import { Tab } from '@headlessui/react';
import React, { useState } from 'react';
import PasswordResetModal from './modal/modal';
import Button from '../button/button';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ResetPasswordForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalClose = () => {
    setModalIsOpen((prev) => false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ modalIsOpen });
  };
  return (
    <>
      <Tab.Panel className={classNames('rounded-xl p-3')}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label className="block relative floated-label my-6 col-span-6">
            <input
              type="text"
              className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
              placeholder="John Doe"
            />
            <p className="uppercase text-sm bg-white text-center translate-x-2 px-2">
              email
            </p>
          </label>
          {/* <button
            type="submit"
            onClick={}
            className="w-full bg-blue-700 text-white py-3 rounded-2xl capitalize"
          >
            reset
          </button> */}
          <Button
            type="submit"
            text={'reset'}
            handleClick={() => setModalIsOpen(true)}
          />
        </form>
      </Tab.Panel>
      {modalIsOpen && <PasswordResetModal handleModal={handleModalClose} />}
    </>
  );
};

export default ResetPasswordForm;
