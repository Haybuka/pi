
import { useEffect } from 'react';
import { useGetMerchantProductCategories } from '../api/merchants/products';


const useMerchantProduct = (pageNumber) => {
  const { data: merchantProduct, isFetched } = useGetMerchantProductCategories({ pageNumber });


  const productCategories = isFetched && merchantProduct?.map((product, id) => product?.category);
  const uniqueCategories = isFetched ? productCategories?.filter((obj, index) => { return index === productCategories?.findIndex((o) => obj.name === o.name) }) : []

  console.log("refetched", { merchantProduct, productCategories })
  return {
    merchantCategories: uniqueCategories,
  }
}

export default useMerchantProduct