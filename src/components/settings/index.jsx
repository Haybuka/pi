import { Tab } from '@headlessui/react';
import SettingsTab from './tab';
import UpdateProfileForm from './updateProfileForm';
import UpdatePasswordForm from './updatePasswordForm';
import UpdateAccountForm from './updateAccountForm';

const Index = () => {
  return (
    <section>
      <div className=" md:w-[900px] md:mx-auto text-black px-2 py-16 sm:px-0 ">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-full bg-blue-900/20 p-1">
            <SettingsTab title="Update Account" />
            <SettingsTab title="Update password" />
          </Tab.List>
          <Tab.Panels className="mt-2">
            <UpdateAccountForm />
            <UpdatePasswordForm />
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
};

export default Index;
