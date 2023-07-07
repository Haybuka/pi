import React, { useState } from 'react';
import styles from './modal.module.css';
const PasswordResetModal = ({ handleModal, email = 'your mail' }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleModal();
  };

  return (
    <>
      <section className={styles.modal} onClick={handleModal}></section>
      <article className={styles.modal_sub}>
        <div
          className="bg-gray-700 text-white inline-block hover:bg-white hover:text-gray-700 cursor-pointer"
          onClick={handleModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <form className="px-10" onSubmit={handleSubmit}>
          <p className="text-gray-700">Input the code sent to {email}</p>
          <label className="block relative floated-label my-6 col-span-6">
            <input
              type="text"
              className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
              placeholder="John Doe"
            />
            <p className="uppercase text-sm bg-white text-center translate-x-2 px-2">
              Code
            </p>
          </label>
          <label className="block relative floated-label my-6 col-span-6">
            <input
              type="text"
              className="w-full py-3 px-4 outline-none border-none focus:outline-none shadow-lg rounded-2xl"
              placeholder="John Doe"
            />
            <p className="uppercase text-sm bg-white text-center translate-x-2 px-2">
              Password
            </p>
          </label>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-2xl capitalize my-6"
          >
            reset
          </button>
        </form>
      </article>
    </>
  );
};

export default PasswordResetModal;
