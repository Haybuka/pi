import React, { useState } from 'react';
import styles from './modal.module.css';
import { toast } from 'react-toastify';
import { useDeleteProductCategoryRequest } from '../../api/products';
const ProductDeleteModal = ({ handleModal, product }) => {
  console.log(product);
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
    const data = { id: product?.id };
    deleteCategory({ data });
  };

  return (
    <>
      <section className="px-10 text-sm uppercase">
        <p className="text-gray-700 text-center my-6">
          Are you sure to delete category : {product?.name}
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
    </>
  );
};

export default ProductDeleteModal;
