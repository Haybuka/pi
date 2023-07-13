import React, { useContext, useState } from 'react';
import ProfileFields from './fields';
import { AuthContext } from '../../context/authContext';
import Button from '../button/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { profile: userProfile } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('__profile__'));
  const [profile] = useState(userProfile.email ? userProfile : user);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/settings');
  };
  return (
    <main className=" md:w-[900px] md:mx-auto text-black px-2 py-16 sm:px-0 ">
      <div className="flex justify-center">
        <p className="w-32 h-32 my-6 bg-gray-200 rounded-full"></p>
      </div>
      <div className="grid grid-cols-12 gap-4 my-6">
        <ProfileFields
          value={profile?.fullname}
          label="fullname"
          classProp="col-span-6"
        />
        <ProfileFields
          value={profile?.username}
          label="username"
          classProp="col-span-6"
        />
      </div>
      <ProfileFields value={profile?.email} label="email" classProp="my-6" />
      <div className="grid grid-cols-12 gap-4 my-6">
        <ProfileFields
          value={profile?.phone ? profile.phone : '080 000 0000'}
          label="phone"
          classProp="col-span-6"
        />

        <ProfileFields
          value={profile?.gender ? profile.gender : 'male'}
          label="gender"
          classProp="col-span-6"
        />
      </div>

      <Button text={'edit profile'} handleClick={handleClick} />
    </main>
  );
};

export default Index;
