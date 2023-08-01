import React from 'react';
import AllTableHooks from '../table/table';
import { useGetProductCategories } from '../../api/products';

const Index = () => {
  const { data: categories, isLoading } = useGetProductCategories({
    refetchOnMount: true,
  });
  return (
    <div>
      <AllTableHooks data={categories} userType="admin" />
    </div>
  );
};

export default Index;
