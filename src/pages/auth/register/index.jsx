import React, { useState } from 'react';
import { ReactComponent as LoginLogo } from './loginLogo.svg';
import { ReactComponent as EyeSlash } from './eyeSlash.svg';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/button/button';
import AuthSlider from '../AuthSlider';
import Section from './Section';
// #1a56db
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <main className="w-screen h-screen grid grid-cols-12">
      <section className=" bg-white col-span-12 md:col-span-12 flex justify-center items-center flex-col my-3">
        <>
          <LoginLogo />
          <form className="w-full px-6 md:w-[700px] my-4">
            <Section title={'Personal Details'}>
              <div className="grid grid-cols-12 gap-3 my-6">
                <label className="block relative floated-label col-span-6">
                  <input
                    // value={username}
                    type="text"
                    className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                    placeholder="John Doe"
                  />
                  <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                    fullname
                  </p>
                </label>
                <label className="block relative floated-label w-full col-span-6">
                  <input
                    value={username}
                    type="text"
                    className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                    placeholder="John Doe"
                  />
                  <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                    username
                  </p>
                </label>
              </div>
              <div className="grid grid-cols-12 gap-3 my-6">
                <label className="block relative floated-label col-span-6">
                  <input
                    value={password}
                    type="text"
                    className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                    placeholder="John Doe"
                  />
                  <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                    password
                  </p>
                </label>
                <label className="block relative floated-label w-full col-span-6">
                  <input
                    value={username}
                    type="text"
                    className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                    placeholder="John Doe"
                  />
                  <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                    phone
                  </p>
                </label>
              </div>
              <label className="block relative floated-label my-6 w-full">
                <input
                  // value={password}
                  type="text"
                  className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                  placeholder="John Doe"
                />
                <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                  address
                </p>
              </label>
              <div className="grid grid-cols-12 gap-3 my-6">
                <label className="block relative floated-label col-span-6">
                  <input
                    // value={username}
                    type="text"
                    className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                    placeholder="John Doe"
                  />
                  <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                    state - dropdown
                  </p>
                </label>
                <label className="block relative floated-label w-full col-span-6">
                  <input
                    value={username}
                    type="text"
                    className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                    placeholder="John Doe"
                  />
                  <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                    phone
                  </p>
                </label>
              </div>
            </Section>
            <Section title={'Bank Details'}>
              <div className="grid grid-cols-12 gap-3 my-6">
                <label className="block relative floated-label col-span-6">
                  <input
                    // value={username}
                    type="text"
                    className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                    placeholder="John Doe"
                  />
                  <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                    bank - dropdown
                  </p>
                </label>
                <label className="block relative floated-label w-full col-span-6">
                  <input
                    value={username}
                    type="text"
                    className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                    placeholder="John Doe"
                  />
                  <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                    Account Number
                  </p>
                </label>
              </div>
              <label className="block relative floated-label my-6 w-full">
                <input
                  // value={password}
                  type="text"
                  className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                  placeholder="John Doe"
                />
                <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                  account name
                </p>
              </label>
            </Section>

            <Button text={`sign up`} classProp={`my-2`} />

            <p
              onClick={() => navigate('/')}
              className="w-full  text-black text-center py-3 rounded-2xl uppercase text-sm cursor-pointer"
            >
              Already have an account ?{' '}
              <span className="text-[#002D62] cursor-pointer">login</span>
            </p>
          </form>
        </>
      </section>
      <section className="hidden  h-full col-span-6 w-full p-3">
        <aside className=" h-full rounded-lg">
          <AuthSlider />
        </aside>
      </section>
    </main>
  );
};

export default Register;
