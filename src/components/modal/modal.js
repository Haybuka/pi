import React, { Children, useState } from 'react';
import styles from './modal.module.css';
import { toast } from 'react-toastify';
import cls from "classnames"
const Modal = ({ handleModal, id = '', children, classAdd }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleModal();
  };

  return (
    <>
      <section className={styles.modal} onClick={handleModal}></section>
      <article className={cls(classAdd, styles.modal_sub)}>
        <div
          className=" text-[#002D62] inline-block hover:bg-[#002D62] hover:text-white cursor-pointer"
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
        <section >
          {children}
        </section>
      </article>

    </>
  );
};

export default Modal;
