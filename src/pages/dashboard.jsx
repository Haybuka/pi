import React from 'react';
import AllTableHooks from '../components/table/table';
import { useGetProductCategories } from '../api/products';
import { ReactComponent as LoadingICon } from './auth/login/loginLogo.svg';
import MerchantDashboard from '../components/merchants/dashboard';
import AdminDashboard from '../components/admin/dashboard';
const Dashboard = () => {
  const { data: categories, isLoading } = useGetProductCategories({
    refetchOnMount: true,
  });

  const userProfile = JSON.parse(localStorage.getItem('__profile__'));

  const userType = (userProfile) => {
    switch (userProfile?.type) {
      case 0:
        return <AdminDashboard />;
      case 1:
        return <MerchantDashboard />;
      default:
        return <p>No data present</p>;
    }
  };

  return isLoading ? (
    <section className="w-full h-full flex justify-center items-center animate-pulse">
      <LoadingICon />
    </section>
  ) : (
    userType(userProfile)
  );
};

export default Dashboard;
