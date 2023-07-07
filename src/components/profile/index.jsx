import React from 'react';
import ProfileFields from './fields';

const Index = () => {
  return (
    <main className=" md:w-[900px] md:mx-auto text-black px-2 py-16 sm:px-0 ">
      <div className="flex justify-center">
        <p className="w-24 h-24 my-6 bg-gray-200 rounded-full"></p>
      </div>
      <div className="grid grid-cols-12 gap-2 my-6">
        <ProfileFields
          value="Eliazino"
          label="fullname"
          classProp="col-span-6"
        />
        <ProfileFields
          value="Eliazino@gmail.com"
          label="email"
          classProp="col-span-6"
        />
      </div>
      <ProfileFields value="080 000 0000" label="phone" classProp="my-6" />

      <ProfileFields value="male" label="gender" classProp="my-6" />

      <p className="w-full text-center bg-gray-700 text-white py-3 rounded-2xl capitalize">
        Edit profile
      </p>
    </main>
  );
};

export default Index;
