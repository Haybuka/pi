import React from 'react';
import HeadPhone from './headphone.jpg';
import { ReactComponent as SvgIcon } from './fileImage.svg';
import { useGetImageFile } from '../../../../api/getImageFile';
const ProductCard = ({ product, options }) => {
  const { handleProductEdit, handleImageUpload, handleProductDelete } = options;

  //Code to grap images
  const imageRef = product && product?.images;

  const imageOptions = {
    fileAlias: imageRef,
    enabled: imageRef ? true : false,
  };

  const { data: imageFile = [], isFetched: imageFetched } =
    useGetImageFile(imageOptions);

  console.log({ imageFile });
  return (
    <aside className="w-full flex-wrap sm:w-[30%] md:w-[200px] lg:w-[250px] 2xl:w-[300px] shadow rounded-md overflow-hidden">
      <div
        className="h-[180px] w-full bg-gray-300 relative cursor-pointer hover:animate-pulse "
        onClick={() =>
          handleImageUpload({ name: product?.name, id: product?.id })
        }
      >
        <p className="absolute top-4 left-4">
          <SvgIcon />
        </p>
        {imageFetched && (
          <img
            alt=""
            className="w-full h-full aspect-square "
            src={
              imageFile[imageFile?.length - 1]?.fullPath
                ? imageFile[imageFile?.length - 1]?.fullPath
                : HeadPhone
            }
          />
        )}
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
            className="py-1 px-4 bg-[#E1F5FE] text-[#002D62] rounded-md cursor-pointer"
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
