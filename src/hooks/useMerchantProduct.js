
import { useGetMerchantProductCategories } from '../api/merchants/products';


const useMerchantProduct = () => {
  const { data: merchantProduct, isFetched } = useGetMerchantProductCategories();



  const productCategories = isFetched && merchantProduct?.map((product, id) => product?.category);
  const uniqueCategories = isFetched ? productCategories?.filter((obj, index) => { return index === productCategories?.findIndex((o) => obj.name === o.name) }) : []


  return {
    merchantCategories: uniqueCategories,
  }
}

export default useMerchantProduct