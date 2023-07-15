import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';

const SettingsTab = ({ title }) => {
  return (
    <Tab
      className={({ selected }) =>
        classNames(
          'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700 uppercase',

          selected
            ? 'bg-white shadow'
            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
        )
      }
    >
      {title}
    </Tab>
  );
};

export default SettingsTab;
