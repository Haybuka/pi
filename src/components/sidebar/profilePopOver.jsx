import { Popover } from '@headlessui/react';
import { ReactComponent as ProfileIcon } from '../../images/icons/profile.svg';
import { ReactComponent as SettingsIcon } from '../../images/icons/settings.svg';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useGetSelf } from '../../api/login';

function MyPopover() {
  const navigate = useNavigate();
  const { profile: userProfile, handleSetLogOut } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('__profile__'));
  const [profile] = useState(userProfile.email ? userProfile : user);

  const onSuccess = (response) => {
    console.log({ response }, 'response');
    try {
      if (response.statusCode === 200) {
        console.log(response.content.profile);
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const onError = (error) => {
    console.log({ error }, 'profile');
  };

  const options = {
    onError,
    onSuccess,
  };

  const { data: getSelf, isFetched } = useGetSelf(options);

  return (
    <Popover className="relative">
      <Popover.Button>
        <div className="bg-gray-400 rounded-full p-2 text-white">
          <ProfileIcon />
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 w-[250px] right-0 rounded-md overflow-hidden mt-2 shadow-md">
        <section className="bg-white">
          <aside className=" bg-[#002D62] text-white  py-3 px-2 flex items-center gap-x-2">
            <p className="h-10 w-10 rounded-full bg-white"></p>
            <div>
              <p className="capitalize">{profile?.fullname}</p>
              <p>{profile?.email}</p>
            </div>
          </aside>
          <p
            onClick={() => navigate('/profile')}
            className="flex items-center py-3 my-2 capitalize mx-4 gap-x-2 cursor-pointer"
          >
            <ProfileIcon />

            <span>My profile</span>
          </p>
          <p
            onClick={() => navigate('/settings')}
            className="flex items-center py-3 my-2 capitalize mx-4 gap-x-2 cursor-pointer"
          >
            <SettingsIcon />
            <span>Settings</span>
          </p>
          <p
            onClick={handleSetLogOut}
            className="flex items-center py-3 my-2 capitalize px-4 gap-x-2 border-0 border-t cursor-pointer text-red-400"
          >
            <ProfileIcon />
            <span>Logout</span>
          </p>
        </section>
      </Popover.Panel>
    </Popover>
  );
}

export default MyPopover;
