import { Popover } from '@headlessui/react';
import ProfileIcon from './barIcon/profileIcon';

import { ReactComponent as SettingsIcon } from '../../images/icons/settings.svg';

function MyPopover() {
  return (
    <Popover className="relative">
      <Popover.Button>Solutions</Popover.Button>

      <Popover.Panel className="absolute z-10 w-[250px] right-0 rounded-md overflow-hidden mt-2 shadow-md">
        <section className="bg-white">
          <aside className=" bg-[#002D62] text-white  py-3 px-2 flex items-center gap-x-2">
            <p className="h-10 w-10 rounded-full bg-white"></p>
            <div>
              <p>John Deo</p>
              <p>johndeo@gmail.com</p>
            </div>
          </aside>
          <p className="flex items-center py-3 my-2 capitalize mx-4 gap-x-2">
            <SettingsIcon />
            My profile
          </p>
          <p className="flex items-center py-3 my-2 capitalize">
            <ProfileIcon />
            Settings
          </p>
          <p className="flex items-center py-3 my-2 capitalize border-0 border-t">
            <ProfileIcon />
            Logout
          </p>
        </section>
      </Popover.Panel>
    </Popover>
  );
}

export default MyPopover;
