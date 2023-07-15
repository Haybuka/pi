import React from 'react';
import AllTableHooks from '../components/table/table';
import { useGetProductCategories } from '../api/products';
import { ReactComponent as LoadingICon } from './auth/login/loginLogo.svg';
const Dashboard = () => {
  const { data: categories, isLoading } = useGetProductCategories({
    refetchOnMount: true,
  });

  return isLoading ? (
    <section className="w-full h-full flex justify-center items-center animate-pulse">
      <LoadingICon />
    </section>
  ) : (
    <AllTableHooks data={categories} />
  );
};

export default Dashboard;
