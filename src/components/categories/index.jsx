import React from 'react';
import AllTableHooks from '../table/table';
import { useGetProductCategories } from '../../api/products';

const Index = () => {
  const { data: categories, isFetched } = useGetProductCategories({
    refetchOnMount: true,
  });

  return (
    <div>
      {isFetched && <AllTableHooks data={categories} userType="admin" />}
    </div>
  );
};

export default Index;
