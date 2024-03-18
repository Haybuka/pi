import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ReactComponent as CheckIcon } from './CheckIcon.svg';
import { ReactComponent as UpDownIcon } from './upDown.svg';

export default function PiDropdown({ name, title, data = [], form }) {
  const [selected, setSelected] = useState(data[0]);

  const handleSelected = (value) => {
    setSelected(value);
    switch (title) {
      case 'bank':
        form(name, `${value?.bankName}`);
        return;
      default:
        form(name, value);
        return;
    }
  };
  return (
    <div className="w-full h-full relative ">
      <h3 className="uppercase bg-white text-sm transparent translate-x-2 text-gray-400">
        {title}
      </h3>
      <Listbox value={selected} onChange={handleSelected}>
        <div className="relative">
          <Listbox.Button className="py-2 relative w-full cursor-default rounded-lg bg-white pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <UpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {data?.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item?.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
