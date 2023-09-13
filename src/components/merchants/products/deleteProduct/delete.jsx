import React from 'react';
import Button from '../../../button/button';

const DeleteProduct = ({ product, handleRowDelete, handleModal }) => {
  const handleDelete = () => {
    console.log('deleting ', product?.id);
  };
  return (
    <section className="px-10">
      <p className="text-gray-700 text-center my-6 text-sm">
        Are you sure to delete product : {product?.name}
      </p>

      <section className="flex justify-between items-center gap-3">
        <Button
          handleClick={handleDelete}
          text={'Confirm'}
          classProp={
            'w-2/3 bg-red-800 text-white py-2 rounded-2xl capitalize my-6 text-center cursor-pointer text-sm'
          }
        />
        <Button
          handleClick={handleModal}
          text={'Cancel'}
          classProp={
            'w-2/3 bg-[#002D62] text-white py-2 rounded-2xl capitalize my-6 text-center cursor-pointer text-sm'
          }
        />
      </section>
    </section>
  );
};

export default DeleteProduct;
