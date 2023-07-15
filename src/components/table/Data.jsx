import { useGetProductCategories } from '../../api/products';

const DATA = () => {
  const { data: categories } = useGetProductCategories();
  return [...categories];
};

export default DATA;
