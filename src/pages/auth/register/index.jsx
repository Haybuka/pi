import React, { useState } from 'react';
import { ReactComponent as LoginLogo } from './loginLogo.svg';
import { ReactComponent as EyeSlash } from './eyeSlash.svg';
import { Link } from 'react-router-dom';
import Button from '../../../components/button/button';
// #1a56db
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <main className="w-screen h-screen grid grid-cols-12">
      <section className=" bg-white col-span-12 md:col-span-7 flex justify-center items-center flex-col">
        <>
          <LoginLogo />
          <form className="w-full px-6 md:w-[700px] my-4">
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
                  // value={username}
                  type="text"
                  className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
                  placeholder="John Doe"
                />
                <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                  email
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
                  gender
                </p>
              </label>
            </div>
            <label className="block relative floated-label my-6 w-full">
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
            <Button text={`sign up`} classProp={`my-2`} />
            <Button text={`login`} classProp={`my-2`} />
          </form>
        </>
      </section>
      <section className="hidden md:block h-full col-span-5 w-full p-3">
        <aside className="bg-[#002D62] h-full rounded-lg"></aside>
      </section>
    </main>
  );
};

export default Register;
