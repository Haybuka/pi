import React from 'react';
import Index from '../components/category';
import { useGetProductCategory } from '../api/products';
import { ReactComponent as LoadingICon } from './auth/login/loginLogo.svg';

const EditCategory = () => {
  let id = JSON.parse(localStorage.getItem('__editID__'));

  const { data: category, isLoading } = useGetProductCategory({
    id,
    refetchOnMount: false,
  });
  return (
    <section className="h-full">
      {isLoading ? (
        <section className="w-full h-full flex justify-center items-center animate-pulse">
          <LoadingICon />
        </section>
      ) : (
        <Index isEdit={true} id={id} category={category} />
      )}
    </section>
  );
};

export default EditCategory;
