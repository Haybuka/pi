import React from 'react';
import HeadPhone from './headphone.jpg';
import { ReactComponent as SvgIcon } from './fileImage.svg';
import { useGetImageFile } from '../../../../api/getImageFile';
import styles from './card.module.css';

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

  const stringTruncate = function (str, length) {
    var dots = str.length > length ? '...' : '';
    return str.substring(0, length) + dots;
  };
  return (
    <aside className={styles.card}>
      <div
        className="h-[180px] w-full bg-gray-300 relative cursor-pointer hover:animate-pulse "
        onClick={() =>
          handleImageUpload({ name: product?.name, id: product?.id })
        }
      >
        <p className="absolute top-4 left-4">
          <SvgIcon />
        </p>
        <p className="w-full h-full bg-black absolute opacity-30"></p>
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
      </div>
      <div className="p-2">
        <h3 className="text-sm  my-3">
          <p className="text-lg capitalize">
            {stringTruncate(product?.name, 20)}
          </p>
          <p className="font-semibold text-sm text-[#545F66]">
            &#8358;{product?.baseAmount}
          </p>
        </h3>
        <div className="capitalize text-sm flex gap-x-2 items-center my-3">
          <p
            className="py-1 px-4 bg-[#E1F5FE] text-[#002D62] rounded-full cursor-pointer"
            onClick={() => handleProductEdit(product)}
          >
            edit
          </p>
          <p
            className="py-1 px-4 bg-red-200 text-red-600 rounded-full cursor-pointer"
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
