import { Popover } from '@headlessui/react';
import { ReactComponent as ProfileIcon } from '../../images/icons/profile.svg';
import { ReactComponent as SettingsIcon } from '../../images/icons/settings.svg';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useGetSelf } from '../../api/login';
import { useGetImageFile } from '../../api/getImageFile';

function MyPopover() {
  const navigate = useNavigate();
  const { handleSetLogOut } = useContext(AuthContext);

  const { data: profile, isFetched: isProfileFetched } = useGetSelf();

  const logoRef = isProfileFetched && profile?.organization?.logo;

  const options = {
    fileAlias: logoRef,
    enabled: logoRef ? true : false,
  };
  const { data: imageFile = [], isFetched: imageFetched } =
    useGetImageFile(options);

  return (
    <Popover className="relative">
      <Popover.Button>
        <div className="bg-gray-400 h-10 w-10 rounded-full overflow-hidden text-white">
          {imageFetched ? (
            <img
              alt=""
              className="w-full h-full"
              src={imageFile[imageFile.length - 1]?.fullPath}
            />
          ) : (
            <p className="p-2">
              <ProfileIcon />
            </p>
          )}
        </div>
      </Popover.Button>

      {isProfileFetched && (
        <Popover.Panel className="absolute z-10 w-[250px] right-0 rounded-md overflow-hidden mt-2 shadow-md">
          <section className="bg-white">
            <aside className=" bg-pi-500 text-white  py-3 px-2 flex items-center gap-x-2">
              <p className="h-10 w-10 rounded-full bg-white overflow-hidden">
                {imageFetched && (
                  <img
                    alt=""
                    className="w-full h-full"
                    src={imageFile[imageFile?.length - 1]?.fullPath}
                  />
                )}
              </p>
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
      )}
    </Popover>
  );
}

export default MyPopover;
