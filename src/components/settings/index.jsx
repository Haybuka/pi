import { Tab } from '@headlessui/react';
import SettingsTab from './tab';
import UpdateProfileForm from './updateProfileForm';
import UpdatePasswordForm from './updatePasswordForm';

const Index = () => {
  const userProfile = JSON.parse(localStorage.getItem('__profile__'));

  console.log({ userProfile });
  return (
    <section>
      <div className=" md:w-[900px] md:mx-auto text-black px-2 py-16 sm:px-0 ">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <SettingsTab title="Update Profile" />
            <SettingsTab title="Update password" />
            <SettingsTab title="Update Account" />
          </Tab.List>
          <Tab.Panels className="mt-2">
            <UpdateProfileForm />
            <UpdatePasswordForm />
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
};

export default Index;
