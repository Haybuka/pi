import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../images/icons/searchIcon.svg';
import Index from '../components/products';
import { useGetProductCategory } from '../api/products';
import { ReactComponent as LoadingICon } from './auth/login/loginLogo.svg';

const Products = () => {
  let id = JSON.parse(localStorage.getItem('__previewID__'));

  const [searchID, setSearchID] = useState('' || id);

  const handleChange = (event) => {
    setSearchID(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    refetch();
  };

  const {
    data: category,
    refetch,
    isFetched,
  } = useGetProductCategory({
    id: searchID.toLowerCase(),
    refetchOnMount: false,
    enabled: false,
  });

  return (
    <>
      <section className="text-black">
        <h3 className="text-sm uppercase">
          Preview Category {` : ${searchID}`}
        </h3>
      </section>
      {!isFetched ? (
        <form
          className="h-1/2 flex justify-center items-center flex-col"
          onSubmit={handleSubmit}
        >
          <label className="flex bg-white items-center relative floated-label w-1/3 my-6 shadow-md cursor-pointer rounded-2xl ">
            <div className="mx-3">
              <SearchIcon />
            </div>
            <div className="w-full">
              <input
                type="search"
                name="search"
                className="w-full py-2 px-4 outline-none border-none focus:outline-none rounded-2xl text-black"
                placeholder="John Doe"
                value={searchID}
                onChange={handleChange}
              />
              <p className="uppercase bg-white text-sm transparent text-center translate-x-2 px-2">
                category ID
              </p>
            </div>
          </label>
          <p className="text-black animate-pulse">
            <LoadingICon />
          </p>
        </form>
      ) : (
        <Index category={category} />
      )}
    </>
  );
};

export default Products;
