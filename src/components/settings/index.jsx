import { Tab } from '@headlessui/react';
import SettingsTab from './tab';
import UpdateProfileForm from './updateProfileForm';
import ResetPasswordForm from './resetPasswordForm';

const Index = () => {
  return (
    <section>
      <div className=" md:w-[900px] md:mx-auto text-black px-2 py-16 sm:px-0 ">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <SettingsTab title="Update Profile" />
            <SettingsTab title="reset password" />
          </Tab.List>
          <Tab.Panels className="mt-2">
            <UpdateProfileForm />
            <ResetPasswordForm />
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
};

export default Index;
