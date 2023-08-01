import React from 'react';

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
        <p
          onClick={handleDelete}
          type="submit"
          className="w-2/3 bg-red-800 text-white py-2 rounded-2xl capitalize my-6 text-center cursor-pointer text-sm"
        >
          Confirm
        </p>

        <p
          onClick={handleModal}
          type="submit"
          className="w-2/3 bg-[#002D62] text-white py-2 rounded-2xl capitalize my-6 text-center cursor-pointer text-sm"
        >
          Cancel
        </p>
      </section>
    </section>
  );
};

export default DeleteProduct;
