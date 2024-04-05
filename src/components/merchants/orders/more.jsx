import { Popover } from '@headlessui/react';

import { ReactComponent as MoreIcon } from './more.svg';

function MorePopover({ handleMore }) {
  return (
    <Popover className="relative">
      <Popover.Button>
        <MoreIcon />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 w-[200px] -top-4 -left-52 rounded-md overflow-hidden">
        <section className="bg-white">
          <p
            className="flex items-center py-3 my-2 capitalize mx-4 hover:text-gray-500 gap-x-2 cursor-pointer "
            onClick={handleMore}
          >
            {/* <ProfileIcon /> */}

            <span>More</span>
          </p>
          <hr />
        </section>
      </Popover.Panel>
    </Popover>
  );
}

export default MorePopover;
