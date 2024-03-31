import { Popover, Transition } from '@headlessui/react';

// import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import PopoverButton from './popoverButton';
const AccountType = ({ accountOptions, user }) => {
  return (
    <div className="fixed top-10  right-6 w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <PopoverButton open={open} />
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 ">
                <section className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <article className="relative  bg-white">
                    {accountOptions.map((item) => (
                      <aside
                        key={item.name}
                        onClick={item?.action}
                        className={` flex cursor-pointer items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50 ${
                          user.toLowerCase() === item.name.toLowerCase() &&
                          'border border-red-500'
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </aside>
                    ))}
                  </article>
                </section>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default AccountType;
