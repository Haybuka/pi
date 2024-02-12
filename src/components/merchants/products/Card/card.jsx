import React from 'react';
import HeadPhone from './headphone.jpg';
import { ReactComponent as SvgIcon } from './clip.svg';
const ProductCard = ({ product, options }) => {
  const { handleProductEdit, handleImageUpload, handleProductDelete } = options;

  return (
    <aside className="w-full sm:w-auto lg:w-[300px] 2xl:w-[330px] shadow rounded-md overflow-hidden">
      <div
        className="h-[180px] bg-gray-300 relative cursor-pointer"
        onClick={() => handleImageUpload(product?.id)}
      >
        <SvgIcon />
        {/* <img
          src={HeadPhone}
          alt="product"
          className="w-full h-full object-cover"
        /> */}
      </div>
      <div className="p-2">
        <h3 className="uppercase text-sm flex justify-between items-center my-3">
          <span>{product?.name}</span>
          <span className="font-semibold">&#8358;{product?.baseAmount}</span>
        </h3>
        <div className="uppercase text-sm flex justify-between items-center my-3">
          <p
            className="py-1 px-4 bg-[#002e625e] text-[#002D62] rounded-md cursor-pointer"
            onClick={() => handleProductEdit(product)}
          >
            edit
          </p>
          <p
            className="py-1 px-4 bg-red-200 text-red-600 rounded-md cursor-pointer"
            onClick={() => handleProductDelete(product)}
          >
            delete
          </p>
        </div>
      </div>
    </aside>
  );
};

export default ProductCard;
