import { Tab } from '@headlessui/react';
import React from 'react';
import Button from '../button/button';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UpdateProfileForm = () => {
  return (
    <Tab.Panel className={classNames('rounded-xl  px-6 py-4')}>
      <form>
        <div className="flex justify-center">
          <p className="w-24 h-24 my-6 bg-gray-200 rounded-full"></p>
        </div>
        <div className="grid grid-cols-12 gap-2 my-6">
          <label className="block relative floated-label col-span-6">
            <input
              type="text"
              className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
              placeholder="John Doe"
            />
            <p className="uppercase text-sm bg-white text-center translate-x-2 px-2">
              fullname
            </p>
          </label>
          <label className="block relative floated-label col-span-6">
            <input
              type="text"
              className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
              placeholder="John Doe"
            />
            <p className="uppercase text-sm bg-white text-center translate-x-2 px-2">
              email
            </p>
          </label>
        </div>
        <label className="block relative floated-label my-6">
          <input
            type="text"
            className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
            placeholder="John Doe"
          />
          <p className="uppercase text-sm bg-white text-center translate-x-2 px-2">
            phone
          </p>
        </label>
        <label className="block relative floated-label my-6">
          <input
            type="text"
            className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
            placeholder="John Doe"
          />
          <p className="uppercase text-sm bg-white text-center translate-x-2 px-2">
            Gender
          </p>
        </label>
        <Button text={'update'} type="submit" />
      </form>
    </Tab.Panel>
  );
};

export default UpdateProfileForm;
