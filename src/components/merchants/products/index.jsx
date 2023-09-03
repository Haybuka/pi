import { useState } from 'react';
import { useGetMerchantProductCategories } from '../../../api/merchants/products';
import {
  useGetProductCategories,
  useGetProductCategory,
} from '../../../api/products';
import ComboBox from '../../combobox/combobox';
import Button from '../../button/button';
import useMerchantProduct from '../../../hooks/useMerchantProduct';
import { useEffect } from 'react';
import Modal from '../../modal/modal';
import CreateMerchantProduct from '../../products/createMerchantProduct';
import ProductCard from './Card/card';
import ImageUpload from './ImageUpload/imageUpload';
import DeleteProduct from './deleteProduct/delete';
import Upload from '../../imageUpload/upload';

const Index = () => {
  const [page, setPage] = useState(0);
  const { data: categories, isLoading } = useGetProductCategories();
  const {
    data: merchantProduct,
    isFetched: merchantFetching,
    isPreviousData,
  } = useGetMerchantProductCategories({ page });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [imageId, setImageId] = useState();
  const [editValues, setEditValues] = useState();
  const [searchID, setSearchID] = useState(isLoading ? '' : categories[0]?.id);
  const [deleteProduct, setDeleteProduct] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const onError = (error) => {
    // const detail = error?.response.data?.result.details;
    console.log({ error });
  };
  const onSuccess = (response) => {
    // const message = response?.data?.result?.message;

    console.log(response);
  };

  const options = {
    onError,
    onSuccess,
  };

  const {
    data: categoryRequest,
    refetch,
    isFetched,
    isFetching,
    remove,
  } = useGetProductCategory({
    id: searchID?.toLowerCase(),
    refetchOnMount: false,
    enabled: false,
  });

  const [category, setCategory] = useState({ id: 0, name: 'all' });
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [showMerchantProduct, setShowMerchantProduct] = useState(false);

  const handleModalClose = () => {
    setModalIsOpen((prev) => false);
    setShowMerchantProduct(false);
    remove();
  };

  useEffect(() => {
    setCategory({ id: 0, name: 'all' });
    merchantFetching && setFilteredProducts(merchantProduct);
  }, [merchantFetching, merchantProduct]);

  const selectProductCategory = (category) => {
    setCategory(category);

    if (category?.name === 'all') {
      setFilteredProducts(merchantProduct);
    } else {
      const newFilteredProducts = merchantProduct?.filter(
        (product) =>
          product?.category?.name.toLowerCase() === category?.name.toLowerCase()
      );

      setFilteredProducts(newFilteredProducts);
    }
  };

  const handleProductEdit = (product) => {
    const categories = {
      productDetails: product?.productDetails && [...product?.productDetails],
      productOptions: product?.productOptions && [...product?.productOptions],
      name: product?.name,
      baseAmount: product?.baseAmount,
      images: product?.images && [...product?.images],
      details: product?.details,
      id: product?.id,
    };
    setEditValues(categories);
    setModalIsOpen(true);
    setIsEditing(true);
    setIsDeleteAlert(false);
    setIsImageUpload(false);
    setShowCategorySelect(false);
  };

  const handleImageUpload = (id) => {
    setImageId(id);
    setModalIsOpen(true);
    setIsImageUpload(true);
    setIsEditing(false);
    setIsDeleteAlert(false);
    setShowCategorySelect(false);
  };

  const handleProductCreate = () => {
    setShowCategorySelect(true);
    setModalIsOpen(true);
    setIsEditing(false);
    setIsImageUpload(false);
    setIsDeleteAlert(false);
  };

  const handleProductDelete = (product) => {
    setDeleteProduct(product);
    setShowCategorySelect(false);
    setModalIsOpen(true);
    setIsEditing(false);
    setIsImageUpload(false);
    setIsDeleteAlert(true);
  };
  const { merchantCategories = [] } = useMerchantProduct();

  const [productSearchName, setProductSearchName] = useState('');

  const handleProductSearchChange = (event) => {
    setProductSearchName(event.target.value);
    setCategory({ name: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // refetch();
  };

  return (
    <div className="text-black p-6">
      <section className="flex justify-between items-center">
        <ComboBox
          items={[{ id: 0, name: 'all' }, ...merchantCategories]}
          handleProductCategory={selectProductCategory}
        />

        <aside className="flex items-center">
          <div className="flex uppercase text-sm items-center mx-4">
            <p
              onClick={() => page >= 1 && setPage((page) => page - 1)}
              disabled={page === 0}
              className="bg-gray-200 text-gray-500 px-4 py-1 rounded-full text-sm cursor-pointer"
            >
              prev
            </p>
            <span className="inline-block mx-4"> {page + 1}</span>
            {!merchantProduct?.length === 0 ? (
              <p
                onClick={() => setPage((page) => page + 1)}
                className="bg-gray-200 text-gray-500 px-4 py-1 rounded-full text-sm cursor-pointer border-gray-700"
              >
                Next
              </p>
            ) : (
              <p className="bg-gray-200 text-gray-500 px-4 py-1 rounded-full text-sm cursor-not-allowed border-gray-700">
                Next
              </p>
            )}
          </div>
          <Button
            text={'Add product'}
            classProp={'w-[150px]'}
            handleClick={handleProductCreate}
          />
        </aside>
      </section>
      {merchantFetching ? (
        <section className="flex gap-4 my-10 flex-wrap">
          {filteredProducts.length > 0 ? (
            filteredProducts?.map((product) => (
              <ProductCard
                options={{
                  handleProductEdit,
                  handleImageUpload,
                  handleProductDelete,
                }}
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <p className="text-sm uppercase text-center w-full">
              No product found
            </p>
          )}
        </section>
      ) : (
        <Button
          text={''}
          isSubmitting={!merchantFetching}
          classProp={'w-[130px]'}
          handleClick={handleProductCreate}
        />
      )}

      {/* Modal */}
      {modalIsOpen && (
        <Modal
          handleModal={handleModalClose}
          classAdd={
            showMerchantProduct || isEditing
              ? 'w-[800px] h-3/4 overflow-y-scroll relative bg-red-400'
              : ''
          }
        >
          <section className="w-full">
            {showCategorySelect && (
              <aside className="my-2">
                <p className="uppercase text-sm">Select product category</p>
                <ComboBox
                  items={categories}
                  handleProductCategory={(selected) => {
                    setSearchID(selected?.id);
                  }}
                />
                <Button
                  text={'Continue'}
                  classProp={' my-4 '}
                  isSubmitting={isLoading}
                  handleClick={() => {
                    setModalIsOpen(true);
                    refetch();
                    setShowCategorySelect(false);
                    setShowMerchantProduct(true);
                    isFetched && setShowMerchantProduct(true);
                  }}
                />
              </aside>
            )}
            {isFetching && (
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                fetching
              </p>
            )}
            {isFetched && (
              <CreateMerchantProduct id={searchID} category={categoryRequest} />
            )}
            {isEditing && (
              <CreateMerchantProduct
                id={searchID}
                category={editValues}
                isEdit={true}
              />
            )}
            {isImageUpload && <Upload id={imageId} />}
            {isDeleteAlert && (
              <DeleteProduct
                product={deleteProduct}
                handleModal={handleModalClose}
              />
            )}
          </section>
        </Modal>
      )}
    </div>
  );
};

export default Index;
