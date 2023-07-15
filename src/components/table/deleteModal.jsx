import React, { useState } from 'react';
import styles from './modal.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDeleteProductCategoryRequest } from '../../api/products';
const ProductDeleteModal = ({ handleModal, id = '' }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleModal();
  };

  const onError = (error) => {
    const detail = error?.response.data?.result.details;
    toast.error(detail);
  };
  const onSuccess = (response) => {
    const message = response?.data?.result?.message;
    handleModal();
    toast.success(message);
  };
  const options = {
    onError,
    onSuccess,
  };

  const { mutate: deleteCategory } = useDeleteProductCategoryRequest(options);

  const handleRowDelete = () => {
    const data = { id };
    deleteCategory({ data });
  };

  return (
    <>
      <section className={styles.modal} onClick={handleModal}></section>
      <article className={styles.modal_sub}>
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
        <section className="px-10">
          <p className="text-gray-700 text-center my-6">
            Are you sure to delete product id : {id}
          </p>

          <section className="flex justify-between items-center gap-3">
            <p
              onClick={handleRowDelete}
              type="submit"
              className="w-2/3 bg-red-800 text-white py-3 rounded-2xl capitalize my-6 text-center cursor-pointer"
            >
              Confirm
            </p>

            <p
              onClick={handleModal}
              type="submit"
              className="w-2/3 bg-[#002D62] text-white py-3 rounded-2xl capitalize my-6 text-center cursor-pointer"
            >
              Cancel
            </p>
          </section>
        </section>
      </article>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default ProductDeleteModal;
